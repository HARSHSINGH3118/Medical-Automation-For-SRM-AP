import React, { useState } from "react";
import "./AdminSidebar.css";

function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="admin-sidebar-desktop">
        <div className="admin-logo-section">
          <img
            src="/assets/llogo.png"
            alt="Admin Logo"
            className="admin-sidebar-logo"
          />
        </div>
        <ul className="admin-sidebar-menu">
          <li
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => handleItemClick("overview")}
          >
            Overview
          </li>
          <li
            className={activeTab === "appointments" ? "active" : ""}
            onClick={() => handleItemClick("appointments")}
          >
            Appointments
          </li>
          <li
            className={activeTab === "leave" ? "active" : ""}
            onClick={() => handleItemClick("leave")}
          >
            Leave Approvals
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => handleItemClick("users")}
          >
            Manage Users
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => handleItemClick("settings")}
          >
            Settings
          </li>
          {/* Add more, e.g. Advisory */}
        </ul>
        <button className="admin-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="admin-navbar-mobile">
        <div className="navbar-header-admin">
          <img
            src="/assets/llogo.png"
            alt="Admin Logo"
            className="admin-navbar-logo"
          />
          <button
            className="hamburger-btn-admin"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="bar-admin"></div>
            <div className="bar-admin"></div>
            <div className="bar-admin"></div>
          </button>
        </div>
        {isMenuOpen && (
          <ul className="admin-navbar-menu">
            <li
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => handleItemClick("overview")}
            >
              Overview
            </li>
            <li
              className={activeTab === "appointments" ? "active" : ""}
              onClick={() => handleItemClick("appointments")}
            >
              Appointments
            </li>
            <li
              className={activeTab === "leave" ? "active" : ""}
              onClick={() => handleItemClick("leave")}
            >
              Leave Approvals
            </li>
            <li
              className={activeTab === "users" ? "active" : ""}
              onClick={() => handleItemClick("users")}
            >
              Manage Users
            </li>
            <li
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => handleItemClick("settings")}
            >
              Settings
            </li>
            <li onClick={onLogout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
}

export default AdminSidebar;
