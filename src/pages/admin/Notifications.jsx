import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const [target, setTarget] = useState('all');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSendNotification = () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    if (target === "specific" && !recipient.trim()) {
      toast.error('Please enter a recipient email or username');
      return;
    }

    const newNotification = {
      id: Date.now(),
      target,
      recipient,
      message
    };
    setNotifications([newNotification, ...notifications]);
    setMessage('');
    setRecipient('');
    toast.success('Notification sent successfully!');
  };

  return (
    <div style={{ marginLeft: "250px", padding: "2rem", maxWidth: "calc(100% - 250px)" }}>
      <h1 className="h2 fw-bold mb-4">Send Notification</h1>

      <div className="mb-4">
        <label className="form-label fw-bold">Target:</label>
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
          <label className="form-label fw-bold">Recipient (email or username):</label>
          <input
            type="text"
            className="form-control"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label fw-bold">Message:</label>
        <textarea
          className="form-control"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <button className="btn btn-primary mb-5" onClick={handleSendNotification}>
        Send Notification
      </button>

     
      <ul className="list-group">
        {notifications.map((notif) => (
          <li key={notif.id} className="list-group-item">
            <strong>To: </strong> {notif.target === "specific" ? notif.recipient : notif.target} <br />
            <strong>Message: </strong> {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
