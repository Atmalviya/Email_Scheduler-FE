import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "https://email-scheduler-be.onrender.com/auth/signup",
        {
          password,
          email,
        },
        { withCredentials: true }
      );

      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/signin");
      }, 2000); 
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Failed to register");
    }
  };

  return (
    <div className="auth-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
            <p>Already registered? <Link to="/signin">Sign in</Link></p>
    </div>
  );
};

export default Signup;
