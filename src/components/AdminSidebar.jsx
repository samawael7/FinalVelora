// src/components/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import { FaTachometerAlt, FaBoxOpen, FaBell, FaComments, FaChartBar, FaExchangeAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const links = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/products", label: "Manage Products", icon: <FaBoxOpen /> },
    { path: "/admin/notifications", label: "Notifications", icon: <FaBell /> },
    { path: "/admin/feedback", label: "Feedback", icon: <FaComments /> },
    { path: "/admin/activities", label: "Activities", icon: <FaChartBar /> },
    { path: "/admin/switchview", label: "Switch View", icon: <FaExchangeAlt /> },
  ];

  return (
    <div
      className="d-flex flex-column vh-100 p-3"
      style={{
        width: "250px",
        backgroundColor: "#F3F4F6",
        color: "#4B5563",
        position: "fixed",
        overflowY: "auto",
        borderRight: "1px solid #E5E7EB",
        top: 0,
        left: 0,
      }}
    >
      {/* { Logo } */}
      <div className="d-flex align-items-center justify-content-center py-4 border-bottom mb-3 gap-2">
  <img
    src={logo} 
    alt="Velora Logo"
    style={{ width: "32px", height: "32px", borderRadius: "6px" }}
  />
  <h4 className="fw-bold mb-0" style={{ fontSize: "20px", color: "#1d1d44" }}>
    VELORA
  </h4>
</div>

      {/* Navigation Links */}
      <ul className="nav flex-column gap-2">
        {links.map((item) => (
          <li className="nav-item" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active-link" : ""
                }`
              }
              style={({ isActive }) => ({
                padding: "10px 12px",
                borderRadius: "8px",
                transition: "all 0.3s",
                textDecoration: "none",
                fontSize: "15px",
                color: isActive ? "white" : "#4B5563",
                backgroundColor: isActive ? "#785bf9" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
