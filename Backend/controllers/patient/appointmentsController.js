import Appointment from "../../models/Appointment.js";
import HistoryAppointment from "../../models/historyAppointment.js";
import Prescription from "../../models/Prescription.js";
import * as appointmentService from "../../services/appointmentService.js";
import mongoose from "mongoose";

// ✅ Get all appointments (including history) for the patient
export const getAppointments = async (req, res) => {
  try {
    console.log("Fetching appointments for patient:", req.user._id);

    const currentAppointments = await Appointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "name email")
      .populate({
        path: "prescription",
        model: "Prescription", // ✅ Ensure prescription is populated
        populate: { path: "doctor", select: "name email" }, // ✅ Ensure doctor inside prescription is populated
      })
      .sort({ createdAt: -1 });

    const historicalAppointments = await HistoryAppointment.find({
      patient: req.user._id,
    })
      .populate("doctor", "name email")
      .populate({
        path: "prescription",
        model: "Prescription",
        populate: { path: "doctor", select: "name email" },
      })
      .sort({ createdAt: -1 });

    const allAppointments = [...currentAppointments, ...historicalAppointments];

    console.log(
      "Appointments fetched with prescriptions:",
      JSON.stringify(allAppointments, null, 2)
    ); // ✅ Debugging log

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments: allAppointments,
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching appointments" });
  }
};

// ✅ Book a new appointment
export const bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, details, doctorId } = req.body;

    // Generate a unique appointmentId
    const appointmentId = await appointmentService.generateAppointmentId(
      appointmentDate
    );

    // Create appointment with default status = "Pending"
    const appointment = await Appointment.create({
      appointmentId: appointmentId.toString(), // 🔥 Ensure it's stored as a string
      patient: req.user._id,
      doctor: doctorId || null,
      appointmentDate,
      details,
      status: "Pending",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error while booking appointment" });
  }
};

// ✅ Update appointment status ("Accepted" or "Rejected")
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId },
      { status },
      { new: true }
    ).populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error while updating status" });
  }
};

// ✅ Add a prescription (Fixed)
export const addPrescription = async (req, res, next) => {
  try {
    const { appointmentId, prescriptionText } = req.body;

    if (!appointmentId || !prescriptionText) {
      return res
        .status(400)
        .json({ message: "Missing appointmentId or prescription" });
    }

    // Fetch the appointment
    const appointment = await Appointment.findOne({ appointmentId }).populate(
      "patient",
      "name _id"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (!appointment.patient || !appointment.patient._id) {
      return res
        .status(400)
        .json({ message: "Patient information is missing in appointment" });
    }

    const patientId = appointment.patient._id;

    // 🔥 Ensure appointmentId is stored as a STRING in Prescription model
    const prescriptionDoc = await Prescription.create({
      appointmentId: appointmentId.toString(), // 🔥 Convert to string to avoid mismatches
      patient: patientId,
      doctor: req.user._id,
      prescription: prescriptionText,
    });

    // 🔥 Link the new Prescription to the Appointment document
    await Appointment.findOneAndUpdate(
      { appointmentId }, // Match by appointmentId as a string
      { $set: { prescription: prescriptionDoc._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Prescription added successfully",
      prescription: prescriptionDoc,
    });
  } catch (error) {
    console.error("Error adding prescription:", error);
    next(error);
  }
};
