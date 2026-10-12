const asyncHandler = require("express-async-handler");
const AdminAdmission = require("../models/AdminAdmission");
const AdmissionApplication = require("../models/AdmissionApplication");
const AcademicSession = require("../models/AcademicSession");
const Class = require("../models/Class");
const Enrollment = require("../models/Enrollment");
const Guardian = require("../models/Guardian");
const Program = require("../models/Program");
const Section = require("../models/Section");
const Student = require("../models/Student");
const User = require("../models/User");
const { sendEmail } = require("../utils/sendEmail");

const admissionPopulate = [
  { path: "student", select: "firstName lastName admissionNumber class section status" },
  { path: "parent", select: "name email phone" },
  { path: "academicSession", select: "name code startDate endDate" },
  { path: "program", select: "name code" },
  { path: "class", select: "name order program academicSession" },
  { path: "section", select: "name code capacity roomNumber" },
  { path: "enrollment" },
  { path: "reviewedBy", select: "name" },
];

const toPerson = (user) => {
  if (!user) return null;
  const [firstName, ...lastName] = user.name.split(/\s+/);
  return { ...user.toObject(), firstName, lastName: lastName.join(" ") };
};

const toPublicApplication = (application) => ({
  ...application.toObject(),
  type: "application",
  student: {
    firstName: application.applicantName,
    lastName: "",
    admissionNumber: application.assignedAdmissionNumber || "",
  },
  parent: { firstName: application.parentName, lastName: "", phone: application.parentMobile, email: application.parentEmail },
  class: application.applyingForClass,
  admissionNumber: application.assignedAdmissionNumber || "",
  admissionDate: application.createdAt,
});

const listAdmissions = asyncHandler(async (req, res) => {
  const statusFilter = ["pending", "approved", "rejected"].includes(req.query.status) ? req.query.status : undefined;
  const crmQuery = statusFilter ? { status: statusFilter } : {};
  const publicQuery = statusFilter ? { status: statusFilter } : {};
  const [crmAdmissions, publicApplications] = await Promise.all([
    AdminAdmission.find(crmQuery).populate(admissionPopulate),
    AdmissionApplication.find(publicQuery).populate("applyingForClass", "name order").populate("reviewedBy", "name"),
  ]);

  const admissions = [
    ...crmAdmissions.map((item) => ({ ...item.toObject(), type: "enrollment", parent: toPerson(item.parent) })),
    ...publicApplications.map(toPublicApplication),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, admissions });
});

const validateAdmissionReferences = async (body) => {
  const [student, parent, academicSession, program, classDoc, section] = await Promise.all([
    Student.findById(body.student),
    User.findOne({ _id: body.parent, role: "parent", isActive: true }),
    AcademicSession.findById(body.academicSession),
    Program.findById(body.program),
    Class.findById(body.class),
    Section.findById(body.section),
  ]);
  if (!student || !parent || !academicSession || !program || !classDoc || !section) {
    const error = new Error("Select a valid student, parent, academic session, program, class and section");
    error.statusCode = 400;
    throw error;
  }
  if (classDoc.program && String(classDoc.program) !== String(program._id)) {
    const error = new Error("The selected class does not belong to the selected program");
    error.statusCode = 400;
    throw error;
  }
  if (classDoc.academicSession && String(classDoc.academicSession) !== String(academicSession._id)) {
    const error = new Error("The selected class does not belong to the selected academic session");
    error.statusCode = 400;
    throw error;
  }
  if (String(section.class) !== String(classDoc._id) || String(section.academicSession) !== String(academicSession._id)) {
    const error = new Error("The selected section does not belong to the selected class and academic session");
    error.statusCode = 400;
    throw error;
  }
  return { student, parent };
};

const createAdminAdmission = asyncHandler(async (req, res) => {
  const { student, parent } = await validateAdmissionReferences(req.body);
  const existing = await AdminAdmission.exists({
    student: req.body.student,
    academicSession: req.body.academicSession,
    status: { $in: ["pending", "approved"] },
  });
  if (existing) {
    res.status(409);
    throw new Error("This student already has a pending or approved admission for the selected session");
  }
  const admission = await AdminAdmission.create({
    ...req.body,
    admissionDate: req.body.admissionDate || new Date(),
  });
  await admission.populate(admissionPopulate);
  admission.parent = toPerson(parent);
  res.status(201).json({ success: true, message: "Admission created successfully", admission });
});

const getAdminAdmission = asyncHandler(async (req, res) => {
  const admission = await AdminAdmission.findById(req.params.id).populate(admissionPopulate);
  if (admission) {
    const result = admission.toObject();
    result.parent = toPerson(admission.parent);
    return res.json({ success: true, admission: result });
  }
  const application = await AdmissionApplication.findById(req.params.id)
    .populate("applyingForClass", "name order")
    .populate("reviewedBy", "name");
  if (!application) {
    res.status(404);
    throw new Error("Admission not found");
  }
  res.json({ success: true, admission: toPublicApplication(application) });
});

