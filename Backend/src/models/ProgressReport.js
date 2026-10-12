const mongoose = require("mongoose");

const progressReportSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    skillLevel: { type: String, trim: true, default: "" },
    beltRank: { type: String, trim: true, default: "" },
    assessment: { type: String, trim: true, required: true, maxlength: 2000 },
    strengths: { type: String, trim: true, default: "" },
    weaknesses: { type: String, trim: true, default: "" },
    instructorComments: { type: String, trim: true, default: "" },
    nextGoals: { type: String, trim: true, default: "" },
    assessmentDate: { type: Date, required: true },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

progressReportSchema.index({ student: 1, academicSession: 1, assessmentDate: -1 });

module.exports = mongoose.model("ProgressReport", progressReportSchema);
