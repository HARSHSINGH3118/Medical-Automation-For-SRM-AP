import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Snowfall from "react-snowfall";
import "./Contact.css";

// Exact coordinates for SRM University AP
const SRM_AP_COORDINATES = [16.462373, 80.506364];

/* 
  ZoomToSRM triggers a flyTo animation so the map smoothly centers on SRM AP.
*/
function ZoomToSRM() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.flyTo(SRM_AP_COORDINATES, 17, { animate: true, duration: 2 });
    }, 1000);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

/*
  Create a custom DivIcon that renders an inner <div> with the bounce-marker class.
  This ensures the CSS animation is applied.
*/
const bounceMarkerIcon = L.divIcon({
  html: `<div class="bounce-marker"></div>`,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
  className: "", // Leave empty to avoid extra wrapper styling
});

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Top Contact Info */}
      <section className="contact-info-top">
        <h2>Contact Information</h2>
        <p className="address-line">
          <strong>Address:</strong> SRM University AP, India
        </p>
        <p className="phone-line">
          <strong>Phone:</strong> <a href="tel:+918662429299">0863-2343052</a>
        </p>
        <p className="email-line">
          <strong>Email:</strong>{" "}
          <a href="mailto:info@srmap.edu.in">info@srmap.edu.in</a>
        </p>
      </section>

      {/* Map Section with Overlay */}
      <section className="map-section">
        <div className="map-wrapper">
          <MapContainer
            center={SRM_AP_COORDINATES}
            zoom={5}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={SRM_AP_COORDINATES} icon={bounceMarkerIcon}>
              <Popup>
                <strong>SRM University AP</strong>
                <br />
                (16.462373, 80.506364)
              </Popup>
            </Marker>
            <ZoomToSRM />
          </MapContainer>

          {/* Snowfall overlay */}
          <Snowfall
            snowflakeCount={150}
            snowflakeStyle={{ color: "rgba(255,255,255,0.9)" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          />

          {/* Overlay Card - remains absolutely positioned, but shrinks on smaller screens */}
          <div className="overlay-card">
            <img
              src="/assets/3dsrm.jpg"
              alt="SRM University AP"
              className="overlay-image"
            />
            <h3>SRM University AP</h3>
            <p>
              Neerukonda, Mangalagiri Mandal, Guntur District,
              <br />
              Andhra Pradesh 522240, India
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+918662429299">0863-2343052</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@srmap.edu.in">info@srmap.edu.in</a>
            </p>
            <div className="overlay-actions">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=SRM+University+AP"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
