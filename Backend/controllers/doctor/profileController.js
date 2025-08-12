// controllers/doctor/profileController.js

// Hardcoded Doctor Details (No Database Used)
const DOCTOR_DETAILS = {
  "venkataabhinay.t@srmap.edu.in": {
    name: "Dr. Venkata Abhinay",
    experience: "5 years",
    specialization: "General Medicine",
    workingDays: "Mon - Fri",
    timeSlot: "9 AM - 5 PM",
  },
  "sabeehafarheen.s@srmap.edu.in": {
    name: "Dr. Sabeeha Farheen",
    experience: "3 years",
    specialization: "Pediatrics",
    workingDays: "Mon - Sat",
    timeSlot: "10 AM - 4 PM",
  },
  "raju.du@srmap.edu.in": {
    name: "Dr. Raju Du",
    experience: "7 years",
    specialization: "Orthopedics",
    workingDays: "Mon - Thurs",
    timeSlot: "8 AM - 2 PM",
  },
};

// Fetch Doctor Profile Directly from Hardcoded Data (No Database Required)
export const getDoctorProfile = async (req, res, next) => {
  try {
    const email = req.user.email; // Extract doctor’s email from request

    // Fetch doctor details from hardcoded object
    const doctorProfile = DOCTOR_DETAILS[email];

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.status(200).json({ doctor: doctorProfile });
  } catch (error) {
    next(error);
  }
};
