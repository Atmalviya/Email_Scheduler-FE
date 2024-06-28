import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ScheduleEmail from "./components/ScheduleEmail";
import EmailForm from "./components/EmailForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/schedule-email" element={<ScheduleEmail />} />
          {/* <Route path="/schedule-email" element={<EmailForm />}/> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
