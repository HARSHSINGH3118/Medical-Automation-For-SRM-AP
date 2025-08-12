// controllers/patient/profileController.js
import User from "../../models/User.js";

// Get the patient's complete profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Edit/Update the patient's profile
export const editProfile = async (req, res, next) => {
  try {
    const {
      name,
      hostelName,
      roomNo,
      branch,
      section,
      gender,
      contact,
      weight,
      height,
      disease,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        hostelName,
        roomNo,
        branch,
        section,
        gender,
        contact,
        weight,
        height,
        disease,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
