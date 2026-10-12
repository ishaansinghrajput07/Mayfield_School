const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    admissionNumber: { type: String, required: true, unique: true, trim: true },
    admissionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "completed", "withdrawn"], default: "active" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, academicSession: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
