import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JobAddPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job; // Get job details from state if available

  const [listing_title, setListingTitle] = useState(job?.listing_title || '');
  const [job_title, setTitle] = useState(job?.job_title || '');
  const [department, setDepartment] = useState(job?.department || '');
  const [manager_id, setManagerId] = useState(job?.manager_id || '');
  const [job_description, setDescription] = useState(job?.job_description || '');
  const [additional_information, setAdditionalInformation] = useState(job?.additional_information || '');
  const [dateListed, setDateListed] = useState(job?.date_listed?.slice(0, 10) || ''); // Format date to YYYY-MM-DD
  const [dateClosed, setDateClosed] = useState(job?.date_closed?.slice(0, 10) || ''); // Format date to YYYY-MM-DD
  const [listing_status, setStatus] = useState(job?.listing_status || 'Open'); // Default to Open
  const isEditMode = !!job; // Determine if in edit mode

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedDateListed = dateListed ? `${dateListed}T00:00:00` : null;
    const formattedDateClosed = dateClosed ? `${dateClosed}T00:00:00` : null;
    const newJob = {
        listing_title,
        job_title,
        department,
        manager_id,
        job_description,
        additional_information,
        date_listed: formattedDateListed,
        date_closed: formattedDateClosed,
        listing_status,
    };

    try {
      if (isEditMode) {
        // Update existing job
        await axios.put(`http://localhost:8080/jobs/${job.id}`, newJob);
        alert('Job updated successfully');
      } else {
        // Create new job
        await axios.post('http://localhost:8080/jobs', newJob);
        alert('Job created successfully');
      }
      navigate('/manager'); // Redirect to Manager Dashboard after creation/update
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the job');
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Edit Job Listing' : 'Create a New Job Listing'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields with pre-filled values if editing */}
        <div>
          <label>Listing Title</label>
          <input
            type="text"
            value={listing_title}
            onChange={(e) => setListingTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Job Title</label>
          <input
            type="text"
            value={job_title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Manager ID</label>
          <input
            type="number"
            value={manager_id}
            onChange={(e) => setManagerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Job Description</label>
          <textarea
            value={job_description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Additional Information</label>
          <textarea
            value={additional_information}
            onChange={(e) => setAdditionalInformation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date Listed</label>
          <input
            type="date"
            value={dateListed}
            onChange={(e) => setDateListed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date Closed</label>
          <input
            type="date"
            value={dateClosed}
            onChange={(e) => setDateClosed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={listing_status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit">{isEditMode ? 'Update Job' : 'Create Job'}</button>
      </form>
    </div>
  );
}