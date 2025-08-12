// src/pages/CompleteProfile.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CompleteProfile.css"; // Import the new CSS

function CompleteProfile() {
  const [hostelName, setHostelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      navigate("/");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/patient/complete-profile",
        { hostelName, roomNo, branch, section, gender, contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      navigate("/patient");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="complete-profile-card">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Hostel Name:</label>
            <input
              type="text"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
              placeholder="Enter hostel name"
              required
            />
          </div>

          <div>
            <label>Room No:</label>
            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              placeholder="Enter room number"
              required
            />
          </div>

          <div>
            <label>Branch:</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Enter branch"
              required
            />
          </div>

          <div>
            <label>Section:</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="Enter section"
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <button type="submit">Save Profile</button>
        </form>
        <div className="disclaimer">You are almost done!!</div>
      </div>
    </div>
  );
}

export default CompleteProfile;
