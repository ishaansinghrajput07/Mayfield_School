const mongoose = require("mongoose");

const adminAdmissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    admissionDate: { type: Date, default: Date.now },
    admissionNumber: { type: String, trim: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    notes: { type: String, trim: true, default: "" },
    rejectionReason: { type: String, trim: true, default: "" },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

adminAdmissionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("AdminAdmission", adminAdmissionSchema);
