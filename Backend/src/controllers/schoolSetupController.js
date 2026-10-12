const asyncHandler = require("express-async-handler");
const AcademicSession = require("../models/AcademicSession");
const Class = require("../models/Class");
const Guardian = require("../models/Guardian");
const Program = require("../models/Program");
const Section = require("../models/Section");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const TeachingSchedule = require("../models/TeachingSchedule");
const User = require("../models/User");

const sendNotFound = (res, message) => {
  res.status(404);
  throw new Error(message);
};

const listPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find().sort({ name: 1 });
  res.json({ success: true, programs });
});

const getProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) return sendNotFound(res, "Program not found");
  res.json({ success: true, program });
});

const createProgram = asyncHandler(async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json({ success: true, message: "Program created successfully", program });
});

const updateProgram = asyncHandler(async (req, res) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!program) return sendNotFound(res, "Program not found");
  res.json({ success: true, message: "Program updated successfully", program });
});

const deleteProgram = asyncHandler(async (req, res) => {
  const [schedule, classReference] = await Promise.all([
    TeachingSchedule.exists({ program: req.params.id }),
    Class.exists({ program: req.params.id }),
  ]);
  if (schedule || classReference) {
    res.status(409);
    throw new Error("Program is used by a teaching assignment and cannot be deleted");
  }
  const program = await Program.findByIdAndDelete(req.params.id);
  if (!program) return sendNotFound(res, "Program not found");
  res.json({ success: true, message: "Program deleted successfully" });
});

const listAcademicSessions = asyncHandler(async (req, res) => {
  const sessions = await AcademicSession.find().sort({ startDate: -1 });
  res.json({ success: true, sessions });
});

const getAcademicSession = asyncHandler(async (req, res) => {
  const session = await AcademicSession.findById(req.params.id);
  if (!session) return sendNotFound(res, "Academic session not found");
  res.json({ success: true, session });
});

const createAcademicSession = asyncHandler(async (req, res) => {
  const session = await AcademicSession.create(req.body);
  res.status(201).json({ success: true, message: "Academic session created successfully", session });
});

const updateAcademicSession = asyncHandler(async (req, res) => {
  const session = await AcademicSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!session) return sendNotFound(res, "Academic session not found");
  res.json({ success: true, message: "Academic session updated successfully", session });
});

const deleteAcademicSession = asyncHandler(async (req, res) => {
  const [section, classReference] = await Promise.all([
    Section.exists({ academicSession: req.params.id }),
    Class.exists({ academicSession: req.params.id }),
  ]);
  if (section || classReference) {
    res.status(409);
    throw new Error("Academic session is used by a section and cannot be deleted");
  }
  const session = await AcademicSession.findByIdAndDelete(req.params.id);
  if (!session) return sendNotFound(res, "Academic session not found");
  res.json({ success: true, message: "Academic session deleted successfully" });
});

const listSections = asyncHandler(async (req, res) => {
  const sections = await Section.find()
    .populate("class", "name order")
    .populate("academicSession", "name code startDate endDate")
    .sort({ createdAt: -1 });
  res.json({ success: true, sections });
});

const createSection = asyncHandler(async (req, res) => {
  const [classDoc, session] = await Promise.all([
    Class.findById(req.body.class),
    AcademicSession.findById(req.body.academicSession),
  ]);
  if (!classDoc) {
    res.status(400);
    throw new Error("Select a valid class");
  }
  if (!session) {
    res.status(400);
    throw new Error("Select a valid academic session");
  }
  const section = await Section.create(req.body);
  await section.populate([
    { path: "class", select: "name order" },
    { path: "academicSession", select: "name code startDate endDate" },
  ]);
  res.status(201).json({ success: true, message: "Section created successfully", section });
});

const updateSection = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.class && !await Class.exists({ _id: updates.class })) {
    res.status(400);
    throw new Error("Select a valid class");
  }
  if (updates.academicSession && !await AcademicSession.exists({ _id: updates.academicSession })) {
    res.status(400);
    throw new Error("Select a valid academic session");
  }
  const section = await Section.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    .populate("class", "name order")
    .populate("academicSession", "name code startDate endDate");
  if (!section) return sendNotFound(res, "Section not found");
  res.json({ success: true, message: "Section updated successfully", section });
});

