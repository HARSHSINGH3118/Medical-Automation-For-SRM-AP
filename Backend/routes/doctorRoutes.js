// routes/doctorRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getDoctorProfile,
  getNewAppointments,
  updateAppointmentStatus,
  addPrescription,
  getAppointmentHistory,
  getAllLeaveForms,
  updateLeaveFormStatus,
} from "../controllers/doctor/index.js";

const router = express.Router();

// Doctor Profile
router.get("/profile", protect, getDoctorProfile);

// New Appointments (Pending) & Accept/Reject Actions
router.get("/appointments/new", protect, getNewAppointments);
router.post("/appointments/update", protect, updateAppointmentStatus);

// Adding Prescription for an accepted appointment
router.post("/appointments/prescription", protect, addPrescription);

// Appointment History (all appointments with statuses and prescriptions)
router.get("/appointments/history", protect, getAppointmentHistory);

// OD/ML Leave Forms - Approve/Reject
router.get("/leave-forms", protect, getAllLeaveForms);
router.post("/leave-forms/update", protect, updateLeaveFormStatus);

export default router;
