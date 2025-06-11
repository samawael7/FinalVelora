import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
    <h1 className="display-1 fw-bold" style={{ color: "#7f6fff" }}>
      404
    </h1>
    <h2 className="mb-3">Page Not Found</h2>
    <p className="mb-4 text-muted">
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <Button
      as={Link}
      to="/"
      style={{ background: "#7f6fff", border: "none", borderRadius: 20 }}
    >
      Go to Homepage
    </Button>
  </div>
);

export default NotFound;
