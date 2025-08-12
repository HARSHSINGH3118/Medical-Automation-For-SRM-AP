// Backend/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // For Google OAuth
    googleId: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // Conditionally require password only if googleId is NOT present
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      default: null, // for Google signups, we won't store a local password
    },

    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: true,
    },

    // Additional profile fields (existing ones)
    hostelName: {
      type: String,
      default: "",
    },
    roomNo: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    section: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    disease: {
      type: String,
      default: "",
    },

    // NEW FIELDS (optional additions)
    profilePicture: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual: isProfileComplete - returns true if key profile fields are filled
UserSchema.virtual("isProfileComplete").get(function () {
  // For example, consider profile complete if these fields are non-empty:
  return (
    this.hostelName.trim() !== "" &&
    this.roomNo.trim() !== "" &&
    this.branch.trim() !== "" &&
    this.section.trim() !== "" &&
    this.contact.trim() !== ""
  );
});

export default mongoose.model("User", UserSchema);
