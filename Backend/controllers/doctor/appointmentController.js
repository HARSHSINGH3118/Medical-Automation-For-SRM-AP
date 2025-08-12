import Appointment from "../../models/Appointment.js";
import Prescription from "../../models/Prescription.js"; // Import Prescription Model
import mongoose from "mongoose";

// ✅ Get new (pending) appointments for the logged-in doctor
export const getNewAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ status: "Pending" })
      .populate("patient", "name email") // Get patient name and email
      .populate({
        path: "prescription",
        select: "prescriptionText doctor",
        options: { strictPopulate: false }, // Avoid errors if prescription does not exist
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching new appointments:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching appointments" });
  }
};

// ✅ Update the status of an appointment (Accept or Reject)
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId, status } = req.body;

    if (!appointmentId || !status) {
      return res
        .status(400)
        .json({ message: "Missing appointmentId or status" });
    }

    // Update appointment status and assign the doctor
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointmentId, status: "Pending" }, // Only update if status is "Pending"
      { status, doctor: req.user._id }, // Assign doctor and update status
      { new: true }
    ).populate("patient", "name email");

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already updated" });
    }

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res
      .status(500)
      .json({ message: "Server error while updating appointment status" });
  }
};

// ✅ Add a prescription to an accepted appointment
export const addPrescription = async (req, res) => {
  try {
    console.log("Incoming prescription request:", req.body); // ✅ Log request data

    let { appointmentId, prescriptionText } = req.body;

    // ✅ Validate request fields
    if (!appointmentId || !prescriptionText) {
      console.error("Missing fields:", { appointmentId, prescriptionText });
      return res
        .status(400)
        .json({ message: "Missing appointmentId or prescription text" });
    }

    if (typeof appointmentId === "object") {
      console.error(
        "❌ appointmentId should be a string but got object:",
        appointmentId
      );
      return res
        .status(400)
        .json({ message: "Invalid appointment ID format, expected a string." });
    }

    // ✅ Ensure the appointment exists and has been accepted
    const appointment = await Appointment.findOne({
      appointmentId,
      status: "Accepted",
    }).populate("patient", "name _id");

    if (!appointment) {
      console.error("Appointment not found or not accepted:", appointmentId);
      return res
        .status(400)
        .json({ message: "Only accepted appointments can have prescriptions" });
    }

    // ✅ Create a new prescription entry
    const prescription = await Prescription.create({
      appointmentId,
      patient: appointment.patient._id,
      doctor: req.user._id,
      prescription: prescriptionText,
    });

    if (!prescription._id) {
      return res
        .status(500)
        .json({ message: "Invalid prescription ObjectId generated" });
    }

    // ✅ Update the Appointment with the Prescription reference
    await Appointment.findOneAndUpdate(
      { appointmentId },
      { prescription: prescription._id },
      { new: true }
    );

    console.log("Prescription added successfully:", prescription);
    res
      .status(201)
      .json({ message: "Prescription added successfully", prescription });
  } catch (error) {
    console.error("Error adding prescription:", error);
    res.status(500).json({ message: "Server error while adding prescription" });
  }
};
