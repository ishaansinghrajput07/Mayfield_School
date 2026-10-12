const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    code: { type: String, trim: true, uppercase: true },
    academicSession: { type: mongoose.Schema.Types.ObjectId, ref: "AcademicSession" },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    feeType: { type: String, required: true, trim: true }, // e.g. Tuition, Transport, Library
    amount: { type: Number, required: true, min: 0 },
    // Optional - most fee types (Tuition, Transport) recur every semester;
    // some (a one-time Admission fee) don't apply to a specific semester at
    // all, hence optional rather than required.
    semester: { type: Number, min: 1 },
    dueDate: { type: Date },
    frequency: { type: String, trim: true, default: "one_time" },
    dueDay: { type: Number, min: 1, max: 31 },
    academicYear: { type: String, trim: true },
    description: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

feeStructureSchema.index({ class: 1, feeType: 1, academicYear: 1 });
feeStructureSchema.index({ code: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("FeeStructure", feeStructureSchema);