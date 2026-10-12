const mongoose = require("mongoose");

// Deliberately a singleton - there is only ever one row in this collection,
// fetched/updated by a fixed key rather than an _id the client has to know.
const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "school", unique: true },
    schoolName: { type: String, default: "Mayfield Global School" },
    tagline: { type: String, default: "Knowledge is Power" },
    schoolStartTime: { type: String, default: "08:00" },
    schoolEndTime: { type: String, default: "14:00" },
    workingDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    address: { type: String, default: "Neora Ganjpar, Sarai Neoraganj Road, Patna, Bihar 801113" },
    contactPhone: { type: String, default: "+91 94725 97721" },
    contactEmail: { type: String, default: "mayfieldglobalschoolpatna@gmail.com" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
