// controllers/auth/authController.js
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateEmail } from "../../utils/emailValidator.js";
// import profileController from "../doctor/profileController.js";

// Array of fixed doctor emails (all in lowercase)
const allowedDoctorEmails = [
  "venkataabhinay.t@srmap.edu.in",
  "sabeehafarheen.s@srmap.edu.in",
  "raju.du@srmap.edu.in",
];

/**
 * SIGNUP
 * - If the provided email is one of the allowed doctor emails, set role = "doctor".
 * - Otherwise, set role = "patient".
 * - Enforce that the email is from srmap.edu.in for patients.
 */
export const signup = async (req, res, next) => {
  try {
    let {
      name,
      email,
      password,
      role, // this will be overridden
      hostelName,
      roomNo,
      branch,
      section,
      gender,
      contact,
    } = req.body;

    // Normalize the email to lowercase for consistency
    email = email.toLowerCase();

    // 1. Check if the email is in the fixed doctor list
    if (allowedDoctorEmails.includes(email)) {
      role = "doctor";
    } else {
      role = "patient";
      // Optionally, enforce patient email domain if needed
      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Email must be from srmap.edu.in",
        });
      }
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user with the determined role
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      hostelName,
      roomNo,
      branch,
      section,
      gender,
      contact,
    });

    // 5. Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hostelName: user.hostelName,
        roomNo: user.roomNo,
        branch: user.branch,
        section: user.section,
        gender: user.gender,
        contact: user.contact,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 * - Finds the user by email and verifies the password.
 * - If the email is one of the allowed doctor emails, force the role to "doctor".
 *   Otherwise, set it to "patient".
 */
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Override role based on the fixed doctor email list
    if (allowedDoctorEmails.includes(email)) {
      user.role = "doctor";
    } else {
      user.role = "patient";
    }
    // Save any role updates (optional, if you want to persist changes)
    await user.save();

    // 4. Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hostelName: user.hostelName,
        roomNo: user.roomNo,
        branch: user.branch,
        section: user.section,
        gender: user.gender,
        contact: user.contact,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
