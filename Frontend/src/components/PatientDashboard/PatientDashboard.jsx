import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ProfileSection from "./ProfileSection/ProfileSection";
import EditProfile from "./EditProfile/EditProfile";
import BookSlot from "./BookSlot/BookSlot";
import History from "./History/History";
import Contact from "./Contact/Contact";
import "./PatientDashboard.css";
import Advisory from "./Advisory/Advisory";
import LeaveForm from "./LeaveForm/LeaveForm";
import axios from "axios";
import { toast } from "react-toastify";
import LeaveStatus from "./LeaveStatus/LeaveStatus";

function PatientDashboard() {
  // Active tab state
  const [activeTab, setActiveTab] = useState("profile");

  // User state: initially empty; will be populated by backend fetch
  const [user, setUser] = useState({
    name: "",
    branch: "",
    hostelName: "",
    roomNo: "",
    section: "",
    weight: "",
    height: "",
    disease: "",
    contact: "",
    email: "",
  });

  // Appointment state (for appointments)
  // const [user, setUser] = useState({
  //   /* ... */
  // });
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    details: "",
  });

  // Edit profile data state: will be set to the fetched user details
  const [editData, setEditData] = useState({ ...user });

  // Fetch actual user details from the backend on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/patient/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const fetchedUser = response.data.user;
          setUser(fetchedUser);
          setEditData(fetchedUser);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  // Handler to update profile via backend API
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated!");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:5000/api/patient/profile",
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the user state with the updated profile from backend
      setUser(response.data.user);
      toast.success("Profile updated successfully!");

      // Optionally, delay tab switch so the toast is visible
      setTimeout(() => {
        setActiveTab("profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  // Handler to book appointment (simulated)
  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated!");
      return;
    }

    try {
      // Combine date & time for the backend
      const appointmentDate = `${newAppointment.date} ${newAppointment.time}`;

      // Make POST request to book-appointment
      const response = await axios.post(
        "http://localhost:5000/api/patient/book-appointment",
        {
          appointmentDate,
          details: newAppointment.details,
          doctorId: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2) Update local state (optional)
      setAppointments((prev) => [...prev, response.data.appointment]);

      // 3) Reset the form
      // Map appointmentDate from backend to 'date' for History display
      const newApt = {
        ...response.data.appointment,
        date: response.data.appointment.appointmentDate,
      };
      setAppointments((prev) => [...prev, newApt]);
      toast.success("Appointment booked successfully!");

      setNewAppointment({ date: "", time: "", details: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment!");
    }
  };

  // Handler to update appointment status (simulated)
  const handleAppointmentAcceptance = (id, status) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  // Hours & Contact information for ProfileSection
  const hoursInfo = {
    opd: "8 AM to 5 PM on weekdays and 8 AM to 1 PM on Saturdays",
    emergency: "24/7 emergency services. Phone: 1800-123-4567",
    ambulance: "24/7 ambulance available",
    pharmacy: "24/7 pharmacy available",
  };

  // Logout handler (dummy)
  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleLeaveFormSubmit = async (formDataObj) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated!");
      return { message: "Not authenticated" };
    }
    try {
      // Build FormData for multipart/form-data upload
      const formData = new FormData();
      formData.append("reason", formDataObj.reason);
      formData.append("symptoms", formDataObj.symptoms);
      formData.append("illnessStartDate", formDataObj.startDate);
      formData.append("illnessEndDate", formDataObj.endDate);
      formData.append("consultedDoctor", formDataObj.doctorConsulted);
      formData.append("severity", formDataObj.severity);
      // Field name "report" must match the backend's upload.single("report")
      if (formDataObj.reportFile) {
        formData.append("report", formDataObj.reportFile);
      }
      const response = await axios.post(
        "http://localhost:5000/api/patient/submit-leave",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error submitting leave form:", error);
      alert("Failed to submit leave form!");
      return { message: "Submission failed" };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/patient/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Ensure the appointmentDate is in ISO format by replacing the space with 'T'
          const fetchedAppointments = response.data.appointments.map((apt) => ({
            ...apt,
            date: apt.appointmentDate
              ? apt.appointmentDate.replace(" ", "T")
              : apt.date,
          }));
          setAppointments(fetchedAppointments);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, []);

  return (
    <div className="patient-dashboard-container-new">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={user.name}
      />
      {/* Main content area */}
      <div className="main-content-new">
        {activeTab === "profile" && (
          <ProfileSection user={user} hoursInfo={hoursInfo} />
        )}
        {activeTab === "edit-profile" && (
          <EditProfile
            editData={editData}
            setEditData={setEditData}
            onSubmit={handleProfileUpdate}
          />
        )}
        {activeTab === "book-slot" && (
          <BookSlot
            newAppointment={newAppointment}
            setNewAppointment={setNewAppointment}
            onBook={handleBookAppointment}
            appointments={appointments}
            onSimulate={handleAppointmentAcceptance}
          />
        )}
        {activeTab === "history" && <History appointments={appointments} />}
        {activeTab === "advisory" && <Advisory />}
        {activeTab === "contact" && <Contact />}
        {activeTab === "leave-status" && <LeaveStatus />}

        {activeTab === "leave" && (
          <LeaveForm onSubmit={handleLeaveFormSubmit} />
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
