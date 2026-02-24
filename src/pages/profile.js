import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaSchool, FaBirthdayCake, FaPlay, FaEdit } from "react-icons/fa";
import "../style/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const rawData = localStorage.getItem("studentAccount") || localStorage.getItem("userData");
  const userData = rawData ? JSON.parse(rawData) : null;

  if (!userData || !userData.fname) {
    return (
      <div className="profile-page page-enter">
        <div className="profile-empty">
          <p>No profile data found.</p>
          <button className="profile-action-btn" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  const initials = `${userData.fname?.[0] || ""}${userData.lname?.[0] || ""}`.toUpperCase();

  const fields = [
    { icon: <FaUser />, label: "First Name", value: userData.fname },
    { icon: <FaUser />, label: "Last Name", value: userData.lname },
    { icon: <FaEnvelope />, label: "Email", value: userData.email },
    { icon: <FaBirthdayCake />, label: "Age", value: userData.age },
    { icon: <FaPhone />, label: "Mobile", value: userData.mob },
    { icon: <FaSchool />, label: "School", value: userData.qualification },
  ];

  return (
    <div className="profile-page page-enter">
      <div className="profile-hero">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-hero-info">
          <h1 className="profile-name">{userData.fname} {userData.lname}</h1>
          <span className="profile-badge">Student</span>
        </div>
      </div>

      <div className="profile-fields">
        {fields.map((f, i) => (
          <div
            key={i}
            className={`profile-field-row ${hovered === i ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <span className="profile-field-icon">{f.icon}</span>
            <div className="profile-field-content">
              <span className="profile-field-label">{f.label}</span>
              <span className="profile-field-value">{f.value || "—"}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="profile-actions">
        <button className="profile-action-btn primary" onClick={() => navigate("/choice")}>
          <FaPlay /> Take Quiz
        </button>
        <button className="profile-action-btn secondary" onClick={() => navigate("/result")}>
          <FaEdit /> View Results
        </button>
      </div>
    </div>
  );
};

export default Profile;
