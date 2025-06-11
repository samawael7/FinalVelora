import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { authEndpoints } from "../api/endpoints/auth";
import useApi from "./useApi";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const { post, loading, error } = useApi();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await post(authEndpoints.login, { email, password });

      if (data.token) {
        Cookies.set("authToken", data.token, {
          expires: 7,
          secure: false,
          sameSite: "strict",
        });

        // Store userId if available in response
        if (data.userId) {
          Cookies.set("userId", data.userId, {
            expires: 7,
            secure: false,
            sameSite: "strict",
          });
        }

        setUser({ email, role: data.role, userId: data.userId });
        toast.success("Login successful!");
        return data;
      }
      throw new Error(data.message || "Login failed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await post(authEndpoints.register, userData);

      if (data.token) {
        toast.success("Registration successful! Logging you in...");
        navigate("/login");
      }
      throw new Error(data.message || "Registration failed");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      throw err;
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/");
  };

  const isAuthenticated = () => {
    return !!Cookies.get("authToken");
  };

  const getUserId = () => {
    return Cookies.get("userId");
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    getUserId,
  };
};

export default useAuth;
