import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./Overview.css";

function Overview() {
  // Dummy data for charts

  // 1. Pie Chart: User distribution
  const userData = [
    { name: "Patients", value: 120 },
    { name: "Doctors", value: 30 },
    { name: "Admins", value: 5 },
  ];

  // 2. Bar Chart: Appointments per month
  const monthlyAppointments = [
    { month: "Jan", appointments: 40 },
    { month: "Feb", appointments: 32 },
    { month: "Mar", appointments: 55 },
    { month: "Apr", appointments: 48 },
    { month: "May", appointments: 60 },
    { month: "Jun", appointments: 72 },
  ];

  // 3. Line Chart: Weekly visits
  const weeklyVisits = [
    { day: "Mon", visits: 40 },
    { day: "Tue", visits: 55 },
    { day: "Wed", visits: 30 },
    { day: "Thu", visits: 70 },
    { day: "Fri", visits: 50 },
    { day: "Sat", visits: 20 },
    { day: "Sun", visits: 25 },
  ];

  // 4. Recent activities (example log)
  const recentActivities = [
    { id: 1, activity: "Dr. John approved leave for Patient Alice." },
    { id: 2, activity: "Patient Bob booked an appointment." },
    { id: 3, activity: "Dr. Jane updated her profile." },
    { id: 4, activity: "Admin updated system settings." },
  ];

  // 5. Top 5 busy doctors
  const busyDoctors = [
    { name: "Dr. John Doe", appointments: 45 },
    { name: "Dr. Jane Smith", appointments: 38 },
    { name: "Dr. Sabeeha", appointments: 30 },
    { name: "Dr. Reddy", appointments: 25 },
    { name: "Dr. Patel", appointments: 20 },
  ];

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="admin-overview-container">
      <h2>Admin Overview</h2>

      {/* Charts Row: Pie Chart and Bar Chart */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Monthly Appointments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyAppointments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart Row: Weekly Visits */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>Weekly Visits</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyVisits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activities Section */}
      <div className="activities-row">
        <div className="activities-card">
          <h3>Recent Activities</h3>
          <ul>
            {recentActivities.map((act) => (
              <li key={act.id}>{act.activity}</li>
            ))}
          </ul>
        </div>
        <div className="activities-card">
          <h3>Top 5 Busy Doctors</h3>
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Appointments</th>
              </tr>
            </thead>
            <tbody>
              {busyDoctors.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.appointments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Overview;
