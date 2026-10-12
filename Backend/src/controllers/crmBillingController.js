const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const AcademicSession = require("../models/AcademicSession");
const CrmPayment = require("../models/CrmPayment");
const Enrollment = require("../models/Enrollment");
const FeeAssignment = require("../models/FeeAssignment");
const FeeStructure = require("../models/FeeStructure");
const Membership = require("../models/Membership");
const Renewal = require("../models/Renewal");
const Student = require("../models/Student");

const pageOptions = (query) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
};

const makePagination = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

const notFound = (res, message) => {
  res.status(404);
  throw new Error(message);
};

const membershipPopulate = [
  { path: "enrollment", populate: [{ path: "student", select: "firstName lastName admissionNumber" }, { path: "academicSession", select: "name code" }, { path: "program", select: "name code" }, { path: "class", select: "name" }, { path: "section", select: "name code" }] },
  { path: "student", select: "firstName lastName admissionNumber class section" },
  { path: "academicSession", select: "name code startDate endDate" },
  { path: "program", select: "name code" },
  { path: "class", select: "name order" },
  { path: "section", select: "name code" },
  { path: "feeStructure", select: "name code feeType amount semester dueDate dueDay frequency academicYear class program academicSession status" },
];

const listEnrollments = asyncHandler(async (req, res) => {
  const { page, limit, skip } = pageOptions(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.student) query.student = req.query.student;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  const [enrollments, total] = await Promise.all([
    Enrollment.find(query)
      .populate("student", "firstName lastName admissionNumber class section status")
      .populate("parent", "name email phone")
      .populate("academicSession", "name code startDate endDate")
      .populate("program", "name code")
      .populate("class", "name order")
      .populate("section", "name code capacity")
      .sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enrollment.countDocuments(query),
  ]);
  const pagination = makePagination(page, limit, total);
  res.json({ success: true, enrollments, data: enrollments, items: enrollments, pagination, ...pagination });
});

const listMemberships = asyncHandler(async (req, res) => {
  const { page, limit, skip } = pageOptions(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.enrollment) query.enrollment = req.query.enrollment;
  if (req.query.feeStructure) query.feeStructure = req.query.feeStructure;
  if (req.query.autoRenew !== undefined) query.autoRenew = req.query.autoRenew === "true";
  if (req.query.student) query.student = req.query.student;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  const [memberships, total] = await Promise.all([
    Membership.find(query).populate(membershipPopulate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Membership.countDocuments(query),
  ]);
  const pagination = makePagination(page, limit, total);
  res.json({ success: true, data: memberships, memberships, items: memberships, pagination, ...pagination });
});

const createMembership = asyncHandler(async (req, res) => {
  const { enrollment, feeStructure, startDate, endDate, autoRenew, notes } = req.body;
  const [enrollmentDoc, feeStructureDoc] = await Promise.all([
    Enrollment.findById(enrollment),
    FeeStructure.findById(feeStructure),
  ]);
  if (!enrollmentDoc || enrollmentDoc.status !== "active") {
    res.status(400);
    throw new Error("Select an active enrollment");
  }
  if (!feeStructureDoc || feeStructureDoc.status === "inactive" ||
    (feeStructureDoc.class && String(feeStructureDoc.class) !== String(enrollmentDoc.class)) ||
    (feeStructureDoc.program && String(feeStructureDoc.program) !== String(enrollmentDoc.program)) ||
    (feeStructureDoc.academicSession && String(feeStructureDoc.academicSession) !== String(enrollmentDoc.academicSession))) {
    res.status(400);
    throw new Error("Select an active fee structure for the enrollment's class, program and academic session");
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) {
    res.status(400);
    throw new Error("A valid start date and an end date after the start date are required");
  }
  const duplicate = await Membership.exists({
    enrollment: enrollmentDoc._id,
    feeStructure: feeStructureDoc._id,
    status: { $in: ["pending", "active", "expiring"] },
  });
  if (duplicate) {
    res.status(409);
    throw new Error("An active or pending membership already exists for this enrollment and fee structure");
  }
  const membership = await Membership.create({
    enrollment: enrollmentDoc._id,
    student: enrollmentDoc.student,
    academicSession: enrollmentDoc.academicSession,
    program: enrollmentDoc.program,
    class: enrollmentDoc.class,
    section: enrollmentDoc.section,
    feeStructure: feeStructureDoc._id,
    membershipName: feeStructureDoc.name || feeStructureDoc.feeType,
    membershipCode: `MEM-${crypto.randomBytes(5).toString("hex").toUpperCase()}`,
    amount: feeStructureDoc.amount,
    startDate: start,
    endDate: end,
    autoRenew: Boolean(autoRenew),
    notes,
  });
  await membership.populate(membershipPopulate);
  res.status(201).json({ success: true, message: "Membership created successfully", membership });
});

const updateMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (!membership) return notFound(res, "Membership not found");
  const updates = ["startDate", "endDate", "autoRenew", "notes"];
  for (const field of updates) {
    if (req.body[field] !== undefined) membership[field] = req.body[field];
  }
  await membership.save();
  await membership.populate(membershipPopulate);
  res.json({ success: true, message: "Membership updated successfully", membership });
});

