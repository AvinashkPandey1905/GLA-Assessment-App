import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaUser, FaListAlt, FaChartBar, FaSignOutAlt, FaTimes
} from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = ({ onLogout, isOpen, onClose }) => {
  const links = [
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/profile", icon: <FaUser />, label: "Profile" },
    { to: "/choice", icon: <FaListAlt />, label: "Quiz" },
    { to: "/result", icon: <FaChartBar />, label: "Results" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      {/* Mobile close button */}
      <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
        <FaTimes />
      </button>

      <div className="sidebar-inner">
        <nav className="sidebar-nav">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{icon}</span>
              <span className="sidebar-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={onLogout}>
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
