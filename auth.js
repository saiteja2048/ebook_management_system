// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async e => {
            e.preventDefault();
            // Validate username and password (you can add your validation logic here)
            if (username.trim() === '' || password.trim() === '') {
                alert('Please enter username and password');
                return;
            }
            try {
                // Make a POST request to your backend API to authenticate the user
                const response = await axios.post('http://your-backend-api/login', { username, password });
                // Assuming the backend returns user data upon successful login
                const userData = response.data;
                // Call handleLogin function from parent component with user data
                handleLogin(userData);
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please try again.');
            }
        };

        return ( <
                div >
                <
                h2 > Login < /h2> <
                form onSubmit = { handleSubmit } >
                <
                div >
                <
                label htmlFor = "username" > Username: < /label> <
                input type = "text"
                id = "username"
                value = { username }
                onChange = { e => setUsername(e.target.value) }
                /> <
                /div> <
                div >
                <
                label htmlFor = "password" > Password: < /label> <
                input type = "password"
                id = "password"
                value = { password }
                onChange = { e => setPassword(e.target.value) }
                />