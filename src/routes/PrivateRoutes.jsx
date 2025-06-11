import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ roles = [] }) => {
  const token = Cookies.get("authToken");
  const userRole = Cookies.get("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
