const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { listParents, getParent, createParent, updateParent, deleteParent } = require("../controllers/schoolSetupController");

const router = express.Router();

router.use(protect, authorize("admin"));
router.route("/").get(listParents).post(createParent);
router.route("/:id").get(getParent).put(updateParent).delete(deleteParent);

module.exports = router;
