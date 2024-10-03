import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

export default function GuestPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  // Fetch job listings from the backend
  useEffect(() => {
    const fetchGuestJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/jobs'); // Full API URL
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching guest jobs:', error);
      }
    };
    fetchGuestJobs();
  }, []);

  // Navigate to the Job Detail Page
  const handleJobClick = (jobId) => {
    navigate(`/guest/${jobId}`);
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.job_title ? job.job_title.toLowerCase() : ''; // Check if job_title exists
    const listingTitle = job.listing_title ? job.listing_title.toLowerCase() : ''; // Check if listing_title exists

    return (
      jobTitle.includes(searchQuery.toLowerCase()) ||
      listingTitle.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Job List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search job listings..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul>
        {filteredJobs.length === 0 ? (
          <p>No job listings found.</p>
        ) : (
          filteredJobs.map((job) => (
            <li key={job.id}>
              <h2>{job.listing_title}</h2>
              <p>Title: {job.job_title}</p>
              <p>Description: {job.job_description}</p>
              <p>Status: {job.listing_status}</p>
              <p>Date Listed: {job.dateListed}</p>
              <button onClick={() => handleJobClick(job.id)}>View Details</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}