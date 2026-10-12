const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listPrograms, getProgram, createProgram, updateProgram, deleteProgram } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect);
router.route("/").get(listPrograms).post(authorize("admin"), createProgram);
router.route("/:id").get(getProgram).put(authorize("admin"), updateProgram).delete(authorize("admin"), deleteProgram);

module.exports = router;
