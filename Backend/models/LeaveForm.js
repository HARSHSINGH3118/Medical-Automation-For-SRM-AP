// models/LeaveForm.js
import mongoose from "mongoose";

const LeaveFormSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // The primary reason or title for the leave request
    reason: {
      type: String,
      required: true,
    },
    // Additional fields
    symptoms: {
      type: String,
      default: "",
    },
    illnessStartDate: {
      type: Date,
      default: null,
    },
    illnessEndDate: {
      type: Date,
      default: null,
    },
    severity: {
      type: String,
      enum: ["Mild", "Moderate", "Severe"],
      default: "Mild",
    },
    consultedDoctor: {
      type: Boolean,
      default: false,
    },
    // The uploaded medical report file (GridFS file ID or filename)
    reportFile: {
      type: String,
      required: false, // If the file is optional, make this non-required
    },

    reportFileName: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeaveForm", LeaveFormSchema);
