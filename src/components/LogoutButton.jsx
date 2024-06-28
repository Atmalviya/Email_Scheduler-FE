import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

        const handleLogout = async () => {
            try {
                localStorage.removeItem('token');
                navigate('/signin');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
