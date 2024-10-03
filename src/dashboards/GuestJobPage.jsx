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
    </div>
  );
}