import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaUser, FaListAlt, FaChartBar, FaSignOutAlt
} from "react-icons/fa";
import "../style/nav.css";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("studentAccount") || "{}");
  const initials = userData.fname
    ? `${userData.fname[0]}${userData.lname ? userData.lname[0] : ""}`.toUpperCase()
    : "?";

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo-icon">🎓</span>
        <span className="navbar-logo-text">GLA Learning</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/choice" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <FaListAlt /> Quiz
        </NavLink>
        <NavLink to="/result" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
          <FaChartBar /> Results
        </NavLink>
      </div>

      <div className="navbar-right">
        <div className="nav-avatar" title={userData.fname || "User"}>{initials}</div>
        <button className="nav-logout-btn" onClick={handleLogout} title="Sign Out">
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
