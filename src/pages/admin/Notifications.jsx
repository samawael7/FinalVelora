import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Notifications = () => {
  const [target, setTarget] = useState('all');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSendNotification = async () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    if (target === "specific" && !recipient.trim()) {
      toast.error('Please enter a recipient email or username');
      return;
    }

    const title = "Admin Notification";

    let apiBody = {
      title,
      message,
    };

    if (target === "all") {
      apiBody.target = "All";
    } else if (target === "guests") {
      apiBody.target = "Guest";
    } else if (target === "specific") {
      apiBody.target = "User";
      apiBody.emailOrUsername = recipient;
    }

    try {
      const res = await fetch("https://localhost:7182/api/Notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(apiBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send notification");
      }

      toast.success('Notification sent successfully!');
      setMessage('');
      setRecipient('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ marginLeft: "250px", padding: "2rem", maxWidth: "calc(100% - 250px)" }}>
      <motion.h1
        className="fw-bold mb-4"
        style={{ color: '#6554E8' }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        📢 Send Notification
      </motion.h1>

      <motion.div
        className="bg-white p-4 rounded-4 shadow-sm mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <label className="form-label fw-bold text-dark">Target:</label>
          <select
            className="form-select"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="specific">Specific User</option>
            <option value="guests">Guests Only</option>
          </select>
        </div>

        {target === "specific" && (
          <div className="mb-4">
            <label className="form-label fw-bold text-dark">Recipient (email or username):</label>
            <input
              type="text"
              className="form-control"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient's email or username"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="form-label fw-bold text-dark">Message:</label>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn px-4 py-2 fw-bold"
          style={{ backgroundColor: "#6554E8", color: "#fff", borderRadius: "12px" }}
          onClick={handleSendNotification}
        >
          🚀 Send Notification
        </motion.button>
      </motion.div>

      {notifications.length > 0 && (
        <motion.ul
          className="list-group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {notifications.map((notif, idx) => (
            <motion.li
              key={notif.id}
              className="list-group-item rounded-3 shadow-sm mb-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "#f3f4f9" }}
            >
              <strong>To:</strong> {notif.target === "specific" ? notif.recipient : notif.target} <br />
              <strong>Message:</strong> {notif.message}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Notifications;
