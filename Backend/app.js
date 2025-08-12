// Backend/app.js
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();

// Middleware: parse JSON and URL-encoded data, enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ------------------- NEW IMPORTS FOR GOOGLE OAUTH -------------------
import session from "express-session";
import passport from "./config/passport.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

// Setup session (needed for Passport sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// -------------------------------------------------------------------

// Existing routes
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import commonRoutes from "./routes/commonRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);

// ---------------- NEW: GOOGLE OAUTH ROUTES ----------------
app.use("/api/google", googleAuthRoutes);

// Fallback route for unmatched endpoints
app.use("/", commonRoutes);

// Error handling middleware
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
