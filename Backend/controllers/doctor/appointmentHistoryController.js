// controllers/doctor/appointmentHistoryController.js
import Appointment from "../../models/Appointment.js";
import HistoryAppointment from "../../models/historyAppointment.js";
import Prescription from "../../models/Prescription.js";

export const getAppointmentHistory = async (req, res, next) => {
  try {
    console.log("Fetching appointment history for doctor:", req.user._id);

    // Fetch all appointments for the doctor
    const currentAppointments = await Appointment.find({ doctor: req.user._id })
      .populate("patient", "name email")
      .populate({
        path: "prescription",
        model: "Prescription", // ✅ Ensure correct population
        populate: { path: "doctor", select: "name email" }, // ✅ Fetch doctor details inside prescription
      })
      .sort({ createdAt: -1 });

    const historicalAppointments = await HistoryAppointment.find({
      doctor: req.user._id,
    })
      .populate("patient", "name email")
      .populate({
        path: "prescription",
        model: "Prescription",
        populate: { path: "doctor", select: "name email" },
      })
      .sort({ createdAt: -1 });

    // Merge both current and historical appointments
    const allAppointments = [...currentAppointments, ...historicalAppointments];

    console.log("Appointments fetched with prescriptions:", allAppointments); // Debugging log

    res.status(200).json({ appointments: allAppointments });
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    res.status(500).json({ message: "Server error while fetching history" });
  }
};
