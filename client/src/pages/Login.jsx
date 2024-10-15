import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials);
      console.log('Response:', response.data);

      // Store the token and userId in localStorage
      localStorage.setItem('token', response.data.token);
      const userId = response.data.userId || response.data._id; // Store userId or _id
      localStorage.setItem('userId', userId);

      // Fetch user data after successful login
      fetchUserData(userId); // Pass userId for fetching

      // Navigate to the desired page after successful login
      navigate('/Userhomepage');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getbuyer/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in headers
        },
      });
      setUserData(response.data); // Store the fetched user data
      console.log('User Data:', response.data); // Log the user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>

      {/* Display user data if available */}
      {userData && (
        <div className="mt-4">
          <h3>User Details</h3>
          <p>User ID: {userData.userId || userData._id}</p> {/* Display the user ID */}
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
};
