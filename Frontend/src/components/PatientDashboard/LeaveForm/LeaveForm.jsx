import React, { useState } from "react";
import "./LeaveForm.css";
// import axios from "axios";

function LeaveForm({ onSubmit }) {
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorConsulted, setDoctorConsulted] = useState(false);
  const [severity, setSeverity] = useState("mild");
  const [reportFile, setReportFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For now, we simulate a success response:
    const formDataObj = {
      reason,
      symptoms,
      startDate,
      endDate,
      doctorConsulted,
      severity,
      reportFile,
      status: "Pending",
      _id: "generated-id",
      createdAt: new Date().toISOString(),
    };

    const result = await onSubmit(formDataObj);
    setStatusMessage(result.message);

    setReason("");
    setSymptoms("");
    setStartDate("");
    setEndDate("");
    setDoctorConsulted(false);
    setSeverity("mild");
    setReportFile(null);
  };

  return (
    <div className="leave-form-container">
      <h2>Medical Leave Form</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        {/* Reason for Leave */}
        <div className="form-group">
          <label htmlFor="reason">Reason for Leave</label>
          <input
            id="reason"
            type="text"
            placeholder="e.g., Fever, Headache..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Symptoms */}
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <input
            id="symptoms"
            type="text"
            placeholder="Describe your symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>

        {/* Start Date & End Date */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Illness Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Illness End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Doctor Consulted */}
        <div className="form-group checkbox-group">
          <input
            id="doctorConsulted"
            type="checkbox"
            checked={doctorConsulted}
            onChange={(e) => setDoctorConsulted(e.target.checked)}
          />
          <label htmlFor="doctorConsulted">
            I have consulted a doctor regarding this illness.
          </label>
        </div>

        {/* Severity */}
        <div className="form-group">
          <label>Severity</label>
          <div className="severity-options">
            <label>
              <input
                type="radio"
                name="severity"
                value="Mild"
                checked={severity === "Mild"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Mild
            </label>
            <label>
              <input
                type="radio"
                name="severity"
                value="Moderate"
                checked={severity === "Moderate"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Moderate
            </label>
            <label>
              <input
                type="radio"
                name="severity"
                value="Severe"
                checked={severity === "Severe"}
                onChange={(e) => setSeverity(e.target.value)}
              />
              Severe
            </label>
          </div>
        </div>

        {/* Medical Report Upload */}
        <div className="form-group">
          <label htmlFor="reportFile">Upload Medical Report (optional)</label>
          <input
            id="reportFile"
            type="file"
            accept=".pdf,.jpg,.png,.jpeg"
            onChange={(e) => setReportFile(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-leave-btn">
          Submit
        </button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
}

export default LeaveForm;
