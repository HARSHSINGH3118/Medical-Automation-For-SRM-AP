import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/patient/appointments",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Fetched Appointments:", response.data.appointments); // ✅ Debugging log
          setAppointments(response.data.appointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Medical History (Last 4 Months)</h2>

      {appointments.length === 0 ? (
        <p>No recent appointments in the last 4 months.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctor?.name || "Not Assigned"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appointment.appointmentDate).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>

            {/* ✅ Prescription Display */}
            {appointment.prescription ? (
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Prescription:</strong>{" "}
                  {appointment.prescription.prescription}
                </p>
                <p>
                  <strong>Prescribed by:</strong>{" "}
                  {appointment.prescription.doctor?.name || "Unknown"}
                </p>
              </div>
            ) : (
              <p>
                <strong>Prescription:</strong> No Prescription Yet
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default History;
