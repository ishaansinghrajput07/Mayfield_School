const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Fee = require("../models/Fee");
const Salary = require("../models/Salary");
const Ticket = require("../models/Ticket");
const Notice = require("../models/Notice");
const Transaction = require("../models/Transaction");
const Assignment = require("../models/Assignment");
const Project = require("../models/Project");
const User = require("../models/User");
const Program = require("../models/Program");
const AcademicSession = require("../models/AcademicSession");
const Class = require("../models/Class");
const Section = require("../models/Section");
const Subject = require("../models/Subject");
const TeachingSchedule = require("../models/TeachingSchedule");
const AdminAdmission = require("../models/AdminAdmission");
const AdmissionApplication = require("../models/AdmissionApplication");
const Enrollment = require("../models/Enrollment");
const Membership = require("../models/Membership");
const FeeAssignment = require("../models/FeeAssignment");
const CrmPayment = require("../models/CrmPayment");
const Renewal = require("../models/Renewal");
const ContactInquiry = require("../models/ContactInquiry");
const TrialBooking = require("../models/TrialBooking");
const AuditLog = require("../models/AuditLog");

const countByStatus = async (Model, statuses, baseQuery = {}) =>
  Object.fromEntries(
    await Promise.all(
      statuses.map(async (status) => [
        status,
        await Model.countDocuments({ ...baseQuery, status }),
      ])
    )
  );

