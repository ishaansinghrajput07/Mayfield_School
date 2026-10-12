const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getParentGuardians, createGuardian, updateGuardian, deleteGuardian } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect, authorize("admin"));
router.get("/parent/:parentId", getParentGuardians);
router.route("/").post(createGuardian);
router.route("/:id").put(updateGuardian).delete(deleteGuardian);

module.exports = router;
