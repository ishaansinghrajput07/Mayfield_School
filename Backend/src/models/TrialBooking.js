const mongoose = require("mongoose");

const trialBookingSchema = new mongoose.Schema(
  {
    trialNumber: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    preferredClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    preferredDate: { type: Date },
    notes: { type: String, trim: true, maxlength: 2000, default: "" },
    status: { type: String, enum: ["pending", "contacted", "approved", "rejected", "converted", "completed", "cancelled"], default: "pending" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectionNotes: { type: String, trim: true, default: "" },
    cancellationReason: { type: String, trim: true, default: "" },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    contactedAt: { type: Date },
    completedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

trialBookingSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("TrialBooking", trialBookingSchema);
