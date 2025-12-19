import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },

    // ✅ NEW FIELDS
    category: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract"],
      default: "Full Time",
    },
    salary: {
      type: String,
      default: "Not Disclosed",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
