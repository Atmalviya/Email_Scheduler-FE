import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
                const response = await axios.post('https://email-scheduler-be.onrender.com/auth/signin', credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setMessage('Login successful');
                navigate('/schedule-email'); // Navigate to EmailForm component after successful login
            } else {
                setMessage('Failed to log in');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Login failed');
        }
    };

    return (
        <div className='auth-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            <p>New user? <Link to="/signup">Signup</Link></p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
