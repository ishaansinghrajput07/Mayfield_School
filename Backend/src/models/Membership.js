const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    feeStructure: { type: mongoose.Schema.Types.ObjectId, ref: "FeeStructure", required: true },
    membershipName: { type: String, required: true, trim: true },
    membershipCode: { type: String, required: true, trim: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    autoRenew: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active", "expiring", "expired", "suspended", "cancelled"], default: "pending" },
    cancellationReason: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

membershipSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate("endDate", "End date must be after start date");
  }
  next();
});

module.exports = mongoose.model("Membership", membershipSchema);
