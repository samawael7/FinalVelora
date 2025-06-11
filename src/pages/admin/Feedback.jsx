import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from "framer-motion";

const Feedback = () => {
  const [feedbacks] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Fantastic service!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Very fast delivery and good quality!" },
  ]);

  return (
    <div style={{ marginLeft: "250px", padding: "2rem", maxWidth: "calc(100% - 250px)" }}>
      <h1 className="h2 fw-bold mb-4">User Feedback</h1>

      <div className="row">
        {feedbacks.map((feed, idx) => (
          <div key={feed.id} className="col-md-6">
            <motion.div
              className="card mb-3 shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 24px rgba(120,91,249,0.09)" }}
            >
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FaUserCircle size={40} className="me-3 text-primary" />
                  <div>
                    <h5 className="card-title mb-0">{feed.name}</h5>
                    <small className="text-muted">{feed.email}</small>
                  </div>
                </div>
                <p className="card-text">{feed.message}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
