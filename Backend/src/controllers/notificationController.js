const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const NotificationAnnouncement = require("../models/NotificationAnnouncement");
const User = require("../models/User");
const { emitToUser } = require("../utils/realtime");

const ALLOWED_ANNOUNCEMENT_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
];

const getAnnouncementInput = (body) => {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const link = typeof body.link === "string" ? body.link.trim() : "";
  const roles = Array.isArray(body.roles) ? [...new Set(body.roles)] : [];

  if (!title || title.length > 120) {
    const error = new Error("Title is required and must be 120 characters or fewer");
    error.statusCode = 400;
    throw error;
  }
  if (!message || message.length > 2000) {
    const error = new Error("Message is required and must be 2000 characters or fewer");
    error.statusCode = 400;
    throw error;
  }
  if (roles.length === 0 || roles.some((role) => !ALLOWED_ANNOUNCEMENT_ROLES.includes(role))) {
    const error = new Error("Select one or more valid audience roles");
    error.statusCode = 400;
    throw error;
  }
  if (link && (!link.startsWith("/") || link.startsWith("//"))) {
    const error = new Error("Link must be a path within this application");
    error.statusCode = 400;
    throw error;
  }

  return { title, message, link, roles };
};

const getAnnouncementRecipients = (roles) =>
  User.find(
    { role: { $in: roles }, isActive: { $ne: false } },
    "_id"
  ).lean();

const createAnnouncementNotifications = async (announcement, recipients) => {
  const notifications = recipients.map((recipient) => ({
    user: recipient._id,
    announcement: announcement._id,
    type: "announcement",
    title: announcement.title,
    message: announcement.message,
    link: announcement.link,
  }));

  if (notifications.length === 0) return;

  const created = await Notification.insertMany(notifications);
  created.forEach((notification) =>
    emitToUser(notification.user, "notification:new", notification)
  );
};

const listAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await NotificationAnnouncement.find()
    .sort({ createdAt: -1 })
    .lean();
  const ids = announcements.map((announcement) => announcement._id);
  const counts = ids.length
    ? await Notification.aggregate([
        { $match: { announcement: { $in: ids } } },
        {
          $group: {
            _id: "$announcement",
            recipientCount: { $sum: 1 },
            unreadCount: {
              $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] },
            },
          },
        },
      ])
    : [];
  const countById = new Map(
    counts.map((count) => [String(count._id), count])
  );

  res.json({
    success: true,
    announcements: announcements.map((announcement) => ({
      ...announcement,
      ...(countById.get(String(announcement._id)) || {
        recipientCount: 0,
        unreadCount: 0,
      }),
    })),
  });
});

const createAnnouncement = asyncHandler(async (req, res) => {
  const input = getAnnouncementInput(req.body);
  const announcement = await NotificationAnnouncement.create({
    ...input,
    createdBy: req.user._id,
  });

  try {
    const recipients = await getAnnouncementRecipients(input.roles);
    await createAnnouncementNotifications(announcement, recipients);
    res.status(201).json({
      success: true,
      announcement: {
        ...announcement.toObject(),
        recipientCount: recipients.length,
        unreadCount: recipients.length,
      },
    });
  } catch (error) {
    await Notification.deleteMany({ announcement: announcement._id });
    await announcement.deleteOne();
    throw error;
  }
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await NotificationAnnouncement.findById(req.params.id);
  if (!announcement) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  const input = getAnnouncementInput(req.body);
  Object.assign(announcement, input);
  await announcement.save();

  const recipients = await getAnnouncementRecipients(input.roles);
  const recipientIds = recipients.map((recipient) => recipient._id);

  await Notification.deleteMany({
    announcement: announcement._id,
    user: { $nin: recipientIds },
  });
  await Notification.updateMany(
    { announcement: announcement._id },
    {
      $set: {
        title: announcement.title,
        message: announcement.message,
        link: announcement.link,
      },
    }
  );

  const existingNotifications = await Notification.find(
    { announcement: announcement._id },
    "user"
  ).lean();
  const existingUserIds = new Set(
    existingNotifications.map((notification) => String(notification.user))
  );
  const newRecipients = recipients.filter(
    (recipient) => !existingUserIds.has(String(recipient._id))
  );
  await createAnnouncementNotifications(announcement, newRecipients);

  res.json({
    success: true,
    announcement: {
      ...announcement.toObject(),
      recipientCount: recipients.length,
      unreadCount: await Notification.countDocuments({
        announcement: announcement._id,
        isRead: false,
      }),
    },
  });
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await NotificationAnnouncement.findById(req.params.id);
  if (!announcement) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  await Notification.deleteMany({ announcement: announcement._id });
  await announcement.deleteOne();
  res.json({ success: true, message: "Announcement deleted" });
});

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });
  res.json({ success: true, notifications, unreadCount });
});

const getMyUnreadCount = asyncHandler(async (req, res) => {
  const unreadCount = await Notification.countDocuments({
    user: req.user._id,
    isRead: false,
  });

  res.json({ success: true, unreadCount });
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }
  res.json({ success: true, notification });
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: "All notifications marked as read" });
});

module.exports = {
  getMyNotifications,
  getMyUnreadCount,
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  markAsRead,
  markAllAsRead,
};
