import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { LoginContext } from './LoginContext';
import axios from 'axios';

export default function LoginPage() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fullUrl = "http://localhost:8080/login";
      let credentials = { "username": usernameInput, "password": password };
      const response = await axios.post(fullUrl, credentials);
      if (response.status === 200) {
        let data=response.data
        console.log("data from login: " ,data,typeof(data))
        let logged_data=data.split(",");
        let user_id=logged_data[0];
        let token=logged_data[1];
        console.log("User ID is: " + user_id);
        console.log("token: " , token);
        localStorage.setItem("ID",user_id);
        let fullUrl = `http://localhost:8080/users/byname/${credentials.username}`;
        const res=await axios.get(fullUrl);
        let user = { username: usernameInput, type: res.data.type }; // Replace "userType" with actual user type from response if available
        console.log("Type:", res);
        login(user);
        navigate("/"); // Navigate to the home page or any other page after login
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernameInput">Username:</label>
        <input
          type="text"
          id="usernameInput"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}