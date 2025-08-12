import React from "react";
import "./DoctorAppointments.css";

function DoctorAppointments({
  appointments,
  prescriptions,
  onAccept,
  onReject,
  onPrescriptionChange,
  onAddPrescription,
  selectedAppointment,
}) {
  return (
    <div className="appointments-section-doctor">
      <h2>Patient Appointments</h2>
      {appointments.length > 0 ? (
        <div className="appointments-list-doctor">
          {appointments.map((apt) => (
            <div key={apt.appointmentId} className="appointment-card-doctor">
              <p>
                <strong>Patient Name:</strong> {apt.patientName || "N/A"}
              </p>
              <p>
                <strong>Symptoms:</strong> {apt.details}
              </p>
              <p>
                <strong>Slot Time:</strong>{" "}
                {apt.appointmentDate
                  ? new Date(apt.appointmentDate).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {apt.status}
              </p>
              {apt.status === "Pending" && (
                <div className="action-buttons-doctor">
                  <button
                    className="accept-btn-doctor"
                    onClick={() => onAccept(apt.appointmentId)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn-doctor"
                    onClick={() => onReject(apt.appointmentId)}
                  >
                    Reject
                  </button>
                </div>
              )}
              {apt.status === "Accepted" && (
                <div className="prescription-section-doctor">
                  {apt.prescription ? (
                    <p>
                      <strong>Prescription:</strong> {apt.prescription}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter prescription"
                        value={prescriptions[apt.appointmentId] || ""}
                        onChange={(e) =>
                          onPrescriptionChange(
                            apt.appointmentId,
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="add-prescription-btn-doctor"
                        onClick={() => onAddPrescription(apt)}
                      >
                        Add Prescription
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
}

export default DoctorAppointments;
