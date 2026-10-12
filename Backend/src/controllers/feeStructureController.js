const asyncHandler = require("express-async-handler");
const FeeStructure = require("../models/FeeStructure");
const Class = require("../models/Class");
const AcademicSession = require("../models/AcademicSession");
const Program = require("../models/Program");
const Membership = require("../models/Membership");
const { applyNewStructureToExistingStudents } = require("../utils/applyFeeStructures");

// @desc    Public: fee structure by class - this is just published pricing
//          (like a fee-structure page on any school's website), no
//          student-identifying data at all, so no login required.
// @route   GET /api/fee-structures/public
const getPublicFeeStructures = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.class) query.class = req.query.class;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  if (req.query.program) query.program = req.query.program;
  query.status = { $ne: "inactive" };
  const structures = await FeeStructure.find(query)
    .populate("class", "name order")
    .populate("academicSession", "name code startDate endDate")
    .populate("program", "name code")
    .select("-createdBy")
    .sort({ "class.order": 1, semester: 1 });
  res.json({ success: true, feeStructures: structures });
});

// @desc    List fee structures, optionally filtered by class
// @route   GET /api/fee-structures
const getFeeStructures = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.class) query.class = req.query.class;
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  if (req.query.program) query.program = req.query.program;
  if (req.query.status) query.status = req.query.status;

  const structures = await FeeStructure.find(query)
    .populate("class", "name program academicSession")
    .populate("academicSession", "name code startDate endDate")
    .populate("program", "name code")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: structures, feeStructures: structures });
});

// @desc    Define a fee for a class - immediately back-applies to every
//          student already in that class, and auto-applies going forward to
//          new signups and promotions into it.
// @route   POST /api/fee-structures
// @access  Private/Admin
const createFeeStructure = asyncHandler(async (req, res) => {
  const { class: classId, feeType, amount, semester, dueDate, academicYear } = req.body;
  const hasFrontendFields = ["name", "code", "academicSession", "program"].some((field) =>
    Object.prototype.hasOwnProperty.call(req.body, field)
  );
  if (!feeType || amount === undefined || amount === null ||
    (hasFrontendFields && (!req.body.academicSession || !req.body.program || !req.body.name?.trim() || !req.body.code?.trim())) ||
    (!hasFrontendFields && (!classId || !dueDate))) {
    res.status(400);
    throw new Error(hasFrontendFields
      ? "name, code, academic session, program, fee type and amount are required"
      : "class, feeType, amount, and dueDate are required");
  }
  const [academicSession, program, classDoc] = await Promise.all([
    req.body.academicSession ? AcademicSession.findById(req.body.academicSession) : Promise.resolve(null),
    req.body.program ? Program.findById(req.body.program) : Promise.resolve(null),
    classId ? Class.findById(classId) : Promise.resolve(null),
  ]);
  if ((hasFrontendFields && (!academicSession || !program)) || (classId && !classDoc)) {
    res.status(400);
    throw new Error("Select a valid academic session, program and class");
  }
  if (classDoc?.program && program && String(classDoc.program) !== String(program._id)) {
    res.status(400);
    throw new Error("The selected class does not belong to the selected program");
  }
  if (classDoc?.academicSession && academicSession && String(classDoc.academicSession) !== String(academicSession._id)) {
    res.status(400);
    throw new Error("The selected class does not belong to the selected academic session");
  }
  const fallbackDueDate = academicSession ? new Date(academicSession.startDate) : new Date();
  if (req.body.dueDay) {
    const lastDayOfMonth = new Date(fallbackDueDate.getFullYear(), fallbackDueDate.getMonth() + 1, 0).getDate();
    fallbackDueDate.setDate(Math.min(Number(req.body.dueDay), lastDayOfMonth));
  }

  const structure = await FeeStructure.create({
    ...req.body,
    class: classId || undefined,
    feeType,
    amount,
    semester: semester || undefined,
    dueDate: dueDate || fallbackDueDate,
    academicYear,
    createdBy: req.user._id,
  });

  const appliedFees = classId ? await applyNewStructureToExistingStudents(structure) : [];

  res.status(201).json({ success: true, feeStructure: structure, appliedToExisting: appliedFees.length });
});

const updateFeeStructure = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.class === "") updates.class = null;
  const structure = await FeeStructure.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    .populate("class", "name")
    .populate("academicSession", "name code")
    .populate("program", "name code");
  if (!structure) {
    res.status(404);
    throw new Error("Fee structure not found");
  }
  res.json({ success: true, feeStructure: structure });
});

const deleteFeeStructure = asyncHandler(async (req, res) => {
  if (await Membership.exists({ feeStructure: req.params.id })) {
    res.status(409);
    throw new Error("Fee structure is used by a membership and cannot be deleted");
  }
  const structure = await FeeStructure.findByIdAndDelete(req.params.id);
  if (!structure) {
    res.status(404);
    throw new Error("Fee structure not found");
  }
  res.json({ success: true, message: "Fee structure removed" });
});

module.exports = { getPublicFeeStructures, getFeeStructures, createFeeStructure, updateFeeStructure, deleteFeeStructure };