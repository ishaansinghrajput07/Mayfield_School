const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listTeachers, createTeacher, updateTeacher, setTeacherStatus } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect, authorize("admin"));
router.route("/").get(listTeachers).post(createTeacher);
router.put("/:id/activate", (req, res, next) => {
  req.params.action = "activate";
  next();
}, setTeacherStatus);
router.put("/:id/deactivate", (req, res, next) => {
  req.params.action = "deactivate";
  next();
}, setTeacherStatus);
router.put("/:id", updateTeacher);

module.exports = router;
