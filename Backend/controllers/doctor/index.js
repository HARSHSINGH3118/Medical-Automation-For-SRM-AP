// controllers/doctor/index.js
export { getDoctorProfile } from "./profileController.js";
export {
  getNewAppointments,
  updateAppointmentStatus,
  addPrescription,
} from "./appointmentController.js";
export { getAppointmentHistory } from "./appointmentHistoryController.js";
export { getAllLeaveForms, updateLeaveFormStatus } from "./leaveController.js";
