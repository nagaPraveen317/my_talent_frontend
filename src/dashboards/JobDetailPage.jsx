import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JobDetailPage() {
  const { jobId } = useParams(); // Extract jobId from the URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleEditClick = () => {
    navigate('/manager/create-job', { state: { job } }); // Pass job details as state
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:8080/jobs/${jobId}`);
      if (response.status === 200) {
        alert('Job deleted successfully');
        navigate('/manager'); // Redirect after successful deletion
      } else {
        alert(`Error: ${response.data}`);
      }
    } catch (error) {
      console.error('Error deleting job:', error.response?.data || error.message);
      alert('An error occurred while deleting the job');
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1>Job Details</h1>
      <h2>{job.listing_title}</h2>
      <p><strong>Job Title:</strong> {job.job_title}</p>
      <p><strong>Description:</strong> {job.job_description}</p>
      <p><strong>Additional Information:</strong> {job.additional_information}</p>
      <p><strong>Status:</strong> {job.listing_status}</p>
      <p><strong>Date Listed:</strong> {job.date_listed}</p>
      <p><strong>Date Closed:</strong> {job.date_closed}</p>

      {/* Edit button */}
      <button onClick={handleEditClick}>Edit</button>

      {/* Delete button */}
      <button onClick={handleDeleteClick} style={{ marginLeft: '10px', color: 'red' }}>
        Delete
      </button>
    </div>
  );
}