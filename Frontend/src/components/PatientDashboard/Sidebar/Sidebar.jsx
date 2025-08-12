import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close the menu on mobile when an item is clicked
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
            onClick={() => setActiveTab("advisory")}
          >
            ADVISORY
          </li>
          <li
            className={activeTab === "leave" ? "active" : ""}
            onClick={() => setActiveTab("leave")}
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
        <button className="logout-btn-new" onClick={onLogout}>
          Logout
        </button>
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
            <li onClick={onLogout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;
