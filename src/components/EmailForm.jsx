import React, { useState } from "react";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://email-scheduler-be.onrender.com/api/schedule-email",
        {
          email,
          subject,
          body,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      setBody("");
      setEmail("");
      setTime("");
      setSubject("");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error scheduling email:", error);
      setMessage("Failed to schedule email");
    }
  };

  return (
    <div className="schedule-container">
      <h1>Schedule Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time in minutes</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Schedule Email</button>
      </form>
      {message && <p>{message}</p>}
      <LogoutButton />
    </div>
  );
};

export default EmailForm;
