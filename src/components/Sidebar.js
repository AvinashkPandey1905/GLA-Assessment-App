import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaUser, FaListAlt, FaChartBar, FaSignOutAlt
} from "react-icons/fa";
import "../style/sidebar.css";

const Sidebar = ({ onLogout }) => {
  const links = [
    { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/profile", icon: <FaUser />, label: "Profile" },
    { to: "/choice", icon: <FaListAlt />, label: "Quiz" },
    { to: "/result", icon: <FaChartBar />, label: "Results" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <nav className="sidebar-nav">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
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
