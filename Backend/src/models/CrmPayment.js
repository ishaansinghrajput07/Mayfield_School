const mongoose = require("mongoose");

const crmPaymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession", required: true },
    feeAssignment: { type: mongoose.Schema.Types.ObjectId, ref: "FeeAssignment" },
    renewal: { type: mongoose.Schema.Types.ObjectId, ref: "Renewal" },
    amount: { type: Number, required: true, min: 0.01 },
    paymentMethod: { type: String, enum: ["cash", "upi", "bank_transfer", "cheque", "razorpay"], required: true },
    paymentStatus: { type: String, enum: ["success", "pending", "failed", "cancelled", "refunded"], default: "success" },
    paymentDate: { type: Date, default: Date.now },
    transactionId: { type: String, trim: true, sparse: true, unique: true },
    notes: { type: String, trim: true, default: "" },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

crmPaymentSchema.pre("validate", function (next) {
  if (Boolean(this.feeAssignment) === Boolean(this.renewal)) {
    this.invalidate("feeAssignment", "Select exactly one fee assignment or renewal for a payment");
  }
  next();
});

module.exports = mongoose.model("CrmPayment", crmPaymentSchema);
