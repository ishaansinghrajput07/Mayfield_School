const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true, unique: true },
    description: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
