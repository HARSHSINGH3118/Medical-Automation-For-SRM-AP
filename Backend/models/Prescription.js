import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", PrescriptionSchema);
