import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", overflowX: "hidden" }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, padding: "2rem" }}>
        {/* No marginLeft here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
