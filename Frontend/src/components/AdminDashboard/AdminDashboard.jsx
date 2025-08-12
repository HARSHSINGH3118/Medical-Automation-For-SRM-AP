import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Overview from "./Overview/Overview";
import AdminAppointments from "./AdminAppointments/AdminAppointments";
import AdminLeave from "./AdminLeave/AdminLeave";
import AdminSettings from "./AdminSettings/AdminSettings";
import AdminUsers from "./AdminUsers/AdminUsers";
import "./AdminDashboard.css";

/* 
  If you want an admin advisory section, you can create:
  import AdminAdvisory from "./AdminAdvisory/AdminAdvisory";
*/

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    alert("Logging out as admin...");
    // Additional logout logic
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="admin-main-content">
        {activeTab === "overview" && <Overview />}
        {activeTab === "appointments" && <AdminAppointments />}
        {activeTab === "leave" && <AdminLeave />}
        {activeTab === "users" && <AdminUsers />}
        {activeTab === "settings" && <AdminSettings />}
        {/* 
          If you have AdminAdvisory:
          {activeTab === "advisory" && <AdminAdvisory />}
        */}
      </div>
    </div>
  );
}

export default AdminDashboard;
