const express = require("express");
const rateLimit = require("express-rate-limit");
const { submitApplication, getApplications, updateApplication, deleteApplication } = require("../controllers/admissionController");
const { listAdmissions, createAdminAdmission, getAdminAdmission, approveAdmission, rejectAdmission, deleteAdminAdmission } = require("../controllers/adminAdmissionController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

const applicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many applications submitted - please try again later" },
});

router.post("/", (req, res, next) => {
  if (!req.body.student) return applicationLimiter(req, res, next);
  return protect(req, res, (authError) => {
    if (authError) return next(authError);
    return authorize("admin")(req, res, next);
  });
}, (req, res, next) => (
  req.body.student ? createAdminAdmission : submitApplication
)(req, res, next));

router.use(protect, authorize("admin"));
router.get("/", listAdmissions);
router.get("/:id", getAdminAdmission);
router.put("/:id/approve", approveAdmission);
router.put("/:id/reject", rejectAdmission);
router.patch("/:id", updateApplication);
router.delete("/:id", deleteAdminAdmission);

module.exports = router;
