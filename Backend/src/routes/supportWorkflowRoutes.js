const express = require("express");
const rateLimit = require("express-rate-limit");
const { protect, authorize } = require("../middleware/auth");
const {
  listQueries, getQuery, addQueryReply, updateQueryNotes, updateQueryStatus, assignQuery, closeQuery,
  createTrial, listTrials, getTrial, updateTrialAction,
  listAuditLogs, getAuditLog,
} = require("../controllers/supportWorkflowController");

const router = express.Router();
const trialSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many trial bookings - please try again later" },
});

router.post("/trials", trialSubmissionLimiter, createTrial);
router.use(protect, authorize("admin"));

router.get("/queries", listQueries);
router.get("/queries/:id", getQuery);
router.post("/queries/:id/replies", addQueryReply);
router.put("/queries/:id/internal-notes", updateQueryNotes);
router.put("/queries/:id/status", updateQueryStatus);
router.put("/queries/:id/assign", assignQuery);
router.put("/queries/:id/close", closeQuery);

router.get("/trials", listTrials);
router.get("/trials/:id", getTrial);
router.put("/trials/:id/:action", updateTrialAction);

router.get("/audit-logs", listAuditLogs);
router.get("/audit-logs/:id", getAuditLog);

module.exports = router;
