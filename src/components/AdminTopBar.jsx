import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const AdminTopBar = () => {
  return (
    <div
      className="d-flex align-items-center px-4 py-3 shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
        position: "fixed",
        top: 0,
        left: "250px",
        width: "calc(100% - 250px)",
        zIndex: 1000,
        height: "70px",
      }}
    >
      {/* Center Search Bar */}
      <div className="mx-auto" style={{ width: "500px" }}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{
              borderRadius: "8px 0 0 8px",
              border: "1px solid #E5E7EB",
              padding: "8px 12px",
              fontSize: "14px",
            }}
          />
          <span
            className="input-group-text"
            style={{
              backgroundColor: "#785bf9",
              color: "white",
              borderRadius: "0 80px 8px 0",
              border: "1px solidrgb(0, 0, 0)",
              cursor: "pointer",
            }}
          >
            <FaSearch />
          </span>
        </div>
      </div>

      {/* Right Icons */}
      <div className="d-flex align-items-center gap-3 ms-auto">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#F3F4F6",
            cursor: "pointer",
            color: "#4B5563",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#E5E7EB"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#F3F4F6"}
        >
          <FaBell />
        </div>

        <div className="d-flex align-items-center gap-2">
          <FaUserCircle size={28} color="#2EC4B6" />
          <span className="fw-semibold" style={{ color: "#374151", fontSize: "14px" }}>
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
