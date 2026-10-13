const mongoose = require("mongoose");

const notificationAnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    link: { type: String, trim: true, default: "" },
    roles: {
      type: [{ type: String, enum: ["admin", "teacher", "student", "parent"] }],
      required: true,
      validate: {
        validator: (roles) => roles.length > 0,
        message: "Select at least one audience role",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "NotificationAnnouncement",
  notificationAnnouncementSchema
);
