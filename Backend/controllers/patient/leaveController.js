// controllers/patient/leaveController.js
import LeaveForm from "../../models/LeaveForm.js";

// Get all leave forms for the patient (unchanged)
export const getLeaveForms = async (req, res, next) => {
  try {
    const leaveForms = await LeaveForm.find({ patient: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ leaveForms });
  } catch (error) {
    next(error);
  }
};
export const getLeaveStatus = async (req, res, next) => {
  try {
    const leaveRequests = await LeaveForm.find({ patient: req.user._id }).sort({
      createdAt: -1,
    });
    // Return the data in whatever shape the front-end expects:
    res.status(200).json({ leaveRequests });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new leave form after the file has been stored in GridFS.
 * We now include the additional fields from the front-end form:
 * symptoms, illnessStartDate, illnessEndDate, severity, consultedDoctor
 */
export const submitLeaveFormWithGridFS = async (
  req,
  gridFsFileId,
  next,
  fileName
) => {
  try {
    // Extract new fields plus the existing reason field
    const {
      reason,
      symptoms,
      illnessStartDate,
      illnessEndDate,
      severity,
      consultedDoctor,
    } = req.body;

    // Create the leave form document with new fields
    const leaveForm = await LeaveForm.create({
      patient: req.user._id,
      reason,
      symptoms: symptoms || "",
      illnessStartDate: illnessStartDate || null,
      illnessEndDate: illnessEndDate || null,
      severity: severity || "Mild",
      consultedDoctor: consultedDoctor === "true" || false,
      // If a file was uploaded, store the GridFS ID; otherwise keep empty or undefined
      reportFile: gridFsFileId || "",
      reportFileName: fileName || "",
      status: "Pending",
    });
    return leaveForm;
  } catch (error) {
    next(error);
  }
};