const deleteSection = asyncHandler(async (req, res) => {
  const section = await Section.findById(req.params.id);
  if (!section) return sendNotFound(res, "Section not found");
  const studentCount = await Student.countDocuments({ class: section.class, section: section.name });
  if (studentCount) {
    res.status(409);
    throw new Error("Section still has students assigned and cannot be deleted");
  }
  await section.deleteOne();
  res.json({ success: true, message: "Section deleted successfully" });
});

const getSectionStudents = asyncHandler(async (req, res) => {
  const section = await Section.findById(req.params.id)
    .populate("class", "name order")
    .populate("academicSession", "name code startDate endDate");
  if (!section) return sendNotFound(res, "Section not found");
  const enrollments = await require("../models/Enrollment").find({
    class: section.class._id,
    section: section._id,
    academicSession: section.academicSession._id,
    status: "active",
  }).select("student");
  const rosterQuery = enrollments.length
    ? { _id: { $in: enrollments.map((enrollment) => enrollment.student) }, status: "active" }
    : { class: section.class._id, section: section.name, status: "active" };
  const students = await Student.find(rosterQuery)
    .select("-photo")
    .populate("class", "name")
    .sort({ lastName: 1, firstName: 1 });
  const count = students.length;
  res.json({
    success: true,
    section,
    students,
    count,
    availableSeats: section.capacity == null ? null : Math.max(0, section.capacity - count),
  });
});

const schedulePopulate = [
  { path: "program", select: "name code" },
  { path: "academicSession", select: "name code startDate endDate" },
  { path: "class", select: "name order sections" },
  { path: "section", select: "name code capacity roomNumber" },
  { path: "subject", select: "name code class teacher" },
  { path: "instructor", select: "name email phone teacherProfile isActive" },
];

const listSchedules = asyncHandler(async (req, res) => {
  const query = req.user.role === "teacher" ? { instructor: req.user._id } : {};
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(1000, Math.max(1, Number.parseInt(req.query.limit, 10) || 100));
  const [schedules, total] = await Promise.all([
    TeachingSchedule.find(query).populate(schedulePopulate).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    TeachingSchedule.countDocuments(query),
  ]);
  const pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };
  res.json({ success: true, schedules, data: { schedules, pagination }, pagination });
});

const validateScheduleRefs = async (body) => {
  const [program, session, classDoc, section, subject, instructor] = await Promise.all([
    Program.findById(body.program),
    AcademicSession.findById(body.academicSession),
    Class.findById(body.class),
    Section.findById(body.section),
    Subject.findById(body.subject),
    User.findOne({ _id: body.instructor, role: "teacher", isActive: true }),
  ]);
  if (!program || !session || !classDoc || !section || !subject || !instructor) {
    const error = new Error("Program, academic session, class, section, subject and active teacher must be valid");
    error.statusCode = 400;
    throw error;
  }
  if (String(section.class) !== String(classDoc._id) || String(section.academicSession) !== String(session._id)) {
    const error = new Error("The selected section must belong to the selected class and academic session");
    error.statusCode = 400;
    throw error;
  }
  if (String(subject.class) !== String(classDoc._id)) {
    const error = new Error("The selected subject must belong to the selected class");
    error.statusCode = 400;
    throw error;
  }
};

const createSchedule = asyncHandler(async (req, res) => {
  await validateScheduleRefs(req.body);
  const schedule = await TeachingSchedule.create(req.body);
  await schedule.populate(schedulePopulate);
  res.status(201).json({ success: true, message: "Teaching assignment created successfully", schedule });
});

const updateSchedule = asyncHandler(async (req, res) => {
  await validateScheduleRefs(req.body);
  const schedule = await TeachingSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(schedulePopulate);
  if (!schedule) return sendNotFound(res, "Teaching assignment not found");
  res.json({ success: true, message: "Teaching assignment updated successfully", schedule });
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await TeachingSchedule.findByIdAndDelete(req.params.id);
  if (!schedule) return sendNotFound(res, "Teaching assignment not found");
  res.json({ success: true, message: "Teaching assignment deleted successfully" });
});

const toPersonName = ({ firstName, lastName, name }) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return fullName || name?.trim();
};

