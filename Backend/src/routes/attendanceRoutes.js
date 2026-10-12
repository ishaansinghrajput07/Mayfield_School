const express = require("express");
const { markAttendance, getAttendance, getAttendanceSummary, getMyClasses, getClassEligibility, getSectionAttendanceStudents, saveSingleAttendance, updateSingleAttendance } = require("../controllers/attendanceController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/mark", authorize("admin", "teacher"), markAttendance);
router.get("/section/:sectionId/students", authorize("admin", "teacher"), getSectionAttendanceStudents);
router.get("/my-classes", authorize("teacher"), getMyClasses);
router.get("/eligibility/:classId", authorize("admin", "teacher"), getClassEligibility);
router.get("/", getAttendance);
router.post("/", authorize("admin", "teacher"), saveSingleAttendance);
router.put("/:id", authorize("admin", "teacher"), updateSingleAttendance);
router.get("/summary/:studentId", getAttendanceSummary);

module.exports = router;