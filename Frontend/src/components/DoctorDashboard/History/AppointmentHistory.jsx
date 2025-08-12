import React from "react";
import "./AppointmentHistory.css";

function AppointmentHistory({ appointments }) {
  // Helper to format a date string as dd-mm-yyyy
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return `${dd}-${mm}-${yyyy}`;
  };

  
  const groupedAppointments = appointments.reduce((acc, apt) => {
    const dateKey = formatDate(apt.appointmentDate || apt.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(apt);
    return acc;
  }, {});

   
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => {
    const [da, ma, ya] = a.split("-");
    const [db, mb, yb] = b.split("-");
    const dateA = new Date(`${ya}-${ma}-${da}`);
    const dateB = new Date(`${yb}-${mb}-${db}`);
    return dateB - dateA;
  });

  return (
    <div className="appointment-history-section">
      <h2>Doctor Appointment History</h2>
      {sortedDates.length > 0 ? (
        sortedDates.map((dateKey) => (
          <div key={dateKey} className="appointment-date-group">
            <h3 className="date-heading">{dateKey}</h3>
            <div className="appointment-cards-group">
              {groupedAppointments[dateKey].map((apt) => {
                // Convert the appointmentDate to a local time
                const timeString = apt.appointmentDate
                  ? new Date(apt.appointmentDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A";

                 
                const prescriptionText =
                  apt.prescription && apt.prescription.prescription
                    ? apt.prescription.prescription
                    : "Not Provided";

                return (
                  <div
                    key={apt.appointmentId || apt._id}
                    className="appointment-history-card"
                  >
                    <p>
                      <strong>Patient Name:</strong>{" "}
                      {apt.patient?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Time:</strong> {timeString}
                    </p>
                    <p>
                      <strong>Status:</strong> {apt.status}
                    </p>
                    <p>
                      <strong>Prescription:</strong> {prescriptionText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p>No appointment history available.</p>
      )}
    </div>
  );
}

export default AppointmentHistory;
