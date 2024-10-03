import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    userType: '', // default to 'candidate'
    fullName: '',
    email: '',
    address: '', // for candidate
    phone: '',
    department: '' // for manager
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      // Register the user in the main user table
      const userResponse = await axios.post('http://localhost:8080/register', {
        username: formData.username,
        password: formData.password,
        type: formData.userType // Make sure it's 'type' on the backend
      });
      console.log('User registration successful:', userResponse.data);

      // Assuming userResponse.data contains user_id
      const userId = userResponse.data.id; // Adjust based on actual response structure
     
      

      if (formData.userType === 'Hiring_Manager') {
        // Register the manager with additional fields and pass the user_id
        const managerResponse = await axios.post('http://localhost:8080/manager', {
          fullName: formData.fullName,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
          user_id: userId // Pass the user_id from the User table
        });

        console.log('Manager registration successful:', managerResponse.data);

      } else if (formData.userType === 'Candidate') {
        // Register the candidate with additional fields
        const candidateResponse = await axios.post('http://localhost:8080/candidates', {
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          user_id: userId // Pass the user_id for candidates as well
        });

        console.log('Candidate registration successful:', candidateResponse.data);
      }

      // Redirect to login page after successful registration
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>User Type:</label>
          <div>
            <input
              type="radio"
              id="candidate"
              name="userType"
              value="Candidate"
              checked={formData.userType === 'Candidate'}
              onChange={handleUserTypeChange}
            />
            <label htmlFor="candidate">Candidate</label>
          </div>
          <div>
            <input
              type="radio"
              id="manager"
              name="userType"
              value="Hiring_Manager"
              checked={formData.userType === 'Hiring_Manager'}
              onChange={handleUserTypeChange}
            />
            <label htmlFor="manager">Hiring Manager</label>
          </div>
        </div>

        {/* Conditionally render additional fields for Candidate */}
        {formData.userType === 'Candidate' && (
          <>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Conditionally render additional fields for Manager */}
        {formData.userType === 'Hiring_Manager' && (
          <>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;