// @desc    CRM dashboard summary for admins and teachers
// @route   GET /api/dashboard
const getOverviewDashboard = asyncHandler(async (req, res) => {
  if (!["admin", "teacher"].includes(req.user.role)) {
    res.status(403);
    throw new Error("The CRM dashboard is available to administrators and teachers");
  }

  const isTeacher = req.user.role === "teacher";
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfDay);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const withinSevenDays = new Date(startOfDay);
  withinSevenDays.setDate(withinSevenDays.getDate() + 7);
  const withinThirtyDays = new Date(startOfDay);
  withinThirtyDays.setDate(withinThirtyDays.getDate() + 30);

  const attendanceQuery = {
    date: { $gte: startOfDay, $lt: startOfTomorrow },
    ...(isTeacher ? { markedBy: req.user._id } : {}),
  };
  const scheduleQuery = {
    ...(isTeacher ? { instructor: req.user._id } : {}),
  };
  const activityQuery = {
    ...(isTeacher ? { userId: req.user._id } : {}),
  };

  const [
    studentTotal,
    studentActive,
    parentTotal,
    parentActive,
    teacherTotal,
    teacherActive,
    programTotal,
    programActive,
    sessionTotal,
    sessionActive,
    classTotal,
    sectionTotal,
    sectionActive,
    subjectTotal,
    scheduleTotal,
    scheduleActive,
    admissionCounts,
    publicAdmissionCounts,
    enrollmentCounts,
    membershipActive,
    membershipExpired,
    membershipExpiring,
    membershipExpiringSevenDays,
    assignmentCounts,
    paymentCounts,
    successfulPaymentTotals,
    attendanceRecords,
    renewalCounts,
    renewalPaymentCounts,
    inquiryCounts,
    trialCounts,
    trialToday,
    teacherSchedules,
    recentActivity,
  ] = await Promise.all([
    isTeacher ? Promise.resolve(0) : User.countDocuments({ role: "student" }),
    isTeacher ? Promise.resolve(0) : Student.countDocuments({ status: "active" }),
    isTeacher ? Promise.resolve(0) : User.countDocuments({ role: "parent" }),
    isTeacher ? Promise.resolve(0) : User.countDocuments({ role: "parent", isActive: true }),
    isTeacher ? Promise.resolve(0) : User.countDocuments({ role: "teacher" }),
    isTeacher ? Promise.resolve(0) : User.countDocuments({ role: "teacher", isActive: true }),
    isTeacher ? Promise.resolve(0) : Program.countDocuments(),
    isTeacher ? Promise.resolve(0) : Program.countDocuments({ status: "active" }),
    isTeacher ? Promise.resolve(0) : AcademicSession.countDocuments(),
    isTeacher ? Promise.resolve(0) : AcademicSession.countDocuments({ status: "active" }),
    isTeacher ? Promise.resolve(0) : Class.countDocuments(),
    isTeacher ? Promise.resolve(0) : Section.countDocuments(),
    isTeacher ? Promise.resolve(0) : Section.countDocuments({ status: "active" }),
    isTeacher ? Promise.resolve(0) : Subject.countDocuments(),
    TeachingSchedule.countDocuments(scheduleQuery),
    TeachingSchedule.countDocuments({ ...scheduleQuery, status: "active" }),
    isTeacher ? Promise.resolve({}) : countByStatus(AdminAdmission, ["pending", "approved", "rejected"]),
    isTeacher ? Promise.resolve({}) : countByStatus(AdmissionApplication, ["pending", "approved", "rejected"]),
    isTeacher ? Promise.resolve({}) : countByStatus(Enrollment, ["active", "completed", "withdrawn"]),
    isTeacher ? Promise.resolve(0) : Membership.countDocuments({ status: "active" }),
    isTeacher ? Promise.resolve(0) : Membership.countDocuments({ status: "expired" }),
    isTeacher ? Promise.resolve(0) : Membership.countDocuments({ status: { $in: ["active", "expiring"] }, endDate: { $gte: startOfDay, $lt: withinThirtyDays } }),
    isTeacher ? Promise.resolve(0) : Membership.countDocuments({ status: { $in: ["active", "expiring"] }, endDate: { $gte: startOfDay, $lt: withinSevenDays } }),
    isTeacher ? Promise.resolve({}) : countByStatus(FeeAssignment, ["paid", "due", "overdue", "partial"]),
    isTeacher
      ? Promise.resolve({})
      : Promise.all([
          CrmPayment.countDocuments({ paymentStatus: "success" }),
          CrmPayment.countDocuments({ paymentStatus: "pending" }),
        ]).then(([success, pending]) => ({ success, pending })),
    isTeacher
      ? Promise.resolve([])
      : CrmPayment.aggregate([
          { $match: { paymentStatus: "success", paymentDate: { $gte: startOfMonth } } },
          { $facet: {
            today: [
              { $match: { paymentDate: { $gte: startOfDay, $lt: startOfTomorrow } } },
              { $group: { _id: null, amount: { $sum: "$amount" }, count: { $sum: 1 } } },
            ],
            month: [{ $group: { _id: null, amount: { $sum: "$amount" }, count: { $sum: 1 } } }],
          } },
        ]),
    Attendance.find(attendanceQuery).select("status"),
    isTeacher ? Promise.resolve({}) : countByStatus(Renewal, ["pending", "approved", "completed", "cancelled"]),
    isTeacher
      ? Promise.resolve({})
      : Renewal.countDocuments({ paymentStatus: "partial" }).then((partial) => ({ partial })),
    isTeacher ? Promise.resolve({}) : countByStatus(ContactInquiry, ["pending", "open", "assigned", "in_progress", "resolved", "closed"]),
    isTeacher ? Promise.resolve({}) : countByStatus(TrialBooking, ["pending", "contacted", "approved", "completed", "cancelled"]),
    isTeacher
      ? Promise.resolve(0)
      : TrialBooking.countDocuments({ preferredDate: { $gte: startOfDay, $lt: startOfTomorrow } }),
    isTeacher
      ? TeachingSchedule.find(scheduleQuery)
          .populate("program", "name")
          .populate("academicSession", "name")
          .populate("class", "name")
          .populate("section", "name")
          .populate("subject", "name")
          .sort({ createdAt: -1 })
      : Promise.resolve([]),
    AuditLog.find(activityQuery)
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(10),
  ]);

  const attendance = attendanceRecords.reduce(
    (result, record) => {
      result.total += 1;
      if (record.status === "present") result.present += 1;
      else if (record.status === "absent") result.absent += 1;
      else if (record.status === "late") result.late += 1;
      else if (record.status === "half_day") result.excused += 1;
      return result;
    },
    { total: 0, present: 0, absent: 0, late: 0, excused: 0 }
  );
  attendance.percentage = attendance.total
    ? Math.round((attendance.present / attendance.total) * 1000) / 10
    : 0;

  const applicationValues = [
    ...Object.values(admissionCounts),
    ...Object.values(publicAdmissionCounts),
  ];
  const paymentTotals = successfulPaymentTotals[0] || { today: [], month: [] };
  const todayPayments = paymentTotals.today[0] || { amount: 0, count: 0 };
  const monthPayments = paymentTotals.month[0] || { amount: 0, count: 0 };
  const activity = recentActivity.map((item) => {
    const entry = item.toObject();
    const [firstName = "", ...lastName] = (entry.userId?.name || "").split(/\s+/);
    return {
      ...entry,
      userId: entry.userId ? { firstName, lastName: lastName.join(" ") } : null,
    };
  });

  res.json({
    success: true,
    data: isTeacher
      ? {
          assignments: { total: scheduleTotal, items: teacherSchedules },
          attendance,
          recentActivity: activity,
        }
      : {
          users: {
            students: { total: studentTotal, active: studentActive },
            parents: { total: parentTotal, active: parentActive },
            teachers: { total: teacherTotal, active: teacherActive },
          },
          academics: {
            programs: { total: programTotal, active: programActive },
            academicSessions: { total: sessionTotal, active: sessionActive },
            classes: { total: classTotal, active: classTotal },
            sections: { total: sectionTotal, active: sectionActive },
            subjects: { total: subjectTotal, active: subjectTotal },
            schedules: { total: scheduleTotal, active: scheduleActive },
          },
          admissions: {
            total: applicationValues.reduce((total, count) => total + count, 0),
            pending: (admissionCounts.pending || 0) + (publicAdmissionCounts.pending || 0),
            approved: (admissionCounts.approved || 0) + (publicAdmissionCounts.approved || 0),
            rejected: (admissionCounts.rejected || 0) + (publicAdmissionCounts.rejected || 0),
            cancelled: 0,
          },
          enrollments: {
            total: Object.values(enrollmentCounts).reduce((total, count) => total + count, 0),
            active: enrollmentCounts.active || 0,
            completed: enrollmentCounts.completed || 0,
            transferred: 0,
            withdrawn: enrollmentCounts.withdrawn || 0,
          },
          memberships: {
            active: membershipActive,
            expired: membershipExpired,
            expiring: membershipExpiring,
            expiring7Days: membershipExpiringSevenDays,
          },
          fees: {
            assignments: {
              total: Object.values(assignmentCounts).reduce((total, count) => total + count, 0),
              paid: assignmentCounts.paid || 0,
              due: (assignmentCounts.due || 0) + (assignmentCounts.partial || 0),
              overdue: assignmentCounts.overdue || 0,
            },
          },
          payments: {
            successful: paymentCounts.success || 0,
            pending: paymentCounts.pending || 0,
            today: { amount: todayPayments.amount, count: todayPayments.count },
            month: { amount: monthPayments.amount, count: monthPayments.count },
          },
          attendance,
          renewals: {
            pending: renewalCounts.pending || 0,
            approved: renewalCounts.approved || 0,
            partial: renewalPaymentCounts.partial || 0,
            completed: renewalCounts.completed || 0,
            cancelled: renewalCounts.cancelled || 0,
          },
          queries: {
            total: Object.values(inquiryCounts).reduce((total, count) => total + count, 0),
            new: inquiryCounts.pending || 0,
            open: inquiryCounts.open || 0,
            inProgress: (inquiryCounts.assigned || 0) + (inquiryCounts.in_progress || 0),
            resolved: (inquiryCounts.resolved || 0) + (inquiryCounts.closed || 0),
          },
          trials: {
            pending: trialCounts.pending || 0,
            confirmed: (trialCounts.contacted || 0) + (trialCounts.approved || 0),
            completed: trialCounts.completed || 0,
            cancelled: trialCounts.cancelled || 0,
            today: trialToday,
          },
          recentActivity: activity,
        },
  });
});

