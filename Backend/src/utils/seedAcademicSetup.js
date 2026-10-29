const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const AcademicSession = require("../models/AcademicSession");
const Class = require("../models/Class");
const FeeStructure = require("../models/FeeStructure");
const Program = require("../models/Program");

dotenv.config();

const ACADEMIC_SESSION = {
  name: "2026-27",
  code: "2026-27",
  startDate: new Date("2026-04-01T00:00:00.000Z"),
  endDate: new Date("2027-03-31T23:59:59.999Z"),
  status: "active",
  description: "Academic year from April 2026 through March 2027.",
};

const PROGRAMS = [
  { code: "PRE", name: "Pre-Primary", minOrder: 0, maxOrder: 2 },
  { code: "PRI", name: "Primary", minOrder: 3, maxOrder: 7 },
  { code: "MID", name: "Middle School", minOrder: 8, maxOrder: 10 },
  { code: "SEC", name: "Secondary", minOrder: 11, maxOrder: 12 },
  { code: "SSE", name: "Senior Secondary", minOrder: 13, maxOrder: 14 },
];

const isSampleFee = (fee) =>
  /\(SAMPLE\)$/i.test(fee.feeType || "") ||
  /^SAMPLE\b/i.test(fee.academicYear || "");

const run = async () => {
  await connectDB();

  try {
    const session = await AcademicSession.findOneAndUpdate(
      { code: ACADEMIC_SESSION.code },
      { $setOnInsert: ACADEMIC_SESSION },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const programs = await Promise.all(
      PROGRAMS.map(({ minOrder, maxOrder, ...program }) =>
        Program.findOneAndUpdate(
          { code: program.code },
          { $setOnInsert: program },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
      )
    );

    const classes = await Class.find().sort({ order: 1 });
    const programForOrder = new Map();
    PROGRAMS.forEach((range, index) => {
      for (let order = range.minOrder; order <= range.maxOrder; order += 1) {
        programForOrder.set(order, programs[index]);
      }
    });

    let updatedClasses = 0;
    for (const classDoc of classes) {
      const program = programForOrder.get(classDoc.order);
      if (!program) continue;

      const updates = {};
      if (!classDoc.program) updates.program = program._id;
      if (!classDoc.academicSession) updates.academicSession = session._id;
      if (Object.keys(updates).length) {
        await Class.updateOne({ _id: classDoc._id }, { $set: updates });
        updatedClasses += 1;
      }
    }

    const updatedClassesById = new Map(
      await Class.find().then((items) => items.map((item) => [String(item._id), item]))
    );
    const feeStructures = await FeeStructure.find({
      class: { $in: classes.map((item) => item._id) },
      $or: [
        { feeType: /\(SAMPLE\)$/i },
        { academicYear: /^SAMPLE\b/i },
      ],
    });

    let updatedSampleFees = 0;
    for (const fee of feeStructures) {
      if (!isSampleFee(fee)) continue;
      const classDoc = updatedClassesById.get(String(fee.class));
      if (!classDoc) continue;

      const updates = {};
      if (!fee.academicSession) updates.academicSession = session._id;
      if (!fee.program && classDoc.program) updates.program = classDoc.program;
      if (Object.keys(updates).length) {
        await FeeStructure.updateOne({ _id: fee._id }, { $set: updates });
        updatedSampleFees += 1;
      }
    }

    console.log(
      `Academic setup ready: ${programs.length} programs, 1 session, ${updatedClasses} classes and ${updatedSampleFees} sample fee structures updated.`
    );
  } finally {
    await mongoose.connection.close();
  }
};

run().catch((error) => {
  console.error("Academic setup seed failed:", error);
  process.exitCode = 1;
});