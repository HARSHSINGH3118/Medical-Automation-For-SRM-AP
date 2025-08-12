// Backend/routes/patientRoutes.js
import express from "express";
import {
  getProfile,
  editProfile,
  getAppointments,
  bookAppointment,
  getLeaveForms,
  submitLeaveFormWithGridFS,
  getSeasonalAdvisory,
} from "../controllers/patient/index.js"; // re-exports from patient controllers
import { protect } from "../middleware/authMiddleware.js";
import diskUpload from "../config/diskUpload.js"; // our disk storage configuration
import mongoose from "mongoose";
import fs from "fs";
import { GridFSBucket } from "mongodb";
import User from "../models/User.js";
import { getLeaveStatus } from "../controllers/patient/leaveController.js"; // NEW: Import User model for additional endpoints

const router = express.Router();
const upload = diskUpload;

// ------------------ Existing Routes ------------------

// 1. Profile Endpoints
router.get("/profile", protect, getProfile);
router.put("/profile", protect, editProfile);

// 2. Appointments Endpoints
router.get("/appointments", protect, getAppointments);
router.post("/book-appointment", protect, bookAppointment);

// 3. Leave Forms Endpoints
router.get("/leave-forms", protect, getLeaveForms);
router.post(
  "/submit-leave",
  protect,
  upload.single("report"), // "report" must match formData.append("report", file)
  async (req, res, next) => {
    try {
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      // If no file was uploaded, handle that case first
      if (!req.file) {
        const leaveForm = await submitLeaveFormWithGridFS(req, null, next);
        return res.status(201).json({
          message: "Leave form submitted successfully (no file uploaded)",
          leaveForm,
        });
      }

      // If a file is uploaded, proceed with GridFS streaming
      const uploadStream = bucket.openUploadStream(req.file.originalname);
      fs.createReadStream(req.file.path)
        .pipe(uploadStream)
        .on("error", (err) => next(err))
        .on("finish", async () => {
          try {
            const gridFsFileId = uploadStream.id;
            const leaveForm = await submitLeaveFormWithGridFS(
              req,
              gridFsFileId,
              next,
              req.file.originalname
            );

            fs.unlink(req.file.path, (unlinkErr) => {
              if (unlinkErr)
                console.error("Error deleting temp file:", unlinkErr);
            });

            res.status(201).json({
              message: "Leave form submitted successfully",
              leaveForm,
            });
          } catch (controllerError) {
            next(controllerError);
          }
        });
    } catch (error) {
      next(error);
    }
  }
);

// 4. Seasonal Advisory Endpoint
router.get("/seasonal-advisory", protect, getSeasonalAdvisory);

// ------------------ NEW ROUTES ------------------

// GET /api/patient/me - Retrieve the current user's data
router.get("/me", protect, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
});
router.get("/leave-status", protect, getLeaveStatus);
// PUT /api/patient/complete-profile - Update additional profile fields
router.put("/complete-profile", protect, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { hostelName, roomNo, branch, section, gender, contact } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { hostelName, roomNo, branch, section, gender, contact },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
