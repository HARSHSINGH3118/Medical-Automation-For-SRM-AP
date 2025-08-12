// Backend/routes/googleAuthRoutes.js
import { Router } from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// 1. Initiate Google OAuth (redirects user to Google sign-in)
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Callback route: After Google sign-in, Passport authenticates the user
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/api/google/failure" }),
  (req, res) => {
    const user = req.user;
    // Generate a JWT token with user's id and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Redirect to your frontend's GoogleSuccess page (which will then check if profile is complete)
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);

// 3. Failure route
router.get("/failure", (req, res) => {
  return res.status(401).json({ message: "Google Authentication Failed" });
});

export default router;
