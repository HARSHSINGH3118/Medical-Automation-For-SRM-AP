// models/historyAppointment.js
import mongoose from "mongoose";

const HistoryAppointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    details: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    prescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HistoryAppointment", HistoryAppointmentSchema);
