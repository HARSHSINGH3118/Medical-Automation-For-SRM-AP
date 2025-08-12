// src/pages/GoogleSuccess.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Store the token for later use
      localStorage.setItem("token", token);

      // Fetch current user details to check profile completeness
      fetch("http://localhost:5000/api/patient/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const user = data.user;
          // Define required fields for a complete profile (adjust as needed)
          if (
            user &&
            user.hostelName.trim() !== "" &&
            user.roomNo.trim() !== "" &&
            user.branch.trim() !== "" &&
            user.section.trim() !== "" &&
            user.contact.trim() !== ""
          ) {
            // Profile is complete: redirect to patient dashboard
            navigate("/patient");
          } else {
            // Profile is incomplete: redirect to complete profile page
            navigate("/complete-profile");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          // Fallback: if error occurs, redirect to patient dashboard
          navigate("/patient");
        });
    } else {
      // No token found: redirect to login page
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Logging you in...</h2>
      <p>Please wait while we check your profile details...</p>
    </div>
  );
}

export default GoogleSuccess;
