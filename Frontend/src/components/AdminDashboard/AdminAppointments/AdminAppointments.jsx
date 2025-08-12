import React, { useState, useEffect } from "react";
import "./AdminAppointments.css";

function AdminAppointments() {
  // Dummy appointments data. Replace with real API call later.
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Alice Smith",
      doctorName: "Dr. Sabeeha Farheen Sirvella",
      date: "2025-03-12",
      time: "10:00 AM",
      symptoms: "Fever, cough",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Bob Johnson",
      doctorName: "Dr. John Doe",
      date: "2025-03-12",
      time: "11:30 AM",
      symptoms: "Headache, sore throat",
      status: "Accepted",
    },
    {
      id: 3,
      patientName: "Charlie Brown",
      doctorName: "Dr. Reddy",
      date: "2025-03-11",
      time: "09:45 AM",
      symptoms: "Stomach ache",
      status: "Rejected",
    },
  ]);

  useEffect(() => {
    // When backend integration is ready, fetch the data here.
    // Example:
    // fetch('/api/admin/appointments')
    //   .then(response => response.json())
    //   .then(data => setAppointments(data))
    //   .catch(err => console.error(err));
  }, []);

  // Function to update appointment status
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  return (
    <div className="admin-appointments-container">
      <h2>Manage Appointments</h2>
      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Symptoms</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.id}</td>
                <td>{apt.patientName}</td>
                <td>{apt.doctorName}</td>
                <td>{apt.date}</td>
                <td>{apt.time}</td>
                <td>{apt.symptoms}</td>
                <td>{apt.status}</td>
                <td>
                  <select
                    value={apt.status}
                    onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments available.</p>
      )}
    </div>
  );
}

export default AdminAppointments;
