const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const AuditLog = require("../models/AuditLog");
const ContactInquiry = require("../models/ContactInquiry");
const Class = require("../models/Class");
const Guardian = require("../models/Guardian");
const Student = require("../models/Student");
const TrialBooking = require("../models/TrialBooking");
const User = require("../models/User");

const paginationFor = (query) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
};

const notFound = (res, message) => {
  res.status(404);
  throw new Error(message);
};

const listQueries = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationFor(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status === "open" ? { $in: ["open", "pending"] } : req.query.status;
  if (req.query.priority) query.priority = req.query.priority;
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) {
    const search = req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.$or = [
      { queryNumber: new RegExp(search, "i") },
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { subject: new RegExp(search, "i") },
      { message: new RegExp(search, "i") },
    ];
  }
  const [queries, total] = await Promise.all([
    ContactInquiry.find(query).select("-ip")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactInquiry.countDocuments(query),
  ]);
  const pagination = { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
  const items = queries.map((item) => ({ ...item.toObject(), visitorName: item.name, visitorEmail: item.email, visitorPhone: item.phone }));
  res.json({ success: true, data: { items, queries: items, pagination, ...pagination } });
});

const getQuery = asyncHandler(async (req, res) => {
  const query = await ContactInquiry.findById(req.params.id).select("-ip")
    .populate("assignedTo", "name email role")
    .populate("replies.repliedBy", "name email role");
  if (!query) return notFound(res, "Query not found");
  const item = { ...query.toObject(), visitorName: query.name, visitorEmail: query.email, visitorPhone: query.phone };
  res.json({ success: true, data: { query: item } });
});

const addQueryReply = asyncHandler(async (req, res) => {
  const message = req.body.message?.trim();
  if (!message) {
    res.status(400);
    throw new Error("Reply message cannot be empty");
  }
  const query = await ContactInquiry.findById(req.params.id);
  if (!query) return notFound(res, "Query not found");
  if (query.status === "closed") {
    res.status(409);
    throw new Error("A closed query cannot receive replies");
  }
  query.replies.push({ message, isInternal: Boolean(req.body.isInternal), repliedBy: req.user._id });
  if (!req.body.isInternal && query.status === "open") query.status = "in_progress";
  await query.save();
  const updated = await ContactInquiry.findById(query._id).select("-ip").populate("assignedTo", "name email role").populate("replies.repliedBy", "name email role");
  res.json({ success: true, data: { query: { ...updated.toObject(), visitorName: updated.name, visitorEmail: updated.email, visitorPhone: updated.phone } } });
});

const updateQueryNotes = asyncHandler(async (req, res) => {
  const query = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { internalNotes: String(req.body.internalNotes || "").trim() },
    { new: true, runValidators: true }
  ).select("-ip");
  if (!query) return notFound(res, "Query not found");
  res.json({ success: true, data: { query } });
});

const updateQueryStatus = asyncHandler(async (req, res) => {
  const allowed = ["open", "assigned", "in_progress", "resolved", "closed"];
  if (!allowed.includes(req.body.status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(", ")}`);
  }
  const query = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  ).select("-ip");
  if (!query) return notFound(res, "Query not found");
  res.json({ success: true, data: { query } });
});

const assignQuery = asyncHandler(async (req, res) => {
  const assignee = await User.findOne({ _id: req.body.assignedTo, role: { $in: ["admin", "teacher"] }, isActive: true });
  if (!assignee) {
    res.status(400);
    throw new Error("Select an active administrator or teacher");
  }
  const query = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { assignedTo: assignee._id, status: "assigned" },
    { new: true, runValidators: true }
  ).select("-ip").populate("assignedTo", "name email role");
  if (!query) return notFound(res, "Query not found");
  res.json({ success: true, data: { query } });
});

const closeQuery = asyncHandler(async (req, res) => {
  const query = await ContactInquiry.findByIdAndUpdate(
    req.params.id,
    { status: "closed" },
    { new: true, runValidators: true }
  ).select("-ip");
  if (!query) return notFound(res, "Query not found");
  res.json({ success: true, data: { query } });
});

const trialPopulate = [
  { path: "preferredClass", select: "name order sections" },
  { path: "assignedTo", select: "name email role" },
  { path: "parent", select: "name email phone" },
  { path: "student", select: "firstName lastName admissionNumber class section" },
  { path: "reviewedBy", select: "name" },
];

const createTrial = asyncHandler(async (req, res) => {
  const { name, phone, email, preferredClass, preferredDate, notes } = req.body;
  if (!name?.trim() || !phone?.trim() || !preferredClass) {
    res.status(400);
    throw new Error("Name, phone and preferred class are required");
  }
  const classExists = await Class.exists({ _id: preferredClass });
  if (!classExists) {
    res.status(400);
    throw new Error("Select a valid class");
  }
  const trial = await TrialBooking.create({
    trialNumber: `TRY-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim(),
    preferredClass,
    preferredDate,
    notes,
  });
  await trial.populate(trialPopulate);
  res.status(201).json({ success: true, data: trial, trial });
});

