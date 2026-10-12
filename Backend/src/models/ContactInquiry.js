const mongoose = require("mongoose");

const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    queryNumber: { type: String, trim: true },
    subject: { type: String, trim: true, default: "Website contact inquiry" },
    category: { type: String, enum: ["admission", "attendance", "progress", "class", "schedule", "membership", "renewal", "payment", "trial", "technical", "general", "other"], default: "general" },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    status: { type: String, enum: ["pending", "open", "assigned", "in_progress", "resolved", "closed"], default: "open" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    internalNotes: { type: String, trim: true, default: "" },
    replies: [
      {
        message: { type: String, required: true, trim: true, maxlength: 4000 },
        isInternal: { type: Boolean, default: false },
        repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ip: { type: String },
  },
  { timestamps: true }
);

contactInquirySchema.index({ status: 1, createdAt: -1 });
contactInquirySchema.index({ queryNumber: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("ContactInquiry", contactInquirySchema);
