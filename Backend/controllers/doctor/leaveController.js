// controllers/doctor/leaveController.js
import LeaveForm from "../../models/LeaveForm.js";

// Get all OD/ML leave forms (submitted by patients/students)
export const getAllLeaveForms = async (req, res, next) => {
  try {
    // Populate the patient's name/email to display in the response
    const leaveForms = await LeaveForm.find({})
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    // leaveForms now includes the new fields (symptoms, illnessStartDate, etc.) from the model
    res.status(200).json({ leaveForms });
  } catch (error) {
    next(error);
  }
};
export const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params; // /leave-status/:id
    const { status } = req.body; // e.g. "Approved", "Rejected", etc.

    const leaveForm = await LeaveForm.findById(id);
    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    // Optionally, check if user is a doctor or admin
    // if (req.user.role !== "doctor") {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    leaveForm.status = status;
    await leaveForm.save();

    res.status(200).json({
      message: "Leave status updated successfully",
      leaveForm,
    });
  } catch (error) {
    next(error);
  }
};

// Update the status of a leave form (Approve or Reject)
export const updateLeaveFormStatus = async (req, res, next) => {
  try {
    const { leaveFormId, status } = req.body; // status should be "Approved" or "Rejected"

    // After updating, populate the patient so the response includes name/email
    const leaveForm = await LeaveForm.findByIdAndUpdate(
      leaveFormId,
      { status },
      { new: true }
    ).populate("patient", "name email");

    if (!leaveForm) {
      return res.status(404).json({ message: "Leave form not found" });
    }

    // The returned leaveForm will also include new fields like symptoms, severity, etc.
    res.status(200).json({ message: "Leave form status updated", leaveForm });
  } catch (error) {
    next(error);
  }
};