const listTrials = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationFor(req.query);
  const query = {};
  if (req.query.status && req.query.status !== "all") query.status = req.query.status;
  if (req.query.preferredClass) query.preferredClass = req.query.preferredClass;
  if (req.query.assignedTo) query.assignedTo = req.query.assignedTo;
  if (req.query.phone) query.phone = new RegExp(req.query.phone.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (req.query.email) query.email = new RegExp(req.query.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (req.query.startDate || req.query.endDate) {
    query.createdAt = {};
    if (req.query.startDate) query.createdAt.$gte = new Date(req.query.startDate);
    if (req.query.endDate) {
      const endDate = new Date(req.query.endDate);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endDate;
    }
  }
  const [trials, total] = await Promise.all([
    TrialBooking.find(query).populate(trialPopulate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    TrialBooking.countDocuments(query),
  ]);
  const pagination = { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
  res.json({ success: true, data: { trials, ...pagination, pagination }, pagination });
});

const getTrial = asyncHandler(async (req, res) => {
  const trial = await TrialBooking.findById(req.params.id).populate(trialPopulate);
  if (!trial) return notFound(res, "Trial booking not found");
  res.json({ success: true, data: trial });
});

const updateTrialAction = asyncHandler(async (req, res) => {
  const trial = await TrialBooking.findById(req.params.id);
  if (!trial) return notFound(res, "Trial booking not found");
  const terminal = ["cancelled", "completed", "converted", "rejected"];
  const action = req.params.action;

  if (["contact", "approve", "complete", "assign", "reject", "convert", "cancel"].includes(action) && terminal.includes(trial.status)) {
    res.status(409);
    throw new Error(`A ${trial.status} trial booking cannot be changed`);
  }

  if (action === "contact") {
    trial.status = "contacted";
    trial.contactedAt = new Date();
  } else if (action === "approve") {
    trial.status = "approved";
    trial.reviewedBy = req.user._id;
  } else if (action === "complete") {
    trial.status = "completed";
    trial.completedAt = new Date();
    trial.reviewedBy = req.user._id;
  } else if (action === "assign") {
    const assignee = await User.findOne({ _id: req.body.assignedTo, role: { $in: ["admin", "teacher"] }, isActive: true });
    if (!assignee) {
      res.status(400);
      throw new Error("Select an active administrator or teacher");
    }
    trial.assignedTo = assignee._id;
  } else if (action === "reject") {
    if (!req.body.notes?.trim()) {
      res.status(400);
      throw new Error("A rejection note is required");
    }
    trial.status = "rejected";
    trial.rejectionNotes = req.body.notes.trim();
    trial.reviewedBy = req.user._id;
  } else if (action === "convert") {
    const [parent, student] = await Promise.all([
      User.findOne({ _id: req.body.parentId, role: "parent", isActive: true }),
      Student.findById(req.body.studentId),
    ]);
    if (!parent || !student) {
      res.status(400);
      throw new Error("Select a valid parent and student");
    }
    await Guardian.updateOne(
      { student: student._id, parent: parent._id },
      { $setOnInsert: { relationship: "guardian", isPrimary: false, canReceiveNotifications: true, status: "active" } },
      { upsert: true, runValidators: true }
    );
    if (!parent.children.some((child) => String(child) === String(student._id))) {
      parent.children.push(student._id);
      await parent.save();
    }
    trial.status = "converted";
    trial.parent = parent._id;
    trial.student = student._id;
    trial.reviewedBy = req.user._id;
  } else if (action === "cancel") {
    if (!req.body.cancellationReason?.trim()) {
      res.status(400);
      throw new Error("A cancellation reason is required");
    }
    trial.status = "cancelled";
    trial.cancellationReason = req.body.cancellationReason.trim();
    trial.reviewedBy = req.user._id;
  } else {
    res.status(404);
    throw new Error("Trial action not found");
  }

  await trial.save();
  await trial.populate(trialPopulate);
  res.json({ success: true, data: trial, trial });
});

const listAuditLogs = asyncHandler(async (req, res) => {
  const { page, limit, skip } = paginationFor(req.query);
  const query = {};
  if (req.query.action) query.action = req.query.action;
  if (req.query.entity) query.entity = req.query.entity;
  if (req.query.userId) query.userId = req.query.userId;
  if (req.query.startDate || req.query.endDate) {
    query.createdAt = {};
    if (req.query.startDate) query.createdAt.$gte = new Date(req.query.startDate);
    if (req.query.endDate) {
      const endDate = new Date(req.query.endDate);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endDate;
    }
  }
  const [items, total] = await Promise.all([
    AuditLog.find(query).populate("userId", "name email role").sort({ createdAt: -1 }).skip(skip).limit(limit),
    AuditLog.countDocuments(query),
  ]);
  const pagination = { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
  res.json({ success: true, data: { items, pagination } });
});

const getAuditLog = asyncHandler(async (req, res) => {
  const item = await AuditLog.findById(req.params.id).populate("userId", "name email role");
  if (!item) return notFound(res, "Audit log not found");
  res.json({ success: true, data: item });
});

module.exports = {
  listQueries, getQuery, addQueryReply, updateQueryNotes, updateQueryStatus, assignQuery, closeQuery,
  createTrial, listTrials, getTrial, updateTrialAction,
  listAuditLogs, getAuditLog,
};
