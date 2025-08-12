// Import necessary modules and configurations
import passport from "passport"; // Passport for authentication
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Google OAuth strategy
import dotenv from "dotenv"; // Environment variables
import User from "../models/User.js"; // User model

dotenv.config(); // Load environment variables

// Configure GoogleStrategy for passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google Client ID from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret from .env
      callbackURL: "http://localhost:5000/api/google/callback", // Callback URL for Google OAuth
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // **Extract email** from the profile and convert it to lowercase
        const email = profile.emails[0].value.toLowerCase();

        // **Email Domain Validation:** Allow only SRMAP emails
        if (!email.endsWith("@srmap.edu.in")) {
          // Return an error if the email domain is not allowed
          return done(new Error("Only SRMAP emails are allowed"), null);
        }

        // **Find user** by googleId if they exist
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If not found by googleId, check by email in case user signed up locally
          user = await User.findOne({ email });
          if (user) {
            // If user exists, update with googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // **Create a new user** if none exists
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email, // Already validated to be a SRMAP email
              role: "patient", // Role can be adjusted as needed
              password: null, // Google users do not have a local password
            });
          }
        }
        // Complete authentication by returning the user object
        return done(null, user);
      } catch (err) {
        // Handle errors by passing them to Passport
        return done(err, null);
      }
    }
  )
);

// Serialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
