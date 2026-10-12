const mongoose = require("mongoose");

const guardianSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relationship: { type: String, enum: ["father", "mother", "guardian", "grandfather", "grandmother", "uncle", "aunt", "sibling", "other"], required: true },
    isPrimary: { type: Boolean, default: false },
    canReceiveNotifications: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

guardianSchema.index({ student: 1, parent: 1 }, { unique: true });

module.exports = mongoose.model("Guardian", guardianSchema);
