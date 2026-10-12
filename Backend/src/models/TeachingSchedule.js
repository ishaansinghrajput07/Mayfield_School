const mongoose = require("mongoose");

const teachingScheduleSchema = new mongoose.Schema(
  {
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

teachingScheduleSchema.index({ academicSession: 1, class: 1, section: 1, subject: 1, instructor: 1 }, { unique: true });

module.exports = mongoose.model("TeachingSchedule", teachingScheduleSchema);
