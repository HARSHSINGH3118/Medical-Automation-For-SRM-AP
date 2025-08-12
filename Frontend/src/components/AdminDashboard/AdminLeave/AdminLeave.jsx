import React from "react";
import "./AdminLeave.css";

function AdminLeave() {
  return (
    <div className="admin-leave-container">
      <h2>Leave Approvals</h2>
      <p>
        This is a placeholder for admin to view/approve/reject leave requests
        (if needed at admin level).
      </p>
      {/* 
        Possibly a table or list of all leave requests 
        with statuses, doctor/patient references, etc.
      */}
    </div>
  );
}

export default AdminLeave;
