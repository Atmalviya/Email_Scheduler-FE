import React, { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import axios from "axios";

const ScheduleEmail = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://email-scheduler-be.onrender.com/auth/islogin', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Ensure cookies are sent with the request
          });
        
        if (response.data.status === true) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
    }
};

useEffect(() => {
    checkLogin();
}, []);

  return <div>{isLoggedIn ? <EmailForm /> : <p>User is not logged in</p>}</div>;
};

export default ScheduleEmail;