const updateMembershipStatus = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (!membership) return notFound(res, "Membership not found");
  if (membership.status === "cancelled" || membership.status === "expired") {
    res.status(409);
    throw new Error("An expired or cancelled membership cannot be changed");
  }
  if (req.params.action === "suspend") {
    membership.status = membership.status === "suspended" ? "active" : "suspended";
  } else {
    const reason = req.body.cancellationReason?.trim();
    if (!reason) {
      res.status(400);
      throw new Error("A cancellation reason is required");
    }
    membership.status = "cancelled";
    membership.cancellationReason = reason;
  }
  await membership.save();
  res.json({ success: true, membership });
});

const assignmentPopulate = [
  { path: "membership", select: "membershipName membershipCode amount status startDate endDate" },
  { path: "student", select: "firstName lastName admissionNumber class section" },
  { path: "academicSession", select: "name code" },
  { path: "feeStructure", select: "feeType amount semester dueDate academicYear class" },
];

const listFeeAssignments = asyncHandler(async (req, res) => {
  const { page, limit, skip } = pageOptions(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.student) query.student = req.query.student;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  const [assignments, total] = await Promise.all([
    FeeAssignment.find(query).populate(assignmentPopulate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    FeeAssignment.countDocuments(query),
  ]);
  const now = Date.now();
  const items = assignments.map((assignment) => {
    const value = assignment.toObject();
    if (value.status === "due" && value.dueDate && new Date(value.dueDate).getTime() < now) value.status = "overdue";
    return value;
  });
  const pagination = makePagination(page, limit, total);
  res.json({ success: true, feeAssignments: items, items, pagination, ...pagination });
});

const createFeeAssignment = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.body.membership);
  if (!membership) return notFound(res, "Membership not found");
  if (membership.status !== "pending") {
    res.status(409);
    throw new Error("Only a pending membership can receive a fee assignment");
  }
  const exists = await FeeAssignment.exists({ membership: membership._id });
  if (exists) {
    res.status(409);
    throw new Error("A fee assignment already exists for this membership");
  }
  const discount = Number(req.body.discount || 0);
  if (!Number.isFinite(discount) || discount < 0 || discount > membership.amount) {
    res.status(400);
    throw new Error("Discount must be between 0 and the membership amount");
  }
  const feeStructure = await FeeStructure.findById(membership.feeStructure);
  const totalAmount = membership.amount - discount;
  const assignment = await FeeAssignment.create({
    membership: membership._id,
    student: membership.student,
    academicSession: membership.academicSession,
    feeStructure: membership.feeStructure,
    amount: membership.amount,
    discount,
    totalAmount,
    paidAmount: 0,
    remainingAmount: totalAmount,
    dueDate: req.body.dueDate || feeStructure?.dueDate || membership.endDate,
    notes: req.body.notes,
  });
  membership.status = "active";
  await membership.save();
  await assignment.populate(assignmentPopulate);
  res.status(201).json({ success: true, message: "Fee assignment created successfully", feeAssignment: assignment });
});

const updateFeeAssignment = asyncHandler(async (req, res) => {
  const assignment = await FeeAssignment.findById(req.params.id);
  if (!assignment) return notFound(res, "Fee assignment not found");
  if (assignment.status === "cancelled" || assignment.status === "paid") {
    res.status(409);
    throw new Error("A paid or cancelled fee assignment cannot be edited");
  }
  if (req.body.discount !== undefined) {
    const discount = Number(req.body.discount);
    if (!Number.isFinite(discount) || discount < 0 || discount > assignment.amount) {
      res.status(400);
      throw new Error("Discount must be between 0 and the fee amount");
    }
    assignment.discount = discount;
    assignment.totalAmount = assignment.amount - discount;
    assignment.remainingAmount = Math.max(0, assignment.totalAmount - assignment.paidAmount);
  }
  if (req.body.dueDate !== undefined) assignment.dueDate = req.body.dueDate || undefined;
  if (req.body.notes !== undefined) assignment.notes = req.body.notes;
  if (assignment.paidAmount >= assignment.totalAmount) assignment.status = "paid";
  else assignment.status = assignment.paidAmount > 0 ? "partial" : "due";
  await assignment.save();
  await assignment.populate(assignmentPopulate);
  res.json({ success: true, message: "Fee assignment updated successfully", feeAssignment: assignment });
});

