import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ApplyPage() {
  const { jobId } = useParams(); // Extract jobId from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const application = {
      jobId,
      name,
      email,
      address,
      phone,
      resume,
    };

    try {
      await axios.post('http://localhost:8080/applications', application);
      alert('Application submitted successfully');
      navigate('/'); // Redirect to home or another page after submission
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application');
    }
  };

  return (
    <div>
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}