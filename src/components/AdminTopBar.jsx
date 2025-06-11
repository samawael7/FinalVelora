import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const AdminTopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // إغلاق القائمة عند الضغط خارجها
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E5E7EB")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
        >
          <FaBell />
        </div>

        {/* Admin Dropdown */}
        <div className="position-relative" ref={menuRef}>
          <div
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <FaUserCircle size={28} color="#2EC4B6" />
            <span className="fw-semibold" style={{ color: "#374151", fontSize: "14px" }}>
              Admin
            </span>
          </div>
          {showMenu && (
            <div
              className="shadow-sm"
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                minWidth: 110,
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                zIndex: 2000,
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                padding: "4px 0",
                transition: "all 0.2s",
              }}
            >
              <button
                className="d-flex align-items-center gap-2 w-100"
                style={{
                  background: "none",
                  border: "none",
                  color: "#DC2626",
                  fontSize: "14px",
                  padding: "7px 14px",
                  borderRadius: 6,
                  transition: "background 0.2s, color 0.2s",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FEE2E2";
                  e.currentTarget.style.color = "#B91C1C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#DC2626";
                }}
                onClick={handleLogout}
              >
                <FaSignOutAlt size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