const cancelFeeAssignment = asyncHandler(async (req, res) => {
  const assignment = await FeeAssignment.findById(req.params.id);
  if (!assignment) return notFound(res, "Fee assignment not found");
  if (assignment.paidAmount > 0) {
    res.status(409);
    throw new Error("A fee assignment with recorded payments cannot be cancelled");
  }
  assignment.status = "cancelled";
  await assignment.save();
  await Membership.updateOne({ _id: assignment.membership, status: "active" }, { status: "cancelled" });
  res.json({ success: true, message: "Fee assignment cancelled successfully", feeAssignment: assignment });
});

const renewalPopulate = [
  { path: "student", select: "firstName lastName admissionNumber class section" },
  { path: "academicSession", select: "name code startDate endDate" },
  { path: "previousMembership", select: "membershipName membershipCode amount status student academicSession feeStructure" },
  { path: "newMembership", select: "membershipName membershipCode amount status" },
  { path: "reviewedBy", select: "name" },
];

const listRenewals = asyncHandler(async (req, res) => {
  const { page, limit, skip } = pageOptions(req.query);
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.student) query.student = req.query.student;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  if (req.query.paymentStatus) query.paymentStatus = req.query.paymentStatus;
  const [renewals, total] = await Promise.all([
    Renewal.find(query).populate(renewalPopulate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Renewal.countDocuments(query),
  ]);
  const pagination = makePagination(page, limit, total);
  res.json({ success: true, data: { renewals, pagination }, renewals, items: renewals, pagination });
});

const getRenewal = asyncHandler(async (req, res) => {
  const renewal = await Renewal.findById(req.params.id).populate(renewalPopulate);
  if (!renewal) return notFound(res, "Renewal not found");
  res.json({ success: true, data: { renewal }, renewal });
});

const createRenewal = asyncHandler(async (req, res) => {
  const { student, academicSession, previousMembership, startDate, endDate, amount, notes } = req.body;
  const [studentDoc, session, membership] = await Promise.all([
    Student.findById(student),
    AcademicSession.findById(academicSession),
    Membership.findById(previousMembership),
  ]);
  if (!studentDoc || !session || !membership || String(membership.student) !== String(studentDoc._id)) {
    res.status(400);
    throw new Error("Select a valid student, academic session and membership belonging to that student");
  }
  if (!["active", "expiring", "expired"].includes(membership.status)) {
    res.status(409);
    throw new Error("Only an active, expiring, or expired membership can be renewed");
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const renewalAmount = Number(amount);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start || !Number.isFinite(renewalAmount) || renewalAmount <= 0) {
    res.status(400);
    throw new Error("Enter valid renewal dates and an amount greater than zero");
  }
  const duplicate = await Renewal.exists({ previousMembership: membership._id, status: { $in: ["pending", "approved"] } });
  if (duplicate) {
    res.status(409);
    throw new Error("A pending or approved renewal already exists for this membership");
  }
  const renewalNumber = `REN-${new Date().getFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  const renewal = await Renewal.create({
    renewalNumber, student: studentDoc._id, academicSession: session._id,
    previousMembership: membership._id, startDate: start, endDate: end,
    amount: renewalAmount, remainingAmount: renewalAmount, notes,
  });
  await renewal.populate(renewalPopulate);
  res.status(201).json({ success: true, message: "Renewal created successfully", data: { renewal }, renewal });
});

const reviewRenewal = asyncHandler(async (req, res) => {
  const renewal = await Renewal.findById(req.params.id);
  if (!renewal) return notFound(res, "Renewal not found");
  if (renewal.status !== "pending") {
    res.status(409);
    throw new Error("Only pending renewals can be approved");
  }
  renewal.status = "approved";
  renewal.reviewedBy = req.user._id;
  renewal.reviewedAt = new Date();
  await renewal.save();
  await renewal.populate(renewalPopulate);
  res.json({ success: true, message: "Renewal approved successfully", data: { renewal }, renewal });
});

const completeRenewal = asyncHandler(async (req, res) => {
  const renewal = await Renewal.findById(req.params.id).populate("previousMembership");
  if (!renewal) return notFound(res, "Renewal not found");
  if (renewal.status === "completed" && renewal.newMembership) {
    await renewal.populate(renewalPopulate);
    return res.json({ success: true, message: "Renewal is already completed", data: { renewal }, renewal });
  }
  if (renewal.status !== "approved") {
    res.status(409);
    throw new Error("Approve the renewal before completing it");
  }
  if (renewal.remainingAmount > 0) {
    res.status(409);
    throw new Error("The renewal must be fully paid before it can be completed");
  }
  const previous = renewal.previousMembership;
  const membershipCode = `MEM-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
  const newMembership = await Membership.create({
    enrollment: previous.enrollment,
    student: renewal.student,
    academicSession: renewal.academicSession,
    program: previous.program,
    class: previous.class,
    section: previous.section,
    feeStructure: previous.feeStructure,
    membershipName: previous.membershipName,
    membershipCode,
    amount: renewal.amount,
    startDate: renewal.startDate,
    endDate: renewal.endDate,
    status: "active",
    autoRenew: previous.autoRenew,
    notes: renewal.notes,
  });
  renewal.newMembership = newMembership._id;
  renewal.status = "completed";
  previous.status = "expired";
  await Promise.all([renewal.save(), previous.save()]);
  await renewal.populate(renewalPopulate);
  res.json({ success: true, message: "Renewal completed successfully", data: { renewal }, renewal });
});

