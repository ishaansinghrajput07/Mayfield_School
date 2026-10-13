const express = require("express");
const {
  getMyNotifications,
  getMyUnreadCount,
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getMyNotifications);
router.get("/unread-count", getMyUnreadCount);
router.get("/admin/announcements", authorize("admin"), listAnnouncements);
router.post("/admin/announcements", authorize("admin"), createAnnouncement);
router.put(
  "/admin/announcements/:id",
  authorize("admin"),
  updateAnnouncement
);
router.delete(
  "/admin/announcements/:id",
  authorize("admin"),
  deleteAnnouncement
);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);

module.exports = router;
