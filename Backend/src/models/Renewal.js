const mongoose = require("mongoose");

const renewalSchema = new mongoose.Schema(
  {
    renewalNumber: { type: String, required: true, unique: true, trim: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    previousMembership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership", required: true },
    newMembership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    remainingAmount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ["pending", "partial", "paid", "cancelled"], default: "pending" },
    status: { type: String, enum: ["pending", "approved", "completed", "cancelled"], default: "pending" },
    notes: { type: String, trim: true, default: "" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

renewalSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate("endDate", "End date must be after start date");
  }
  if (this.amount !== undefined && this.paidAmount !== undefined) {
    this.remainingAmount = Math.max(0, this.amount - this.paidAmount);
    this.paymentStatus = this.paidAmount >= this.amount ? "paid" : this.paidAmount > 0 ? "partial" : "pending";
  }
  next();
});

module.exports = mongoose.model("Renewal", renewalSchema);
