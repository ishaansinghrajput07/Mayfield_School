const mongoose = require("mongoose");

const feeAssignmentSchema = new mongoose.Schema(
  {
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    feeStructure: { type: mongoose.Schema.Types.ObjectId, ref: "FeeStructure", required: true },
    amount: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    remainingAmount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date },
    status: { type: String, enum: ["due", "partial", "paid", "overdue", "cancelled"], default: "due" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

feeAssignmentSchema.index({ membership: 1 }, { unique: true });

module.exports = mongoose.model("FeeAssignment", feeAssignmentSchema);
