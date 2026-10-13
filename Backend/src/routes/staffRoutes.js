const express = require("express");
const { getStaff, createStaff, updateStaff, deleteStaff, getTeachers, createTeacher } = require("../controllers/staffController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("admin"));

router.route("/").get(getStaff).post(createStaff);
router.route("/teachers").get(getTeachers).post(createTeacher);
router.route("/:id").put(updateStaff).delete(deleteStaff);

module.exports = router;
