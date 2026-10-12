const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listSchedules, createSchedule, updateSchedule, deleteSchedule } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect);
router.route("/").get(listSchedules).post(authorize("admin"), createSchedule);
router.route("/:id").put(authorize("admin"), updateSchedule).delete(authorize("admin"), deleteSchedule);

module.exports = router;
