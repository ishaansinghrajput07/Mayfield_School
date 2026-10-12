const express = require("express");
const { getAdminDashboard, getStudentDashboard, getOverviewDashboard } = require("../controllers/dashboardController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getOverviewDashboard);
router.get("/admin", authorize("admin"), getAdminDashboard);
router.get("/student/:studentId", getStudentDashboard);

module.exports = router;
