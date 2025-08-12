// services/appointmentService.js
import Appointment from "../models/Appointment.js";

export const generateAppointmentId = async (appointmentDate) => {
  // Format appointmentDate to ddmmyyyy
  const dateObj = new Date(appointmentDate);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const dateStr = `${day}${month}${year}`;

  // Count appointments for that day to generate serial number
  const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
  const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));
  const count = await Appointment.countDocuments({
    appointmentDate: { $gte: startOfDay, $lte: endOfDay },
  });

  // Serial number: count+1, padded to 2 digits
  const serial = String(count + 1).padStart(2, "0");
  return `${dateStr}-${serial}`;
};
