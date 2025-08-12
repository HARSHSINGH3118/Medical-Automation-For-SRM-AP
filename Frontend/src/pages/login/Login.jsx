import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const trimmedEmail = email.trim().toLowerCase();

    
    if (!trimmedEmail.endsWith("@srmap.edu.in")) {
      const errMsg = "You must use your srmap.edu.in email address.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    try {
     
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: trimmedEmail, password }
      );
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);
      toast.success("Login successful!");

 
      setTimeout(() => {
        const role = response.data.user.role;
        if (role === "patient") {
          navigate("/patient");
        } else if (role === "doctor") {
          navigate("/doctor");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      console.error("Login error:", errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleGoogleLogin = () => {
    
    window.location.href = "http://localhost:5000/api/google";
  };

  return (
    <div className="login-container">
      {/* Left side: background image */}
      <div className="left-section"></div>

      {/* Right side: card container */}
      <div className="right-section">
        <div className="login-card">
          <p className="title">Please Use Your University ID only</p>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="yourname@srmap.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="/assets/google.png"
              alt="Google icon"
              className="google-icon"
            />
            <span>Login with Google</span>
          </button>

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