const parentDto = (user) => {
  const parent = user.toObject ? user.toObject() : user;
  const [firstName, ...lastName] = (parent.name || "").split(/\s+/);
  return {
    ...parent,
    firstName,
    lastName: lastName.join(" "),
    status: parent.isActive ? "active" : "inactive",
    profile: parent.parentProfile || {},
  };
};

const createParent = asyncHandler(async (req, res) => {
  const name = toPersonName(req.body);
  if (!name || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("First name, email and password are required");
  }
  if (req.body.password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  if (!["active", "inactive", "suspended"].includes(req.body.status || "active")) {
    res.status(400);
    throw new Error("Invalid parent status");
  }
  const parent = await User.create({
    name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: "parent",
    isActive: (req.body.status || "active") === "active",
    parentProfile: {
      occupation: req.body.occupation,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      emergencyContact: req.body.emergencyContact,
    },
  });
  res.status(201).json({ success: true, message: "Parent created successfully", parent: parentDto(parent) });
});

const listParents = asyncHandler(async (req, res) => {
  const parents = await User.find({ role: "parent" }).sort({ name: 1 });
  res.json({ success: true, parents: parents.map(parentDto) });
});

const getParent = asyncHandler(async (req, res) => {
  const parent = await User.findOne({ _id: req.params.id, role: "parent" });
  if (!parent) return sendNotFound(res, "Parent not found");
  res.json({ success: true, parent: parentDto(parent) });
});

const updateParent = asyncHandler(async (req, res) => {
  const parent = await User.findOne({ _id: req.params.id, role: "parent" }).select("+password");
  if (!parent) return sendNotFound(res, "Parent not found");
  const name = toPersonName(req.body);
  if (!name || !req.body.email) {
    res.status(400);
    throw new Error("First name and email are required");
  }
  if (req.body.password && req.body.password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  if (req.body.status !== undefined && !["active", "inactive", "suspended"].includes(req.body.status)) {
    res.status(400);
    throw new Error("Invalid parent status");
  }
  parent.name = name;
  parent.email = req.body.email;
  parent.phone = req.body.phone;
  if (req.body.password) parent.password = req.body.password;
  if (req.body.status !== undefined) parent.isActive = req.body.status === "active";
  parent.parentProfile = {
    occupation: req.body.occupation,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    emergencyContact: req.body.emergencyContact,
  };
  await parent.save();
  res.json({ success: true, message: "Parent updated successfully", parent: parentDto(parent) });
});

const deleteParent = asyncHandler(async (req, res) => {
  const parent = await User.findOne({ _id: req.params.id, role: "parent" });
  if (!parent) return sendNotFound(res, "Parent not found");
  const [guardian, enrollment] = await Promise.all([
    Guardian.exists({ parent: parent._id, status: "active" }),
    require("../models/Enrollment").exists({ parent: parent._id, status: "active" }),
  ]);
  if (guardian || enrollment) {
    res.status(409);
    throw new Error("Parent still has active student links or enrollments and cannot be deleted");
  }
  await parent.deleteOne();
  res.json({ success: true, message: "Parent deleted successfully" });
});

const getParentGuardians = asyncHandler(async (req, res) => {
  const parent = await User.exists({ _id: req.params.parentId, role: "parent" });
  if (!parent) return sendNotFound(res, "Parent not found");
  const guardians = await Guardian.find({ parent: req.params.parentId, status: "active" })
    .populate("student", "firstName lastName admissionNumber class section status")
    .populate("parent", "name email phone parentProfile")
    .sort({ isPrimary: -1, createdAt: 1 });
  const children = guardians.map((guardian) => ({
    ...guardian.student.toObject(),
    guardianId: guardian._id,
    relationship: guardian.relationship,
    isPrimary: guardian.isPrimary,
    canReceiveNotifications: guardian.canReceiveNotifications,
    parent: parentDto(guardian.parent),
  }));
  res.json({ success: true, children });
});

const createGuardian = asyncHandler(async (req, res) => {
  const [student, parent] = await Promise.all([
    Student.findById(req.body.student),
    User.findOne({ _id: req.body.parent, role: "parent" }),
  ]);
  if (!student || !parent) {
    res.status(400);
    throw new Error("A valid student and parent are required");
  }
  const guardian = await Guardian.create(req.body);
  if (!parent.children.some((childId) => String(childId) === String(student._id))) {
    parent.children.push(student._id);
    await parent.save();
  }
  await guardian.populate([
    { path: "student", select: "firstName lastName admissionNumber class section status" },
    { path: "parent", select: "name email phone parentProfile" },
  ]);
  res.status(201).json({ success: true, guardian });
});

const updateGuardian = asyncHandler(async (req, res) => {
  const allowed = ["relationship", "isPrimary", "canReceiveNotifications", "status"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const guardian = await Guardian.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    .populate("student", "firstName lastName admissionNumber")
    .populate("parent", "name email phone");
  if (!guardian) return sendNotFound(res, "Guardian relationship not found");
  res.json({ success: true, guardian });
});

const deleteGuardian = asyncHandler(async (req, res) => {
  const guardian = await Guardian.findByIdAndDelete(req.params.id);
  if (!guardian) return sendNotFound(res, "Guardian relationship not found");
  const remaining = await Guardian.exists({ parent: guardian.parent, student: guardian.student, status: "active" });
  if (!remaining) {
    await User.updateOne({ _id: guardian.parent }, { $pull: { children: guardian.student } });
  }
  res.json({ success: true, message: "Student unlinked from parent successfully" });
});

const toTeacherDto = (user) => {
  const teacher = user.toObject ? user.toObject() : user;
  const [firstName, ...lastName] = (teacher.name || "").split(/\s+/);
  return {
    ...teacher,
    firstName,
    lastName: lastName.join(" "),
    qualification: teacher.teacherProfile?.qualification || "",
    specialization: teacher.teacherProfile?.specialization || "",
    employeeType: teacher.teacherProfile?.employeeType || "full_time",
    joiningDate: teacher.dateOfJoining,
    status: teacher.isActive ? "active" : "inactive",
  };
};

const listTeachers = asyncHandler(async (req, res) => {
  const query = { role: "teacher" };
  if (req.query.status === "active") query.isActive = true;
  if (req.query.status === "inactive") query.isActive = false;
  const teachers = await User.find(query).sort({ name: 1 });
  res.json({ success: true, data: { teachers: teachers.map(toTeacherDto) } });
});

const saveTeacher = asyncHandler(async (req, res) => {
  const name = toPersonName(req.body);
  if (!name || !req.body.email) {
    res.status(400);
    throw new Error("First name and email are required");
  }
  let teacher;
  if (req.params.id) {
    teacher = await User.findOne({ _id: req.params.id, role: "teacher" }).select("+password");
    if (!teacher) return sendNotFound(res, "Teacher not found");
    if (req.body.password && req.body.password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }
  } else {
    if (!req.body.password || req.body.password.length < 6) {
      res.status(400);
      throw new Error("A password of at least 6 characters is required");
    }
    teacher = new User({ role: "teacher" });
  }
  teacher.name = name;
  teacher.email = req.body.email;
  teacher.phone = req.body.phone;
  teacher.dateOfJoining = req.body.joiningDate || undefined;
  teacher.isActive = (req.body.status || "active") === "active";
  if (req.body.password) teacher.password = req.body.password;
  teacher.teacherProfile = {
    qualification: req.body.qualification,
    specialization: req.body.specialization,
    employeeType: req.body.employeeType || "full_time",
  };
  await teacher.save();
  res.status(req.params.id ? 200 : 201).json({ success: true, teacher: toTeacherDto(teacher) });
});

const setTeacherStatus = asyncHandler(async (req, res) => {
  const isActive = req.params.action === "activate";
  const teacher = await User.findOneAndUpdate(
    { _id: req.params.id, role: "teacher" },
    { isActive },
    { new: true }
  );
  if (!teacher) return sendNotFound(res, "Teacher not found");
  res.json({ success: true, teacher: toTeacherDto(teacher) });
});

module.exports = {
  listPrograms, getProgram, createProgram, updateProgram, deleteProgram,
  listAcademicSessions, getAcademicSession, createAcademicSession, updateAcademicSession, deleteAcademicSession,
  listSections, createSection, updateSection, deleteSection, getSectionStudents,
  listSchedules, createSchedule, updateSchedule, deleteSchedule,
  listParents, getParent, createParent, updateParent, deleteParent, getParentGuardians, createGuardian, updateGuardian, deleteGuardian,
  listTeachers, createTeacher: saveTeacher, updateTeacher: saveTeacher, setTeacherStatus,
};
