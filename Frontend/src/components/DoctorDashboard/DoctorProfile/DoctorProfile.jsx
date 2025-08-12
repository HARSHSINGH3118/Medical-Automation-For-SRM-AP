import React from "react";
import "./DoctorProfile.css";

function DoctorProfile({ doctor, stats }) {
   

  return (
    <div className="profile-section-distinct">
      <h2 className="section-title-distinct">Profile Details</h2>

      <div className="profile-cards-wrapper-distinct">
        {/* Left Card with background image & overlay */}
        <div className="profile-card-left-distinct">
          <div className="profile-info-overlay-distinct">
            <h4 className="doctor-name-distinct">{doctor.name}</h4>
            <p>
              <strong>Experience:</strong> {doctor.experience}
            </p>
            <p>
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
            <p>
              <strong>Working Days:</strong> {doctor.workingDays}
            </p>
            <p>
              <strong>Time Slot:</strong> {doctor.timeSlot}
            </p>
          </div>
        </div>

        {/* Right Card: Appointment Statistics */}
        <div className="profile-card-right-distinct">
          <h4>Appointment Statistics</h4>
          <p>
            <strong>Total Appointments:</strong> {stats.totalAppointments}
          </p>
          <p>
            <strong>Accepted Appointments:</strong> {stats.acceptedAppointments}
          </p>
          <p>
            <strong>Pending Appointments:</strong> {stats.pendingAppointments}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
