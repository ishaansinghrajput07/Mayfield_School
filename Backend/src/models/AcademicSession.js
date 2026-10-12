const mongoose = require("mongoose");

const academicSessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, uppercase: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["upcoming", "active", "completed", "archived"], default: "upcoming" },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

academicSessionSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate("endDate", "End date must be after start date");
  }
  next();
});

module.exports = mongoose.model("AcademicSession", academicSessionSchema);