const paymentPopulate = [
  { path: "student", select: "firstName lastName admissionNumber class section" },
  { path: "academicSession", select: "name code" },
  { path: "feeAssignment", select: "membership totalAmount paidAmount remainingAmount status" },
  { path: "renewal", select: "renewalNumber amount paidAmount remainingAmount paymentStatus status" },
  { path: "recordedBy", select: "name email" },
];

const listPayments = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.student) query.student = req.query.student;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  if (req.query.paymentStatus) query.paymentStatus = req.query.paymentStatus;
  if (req.query.paymentMethod) query.paymentMethod = req.query.paymentMethod;
  if (req.query.feeAssignment) query.feeAssignment = req.query.feeAssignment;
  if (req.query.renewal) query.renewal = req.query.renewal;
  const payments = await CrmPayment.find(query).populate(paymentPopulate).sort({ paymentDate: -1 });
  res.json({ success: true, data: payments, payments, count: payments.length });
});

const createPayment = asyncHandler(async (req, res) => {
  const { student, academicSession, feeAssignment, renewal, amount, paymentMethod, paymentStatus, paymentDate, transactionId, notes } = req.body;
  const paymentAmount = Number(amount);
  if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
    res.status(400);
    throw new Error("Payment amount must be greater than zero");
  }
  if (Boolean(feeAssignment) === Boolean(renewal)) {
    res.status(400);
    throw new Error("Select exactly one fee assignment or renewal");
  }
  const target = feeAssignment
    ? await FeeAssignment.findById(feeAssignment)
    : await Renewal.findById(renewal);
  if (!target) return notFound(res, feeAssignment ? "Fee assignment not found" : "Renewal not found");
  const expectedStudent = target.student;
  const expectedSession = target.academicSession;
  if (String(student) !== String(expectedStudent) || String(academicSession) !== String(expectedSession)) {
    res.status(400);
    throw new Error("The selected payment student and session do not match the selected balance");
  }
  const remaining = feeAssignment ? target.remainingAmount : target.remainingAmount;
  if (paymentAmount > remaining || remaining <= 0) {
    res.status(400);
    throw new Error("Payment cannot exceed the remaining balance");
  }
  const status = paymentStatus || "success";
  const payment = await CrmPayment.create({
    student, academicSession, feeAssignment, renewal, amount: paymentAmount,
    paymentMethod, paymentStatus: status, paymentDate, transactionId, notes,
    recordedBy: req.user._id,
  });
  if (status === "success") {
    if (feeAssignment) {
      target.paidAmount += paymentAmount;
      target.remainingAmount = Math.max(0, target.totalAmount - target.paidAmount);
      target.status = target.remainingAmount === 0 ? "paid" : "partial";
    } else {
      target.paidAmount += paymentAmount;
      target.remainingAmount = Math.max(0, target.amount - target.paidAmount);
      target.paymentStatus = target.remainingAmount === 0 ? "paid" : "partial";
    }
    await target.save();
  }
  await payment.populate(paymentPopulate);
  res.status(201).json({ success: true, message: "Payment recorded successfully", payment });
});

module.exports = {
  listEnrollments,
  listMemberships, createMembership, updateMembership, updateMembershipStatus,
  listFeeAssignments, createFeeAssignment, updateFeeAssignment, cancelFeeAssignment,
  listRenewals, getRenewal, createRenewal, reviewRenewal, completeRenewal,
  listPayments, createPayment,
};
