import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close menu in mobile
  };

  const handleLogout = () => {
    if (onLogout) onLogout(); // clear auth state
    localStorage.clear();
    sessionStorage.clear();
    setActiveTab("profile"); // reset default tab
    navigate("/"); // go to base URL (localhost:5173) without /login
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar-desktop">
        <div className="logo-section">
          <img
            src="/assets/llogo.png"
            alt="SRM Logo"
            className="srm-sidebar-logo"
          />
        </div>

        <ul className="sidebar-menu">
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => handleItemClick("profile")}
          >
            Profile
          </li>
          <li
            className={activeTab === "edit-profile" ? "active" : ""}
            onClick={() => handleItemClick("edit-profile")}
          >
            Edit Profile
          </li>
          <li
            className={activeTab === "book-slot" ? "active" : ""}
            onClick={() => handleItemClick("book-slot")}
          >
            Book Slot
          </li>
          <li
            className={activeTab === "history" ? "active" : ""}
            onClick={() => handleItemClick("history")}
          >
            Medical History
          </li>
          <li
            className={activeTab === "advisory" ? "active" : ""}
            onClick={() => handleItemClick("advisory")}
          >
            ADVISORY
          </li>
          <li
            className={activeTab === "leave" ? "active" : ""}
            onClick={() => handleItemClick("leave")}
          >
            MEDICAL LEAVE
          </li>
          <li
            className={activeTab === "leave-status" ? "active" : ""}
            onClick={() => handleItemClick("leave-status")}
          >
            Leave Status
          </li>
          <li
            className={activeTab === "contact" ? "active" : ""}
            onClick={() => handleItemClick("contact")}
          >
            Contact SRM AP
          </li>
        </ul>

        {/* Keep logout button fixed in place */}
        <div className="logout-container">
          <button className="logout-btn-new" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Top Navbar */}
      <div className="navbar-mobile">
        <div className="navbar-header">
          <img
            src="/assets/llogo.png"
            alt="SRM Logo"
            className="srm-navbar-logo"
          />
          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>

        {isMenuOpen && (
          <ul className="navbar-menu">
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => handleItemClick("profile")}
            >
              Profile
            </li>
            <li
              className={activeTab === "edit-profile" ? "active" : ""}
              onClick={() => handleItemClick("edit-profile")}
            >
              Edit Profile
            </li>
            <li
              className={activeTab === "book-slot" ? "active" : ""}
              onClick={() => handleItemClick("book-slot")}
            >
              Book Slot
            </li>
            <li
              className={activeTab === "history" ? "active" : ""}
              onClick={() => handleItemClick("history")}
            >
              Medical History
            </li>
            <li
              className={activeTab === "contact" ? "active" : ""}
              onClick={() => handleItemClick("contact")}
            >
              Contact SRM AP
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
