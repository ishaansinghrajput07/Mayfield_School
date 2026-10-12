const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listAcademicSessions, getAcademicSession, createAcademicSession, updateAcademicSession, deleteAcademicSession } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect);
router.route("/").get(listAcademicSessions).post(authorize("admin"), createAcademicSession);
router.route("/:id").get(getAcademicSession).put(authorize("admin"), updateAcademicSession).delete(authorize("admin"), deleteAcademicSession);

module.exports = router;