const createAdmissionNumber = async (student) => {
  if (student.admissionNumber) return student.admissionNumber;
  let admissionNumber;
  do {
    admissionNumber = `ADM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
  } while (await Student.exists({ admissionNumber }) || await Enrollment.exists({ admissionNumber }));
  return admissionNumber;
};

const approveAdmission = asyncHandler(async (req, res) => {
  const admission = await AdminAdmission.findById(req.params.id);
  if (admission) {
    if (admission.status === "rejected") {
      res.status(409);
      throw new Error("A rejected admission cannot be approved");
    }
    const { student, parent } = await validateAdmissionReferences(admission);
    let enrollment = await Enrollment.findOne({ student: student._id, academicSession: admission.academicSession });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        student: student._id,
        parent: parent._id,
        academicSession: admission.academicSession,
        program: admission.program,
        class: admission.class,
        section: admission.section,
        admissionNumber: await createAdmissionNumber(student),
        admissionDate: admission.admissionDate,
        notes: admission.notes,
      });
    }
    student.class = admission.class;
    student.section = (await Section.findById(admission.section).select("name")).name;
    student.admissionDate = admission.admissionDate;
    if (!student.admissionNumber) student.admissionNumber = enrollment.admissionNumber;
    await student.save();
    if (!parent.children.some((child) => String(child) === String(student._id))) {
      parent.children.push(student._id);
      await parent.save();
    }
    await Guardian.updateOne(
      { student: student._id, parent: parent._id },
      { $setOnInsert: { relationship: "guardian", isPrimary: true, canReceiveNotifications: true, status: "active" } },
      { upsert: true, runValidators: true }
    );
    admission.status = "approved";
    admission.admissionNumber = enrollment.admissionNumber;
    admission.enrollment = enrollment._id;
    admission.reviewedBy = req.user._id;
    admission.reviewedAt = new Date();
    await admission.save();
    const populated = await admission.populate(admissionPopulate);
    const result = populated.toObject();
    result.parent = toPerson(populated.parent);
    return res.json({ success: true, message: "Admission approved and student enrolled successfully", admission: result });
  }

  const application = await AdmissionApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Admission not found");
  }
  if (application.status === "rejected") {
    res.status(409);
    throw new Error("A rejected application cannot be approved");
  }
  if (!application.assignedAdmissionNumber) {
    let candidate;
    do {
      candidate = `ADM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900000) + 100000)}`;
    } while (await Student.exists({ admissionNumber: candidate }) || await AdmissionApplication.exists({ assignedAdmissionNumber: candidate }));
    application.assignedAdmissionNumber = candidate;
  }
  application.status = "approved";
  application.reviewedBy = req.user._id;
  application.reviewedAt = new Date();
  await application.save();
  const populated = await application.populate("applyingForClass", "name order");
  res.json({ success: true, message: "Admission application approved", admission: toPublicApplication(populated) });
});

const rejectAdmission = asyncHandler(async (req, res) => {
  const reason = req.body.rejectionReason?.trim();
  if (!reason) {
    res.status(400);
    throw new Error("A rejection reason is required");
  }
  const admission = await AdminAdmission.findById(req.params.id);
  if (admission) {
    if (admission.status === "approved") {
      res.status(409);
      throw new Error("An approved admission cannot be rejected");
    }
    admission.status = "rejected";
    admission.rejectionReason = reason;
    admission.reviewedBy = req.user._id;
    admission.reviewedAt = new Date();
    await admission.save();
    const populated = await admission.populate(admissionPopulate);
    const result = populated.toObject();
    result.parent = toPerson(populated.parent);
    return res.json({ success: true, message: "Admission rejected successfully", admission: result });
  }
  const application = await AdmissionApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Admission not found");
  }
  if (application.status === "approved" || application.enrolledStudent) {
    res.status(409);
    throw new Error("An approved or enrolled application cannot be rejected");
  }
  application.status = "rejected";
  application.adminNotes = reason;
  application.reviewedBy = req.user._id;
  application.reviewedAt = new Date();
  await application.save();
  const populated = await application.populate("applyingForClass", "name order");
  res.json({ success: true, message: "Admission rejected successfully", admission: toPublicApplication(populated) });
});

const deleteAdminAdmission = asyncHandler(async (req, res) => {
  const admission = await AdminAdmission.findById(req.params.id);
  if (admission) {
    if (admission.enrollment) {
      res.status(409);
      throw new Error("An enrolled admission cannot be deleted");
    }
    await admission.deleteOne();
    return res.json({ success: true, message: "Admission deleted successfully" });
  }
  const application = await AdmissionApplication.findById(req.params.id);
  if (!application) {
    res.status(404);
    throw new Error("Admission not found");
  }
  if (application.enrolledStudent) {
    res.status(409);
    throw new Error("An enrolled application cannot be deleted");
  }
  await application.deleteOne();
  res.json({ success: true, message: "Admission application deleted successfully" });
});

module.exports = { listAdmissions, createAdminAdmission, getAdminAdmission, approveAdmission, rejectAdmission, deleteAdminAdmission };
