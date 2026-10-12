const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getProgress, createProgress, updateProgress } = require("../controllers/progressController");

const router = express.Router();

router.use(protect, authorize("admin", "teacher"));
router.route("/").get(getProgress).post(createProgress);
router.put("/:id", updateProgress);

module.exports = router;
