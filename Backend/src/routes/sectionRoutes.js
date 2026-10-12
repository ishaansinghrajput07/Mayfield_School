const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listSections, createSection, updateSection, deleteSection, getSectionStudents } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect);
router.route("/").get(listSections).post(authorize("admin"), createSection);
router.get("/:id/students", getSectionStudents);
router.route("/:id").put(authorize("admin"), updateSection).delete(authorize("admin"), deleteSection);

module.exports = router;
