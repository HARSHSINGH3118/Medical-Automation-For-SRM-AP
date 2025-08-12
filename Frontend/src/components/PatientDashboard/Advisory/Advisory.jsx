import React, { useState } from "react";
import "./Advisory.css";

function Advisory({ advisories }) {
   
  const defaultAdvisories = [
    {
      id: 1,
      title: "Seasonal Flu Outbreak",
      date: "2023-11-01",
      description:
        "A seasonal flu outbreak has been observed in the region. Symptoms typically include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue. Please consider getting vaccinated if you haven't yet, and be sure to wash your hands regularly to reduce the spread.",
      precautions:
        "Get vaccinated; wash your hands regularly; avoid crowded places.",
      announcementBy: "Dr. Sharma",
      severity: "High",  
      imageUrl: "/assets/flu.png",
    },
    {
      id: 2,
      title: "Dengue Alert",
      date: "2023-10-20",
      description:
        "Dengue cases are on the rise in certain areas. Watch out for fever, headache, muscle and joint pains, and a characteristic skin rash.",
      precautions:
        "Use mosquito repellent; eliminate stagnant water; wear protective clothing.",
      announcementBy: "Dr. Reddy",
      severity: "Medium",
      imageUrl: "/assets/dengue.png",
    },
    {
      id: 3,
      title: "Waterborne Diseases",
      date: "2023-10-05",
      description:
        "Contaminated water sources have been reported in some neighborhoods. Common waterborne illnesses include cholera, typhoid, and dysentery.",
      precautions: "Boil water before use; avoid consuming unfiltered water.",
      announcementBy: "Dr. Verma",
      severity: "Low",
      imageUrl: "/assets/water.png",
    },
  ];
 
  const advisoryData =
    advisories && advisories.length > 0 ? advisories : defaultAdvisories;

  return (
    <div className="advisory-section">
      <h2>Health Advisories & Announcements</h2>
      <div className="advisory-grid">
        {advisoryData.map((advisory) => (
          <AdvisoryCard key={advisory.id} advisory={advisory} />
        ))}
      </div>

      <FluPrevention />
    </div>
  );
}

 
function AdvisoryCard({ advisory }) {
  const [expanded, setExpanded] = useState(false);
 
  const MAX_CHARS = 120;
  const isLong = advisory.description.length > MAX_CHARS;
  const shortDesc = advisory.description.slice(0, MAX_CHARS) + "...";

  const severityColor = getSeverityColor(advisory.severity);

  return (
    <div className="advisory-card">
      {advisory.imageUrl && (
        <img
          src={advisory.imageUrl}
          alt="advisory"
          className="advisory-image"
        />
      )}

      <div className="advisory-header">
        <h3 className="advisory-title">{advisory.title}</h3>
        {advisory.severity && (
          <span
            className="advisory-severity"
            style={{ backgroundColor: severityColor }}
          >
            {advisory.severity}
          </span>
        )}
      </div>

      <p className="advisory-date">{advisory.date}</p>

      <p className="advisory-description">
        {isLong && !expanded ? shortDesc : advisory.description}
      </p>
      {isLong && (
        <button
          className="read-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}

      <p className="advisory-precautions">
        <strong>Precautions:</strong> {advisory.precautions}
      </p>
      <p className="advisory-announcement">
        <em>Announcement by: {advisory.announcementBy}</em>
      </p>
    </div>
  );
}
 
function FluPrevention() {
  return (
    <div className="flu-prevention">
      <h2>Flu Prevention Tips & Resources</h2>
      <p>
        Seasonal influenza can be prevented by taking a few important steps.
        Here are some tips to help protect yourself and your community:
      </p>
      <ul>
        <li>
          <strong>Get Vaccinated:</strong> The flu vaccine is the best defense
          against seasonal flu. Consult your healthcare provider about getting
          vaccinated annually.
        </li>
        <li>
          <strong>Practice Good Hygiene:</strong> Wash your hands frequently
          with soap and water for at least 20 seconds.
        </li>
        <li>
          <strong>Avoid Close Contact:</strong> Stay away from people who are
          sick, and if you are sick, keep your distance from others.
        </li>
        <li>
          <strong>Cover Your Coughs and Sneezes:</strong> Use a tissue or your
          elbow to cover your mouth and nose.
        </li>
        <li>
          <strong>Stay Home:</strong> If you feel unwell, avoid going to work or
          school to prevent spreading the virus.
        </li>
      </ul>
      <p>
        For more detailed information, visit the{" "}
        <a
          href="https://www.cdc.gov/flu/index.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          CDC Flu Information Page
        </a>
        .
      </p>
    </div>
  );
}

// Helper function to map severity to a color
function getSeverityColor(severity) {
  switch (severity?.toLowerCase()) {
    case "high":
      return "#d9534f";  
    case "medium":
      return "#f0ad4e";  
      return "#5cb85c"; 
    default:
      return "#777";  
  }
}

export default Advisory;
