// services/prescriptionService.js
export const addPrescription = async (
  appointmentId,
  doctorId,
  prescriptionText
) => {
  // Business logic for adding a prescription can be implemented here.
  return { appointmentId, doctorId, prescriptionText };
};
