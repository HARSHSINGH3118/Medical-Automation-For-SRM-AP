import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookSlot.css";

function BookSlot({
  newAppointment,
  setNewAppointment,
  onBook,
  appointments,
  onSimulate,
}) {
  const dateInputRef = useRef(null);

  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <div className="book-slot-card">
      <h2>Book an Appointment</h2>
      <form onSubmit={onBook} className="book-slot-form">
        <div className="form-group">
          <label>Date</label>
          <div className="date-input-wrapper">
            <input
              type="date"
              ref={dateInputRef}
              value={newAppointment.date}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, date: e.target.value })
              }
              required
            />
            <span
              className="date-icon"
              onClick={handleCalendarIconClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={newAppointment.time || ""}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Details / Symptoms</label>
          <textarea
            rows="3"
            value={newAppointment.details || ""}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, details: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Book
        </button>
      </form>
      <p className="info-text">
        Your appointment request is submitted. Please check the Medical History
        section for updates.
      </p>
      {/* Keep ToastContainer outside Routes so it's always present */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default BookSlot;
