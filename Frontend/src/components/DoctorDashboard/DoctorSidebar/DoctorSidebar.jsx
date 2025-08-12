import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./DoctorSidebar.css";

function DoctorSidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close the menu on mobile
  };

  const handleLogout = () => {
    if (onLogout) onLogout(); // clear auth state in parent if provided
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");  
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="sidebar-doctor-desktop">
        <div className="doctor-logo-section">
          <img
            src="/assets/llogo.png"
            alt="SRM Logo"
            className="doctor-sidebar-logo"
          />
        </div>
        <ul className="doctor-sidebar-menu">
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => handleItemClick("profile")}
          >
            Profile
          </li>
          <li
            className={activeTab === "appointments" ? "active" : ""}
            onClick={() => handleItemClick("appointments")}
          >
            Appointments
          </li>
          <li
            className={activeTab === "history" ? "active" : ""}
            onClick={() => handleItemClick("history")}
          >
            Appointment History
          </li>
          <li
            className={activeTab === "leave" ? "active" : ""}
            onClick={() => handleItemClick("leave")}
          >
            Leave Approval
          </li>
          {/* <li
            className={activeTab === "advisory" ? "active" : ""}
            onClick={() => handleItemClick("advisory")}
          >
            Advisory
          </li> */}
          <li
            className={activeTab === "contact" ? "active" : ""}
            onClick={() => handleItemClick("contact")}
          >
            Contact SRM AP
          </li>
        </ul>
        <button className="doctor-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="navbar-doctor-mobile">
        <div className="navbar-header-doctor">
          <img
            src="/assets/llogo.png"
            alt="SRM Logo"
            className="doctor-navbar-logo"
          />
          <button
            className="hamburger-btn-doctor"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="bar-doctor"></div>
            <div className="bar-doctor"></div>
            <div className="bar-doctor"></div>
          </button>
        </div>
        {isMenuOpen && (
          <ul className="navbar-menu-doctor">
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => handleItemClick("profile")}
            >
              Profile
            </li>
            <li
              className={activeTab === "appointments" ? "active" : ""}
              onClick={() => handleItemClick("appointments")}
            >
              Appointments
            </li>
            <li
              className={activeTab === "history" ? "active" : ""}
              onClick={() => handleItemClick("history")}
            >
              Appointment History
            </li>
            <li
              className={activeTab === "leave" ? "active" : ""}
              onClick={() => handleItemClick("leave")}
            >
              Leave Approval
            </li>
            <li
              className={activeTab === "advisory" ? "active" : ""}
              onClick={() => handleItemClick("advisory")}
            >
              Advisory
            </li>
            <li
              className={activeTab === "contact" ? "active" : ""}
              onClick={() => handleItemClick("contact")}
            >
              Contact SRM AP
            </li>
           <Link to="/" className="doctor-logout-btn" onClick={onLogout}>
  Logout
</Link>
          </ul>
        )}
      </div>
    </>
  );
}

export default DoctorSidebar;
