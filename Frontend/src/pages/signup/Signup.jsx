import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [hostelName, setHostelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.endsWith("@srmap.edu.in")) {
      toast.error("You must use your srmap.edu.in email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email: trimmedEmail,
          password,
          role,
          hostelName,
          roomNo,
          branch,
          section,
          gender,
          contact,
        }
      );

      console.log("Signup response:", response.data);
      toast.success("Signup successful!");

      const { token, user } = response.data;

      if (!token || !user || !user.role) {
        toast.error(
          "Signup successful, but role is missing. Redirecting to login."
        );
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

       
      localStorage.setItem("token", token);

       
      setTimeout(() => {
        if (user.role === "doctor") {
          navigate("/doctor");
        } else {
          navigate("/patient");
        }
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      console.error("Signup error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleGoogleSignUp = () => {
  
    window.location.href = "http://localhost:5000/api/google";
  };

  return (
    <div className="signup-container-distinct">
      {/* Left side: background image */}
      <div className="left-section-signup">
        <img
          src="/assets/llogo.png"
          alt="SRM Logo"
          className="srm-logo-signup"
        />
      </div>

      {/* Right side: sign-up card */}
      <div className="right-section-signup">
        <div className="signup-card-distinct">
          <h2 className="title-signup">Create Account</h2>
          <form onSubmit={handleSubmit} className="signup-form-distinct">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="yourname@srmap.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="doctor">Doctor</option>
            </select>

            <label htmlFor="hostelName">Hostel Name</label>
            <input
              id="hostelName"
              type="text"
              placeholder="e.g. DH-2"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
            />

            <label htmlFor="roomNo">Room No</label>
            <input
              id="roomNo"
              type="text"
              placeholder="301"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />

            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              placeholder="e.g. CSE"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <label htmlFor="section">Section</label>
            <input
              id="section"
              type="text"
              placeholder="e.g. A"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="contact">Contact</label>
            <input
              id="contact"
              type="text"
              placeholder="Enter your phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button type="submit" className="signup-btn-distinct">
              Submit
            </button>
          </form>

          <div className="divider-signup">OR</div>

          <button
            className="google-signup-btn-distinct"
            onClick={handleGoogleSignUp}
          >
            <img
              src="/assets/google.png"
              alt="Google icon"
              className="google-icon-signup"
            />
            <span>Sign up with Google</span>
          </button>

          <p className="login-text-distinct">
            Already have an account? <Link to="/">Log In</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default SignUp;
