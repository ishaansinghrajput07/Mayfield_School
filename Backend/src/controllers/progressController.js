const asyncHandler = require("express-async-handler");
const AcademicSession = require("../models/AcademicSession");
const ProgressReport = require("../models/ProgressReport");
const Student = require("../models/Student");
const { getTeacherClassIds } = require("../utils/teacherScope");

const getScope = async (req) => {
  if (req.user.role !== "teacher") return {};
  const classIds = await getTeacherClassIds(req.user._id);
  const students = await Student.find({ class: { $in: Array.from(classIds) } }, "_id");
  return { student: { $in: students.map((student) => student._id) } };
};

const getProgress = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
  const query = await getScope(req);
  if (req.query.student) {
    if (query.student && !query.student.$in.some((id) => String(id) === String(req.query.student))) {
      return res.json({ success: true, data: { items: [], pagination: { page, limit, total: 0, totalPages: 1 } } });
    }
    query.student = req.query.student;
  }
  if (req.query.academicSession) query.academicSession = req.query.academicSession;
  const [items, total] = await Promise.all([
    ProgressReport.find(query)
      .populate("student", "firstName lastName admissionNumber class section")
      .populate("academicSession", "name code")
      .populate("recordedBy", "name")
      .sort({ assessmentDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ProgressReport.countDocuments(query),
  ]);
  const pagination = { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
  res.json({ success: true, data: { items, progress: items, pagination, ...pagination } });
});

const saveProgress = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.body.student);
  const session = await AcademicSession.findById(req.body.academicSession);
  if (!student || !session) {
    res.status(400);
    throw new Error("Select a valid student and academic session");
  }
  if (req.user.role === "teacher") {
    const allowed = await getTeacherClassIds(req.user._id);
    if (!student.class || !allowed.has(String(student.class))) {
      res.status(403);
      throw new Error("You can only record progress for students in your classes");
    }
  }
  const assessmentDate = new Date(req.body.assessmentDate);
  if (!Number.isFinite(assessmentDate.getTime())) {
    res.status(400);
    throw new Error("A valid assessment date is required");
  }
  const fields = ["student", "academicSession", "skillLevel", "beltRank", "assessment", "strengths", "weaknesses", "instructorComments", "nextGoals"];
  const values = Object.fromEntries(fields.filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]]));
  values.assessmentDate = assessmentDate;
  values.recordedBy = req.user._id;

  let report;
  if (req.params.id) {
    report = await ProgressReport.findById(req.params.id);
    if (!report) {
      res.status(404);
      throw new Error("Progress record not found");
    }
    if (req.user.role === "teacher" && !await ProgressReport.exists({ _id: report._id, student: { $in: (await getScope(req)).student.$in } })) {
      res.status(403);
      throw new Error("You can only update progress records for students in your classes");
    }
    Object.assign(report, values);
    await report.save();
  } else {
    report = await ProgressReport.create(values);
  }
  await report.populate([
    { path: "student", select: "firstName lastName admissionNumber class section" },
    { path: "academicSession", select: "name code" },
    { path: "recordedBy", select: "name" },
  ]);
  res.status(req.params.id ? 200 : 201).json({ success: true, progress: report });
});

module.exports = { getProgress, createProgress: saveProgress, updateProgress: saveProgress };