// @desc    Admin dashboard stats + chart data
// @route   GET /api/dashboard/admin
const getAdminDashboard = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [totalStudents, todaysAttendance, pendingFeesAgg, monthIncomeAgg, monthExpenseAgg, salaryPending, openTickets, activeNotices, newAdmissions] =
    await Promise.all([
      Student.countDocuments({ status: "active" }),
      Attendance.find({ date: { $gte: today, $lt: tomorrow } }),
      Fee.aggregate([
        { $match: { status: { $in: ["pending", "partial"] } } },
        { $group: { _id: null, total: { $sum: { $subtract: [{ $add: ["$amount", "$fine"] }, "$amountPaid"] } } } },
      ]),
      Transaction.aggregate([
        { $match: { type: "income", date: { $gte: new Date(today.getFullYear(), today.getMonth(), 1) } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { type: "expense", date: { $gte: new Date(today.getFullYear(), today.getMonth(), 1) } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Salary.countDocuments({ status: "pending" }),
      Ticket.countDocuments({ status: { $in: ["open", "in_progress"] } }),
      Notice.countDocuments({ isActive: true }),
      Student.countDocuments({ admissionDate: { $gte: new Date(today.getFullYear(), today.getMonth(), 1) } }),
    ]);

  const present = todaysAttendance.filter((a) => a.status === "present" || a.status === "late").length;
  const absent = todaysAttendance.filter((a) => a.status === "absent").length;

  // Last 6 months attendance %, fee collection trend
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const monthlyAttendance = await Attendance.aggregate([
    { $match: { date: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
        present: { $sum: { $cond: [{ $in: ["$status", ["present", "late"]] }, 1, 0] } },
        total: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const monthlyIncomeExpense = await Transaction.aggregate([
    { $match: { date: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { month: { $dateToString: { format: "%Y-%m", date: "$date" } }, type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);

  const studentGrowth = await Student.aggregate([
    { $match: { admissionDate: { $gte: sixMonthsAgo } } },
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$admissionDate" } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  // Assignment/project completion - "completed" means the student did
  // something (submitted/late/approved/rejected), not left at "pending"
  const [assignments, projects] = await Promise.all([Assignment.find({}, "submissions"), Project.find({}, "submissions")]);
  const completionRate = (docs) => {
    const all = docs.flatMap((d) => d.submissions);
    if (all.length === 0) return 0;
    const done = all.filter((s) => s.status !== "pending").length;
    return Math.round((done / all.length) * 1000) / 10;
  };
  const assignmentCompletion = completionRate(assignments);
  const projectCompletion = completionRate(projects);

  // Branch-wise attendance % (falls back gracefully if branch isn't set on older records)
  const branchAttendance = await Attendance.aggregate([
    { $lookup: { from: "students", localField: "student", foreignField: "_id", as: "s" } },
    { $unwind: "$s" },
    {
      $group: {
        _id: { $ifNull: ["$s.branch", "Unassigned"] },
        present: { $sum: { $cond: [{ $in: ["$status", ["present", "late"]] }, 1, 0] } },
        total: { $sum: 1 },
      },
    },
    { $project: { branch: "$_id", percentage: { $round: [{ $multiply: [{ $divide: ["$present", "$total"] }, 100] }, 1] }, _id: 0 } },
    { $sort: { branch: 1 } },
  ]);

  res.json({
    success: true,
    cards: {
      totalStudents,
      presentStudents: present,
      absentStudents: absent,
      attendancePercentage: todaysAttendance.length ? Math.round((present / todaysAttendance.length) * 1000) / 10 : 0,
      pendingFees: pendingFeesAgg[0]?.total || 0,
      monthlyIncome: monthIncomeAgg[0]?.total || 0,
      monthlyExpenses: monthExpenseAgg[0]?.total || 0,
      salaryPending,
      openTickets,
      newAdmissions,
      activeNotices,
      assignmentCompletion,
      projectCompletion,
    },
    charts: {
      monthlyAttendance,
      monthlyIncomeExpense,
      studentGrowth,
      branchAttendance,
    },
  });
});

// @desc    Student dashboard summary
// @route   GET /api/dashboard/student/:studentId
const getStudentDashboard = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (req.user.role === "student" && String(req.user.student?._id || req.user.student) !== String(studentId)) {
    res.status(403);
    throw new Error("You can only view your own dashboard");
  }
  if (req.user.role === "parent" && !req.user.children.some((c) => String(c) === String(studentId))) {
    res.status(403);
    throw new Error("You don't have access to this student");
  }

  const studentDoc = await Student.findById(studentId, "class");
  const noticeQuery = {
    isActive: true,
    audience: { $in: ["all", "students"] },
    ...(studentDoc?.class
      ? { $or: [{ targetClasses: { $size: 0 } }, { targetClasses: studentDoc.class }] }
      : { targetClasses: { $size: 0 } }),
  };

  const [attendanceRecords, fees, latestNotice, openTickets] = await Promise.all([
    Attendance.find({ student: studentId }),
    Fee.find({ student: studentId }),
    Notice.findOne(noticeQuery).sort({ createdAt: -1 }),
    Ticket.countDocuments({ raisedBy: req.user._id, status: { $in: ["open", "in_progress"] } }),
  ]);

  const present = attendanceRecords.filter((a) => a.status === "present" || a.status === "late").length;
  const attendancePercentage = attendanceRecords.length
    ? Math.round((present / attendanceRecords.length) * 1000) / 10
    : 0;

  const pendingFees = fees
    .filter((f) => f.status !== "paid")
    .reduce((sum, f) => sum + (f.amount + f.fine - f.amountPaid), 0);

  res.json({
    success: true,
    cards: {
      attendancePercentage,
      pendingFees,
      latestNotice,
      openTickets,
    },
  });
});

module.exports = { getAdminDashboard, getStudentDashboard, getOverviewDashboard };
