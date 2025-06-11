import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SwitchView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // No UI needed, just redirect
};

export default SwitchView;