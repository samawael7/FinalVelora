// src/components/Alert.jsx
import React from "react";

const Alert = ({ type = "info", children }) => {
  const colors = {
    info: "blue",
    success: "green",
    warning: "orange",
    danger: "red",
  };
  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        border: `1px solid ${colors[type]}`,
        backgroundColor: `${colors[type]}20`,
        color: colors[type],
        borderRadius: "4px",
      }}
    >
      {children}
    </div>
  );
};

export default Alert;
