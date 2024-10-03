import './dashboard.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const CandidatePage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
 const[appliedjobs,setAppliedJobs]=useState([]);
 var list_of_jobs=[];
  // Simulate fetching applied jobs (replace with your actual API call)
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const id=localStorage.getItem('ID');
        const response = await fetch(`http://localhost:8080/applications/jobsapplied/${id}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        console.log("Jobs applied data: ",data);
        console.log("Logged in user ID: " , id);
       
       
      const list_of_jobs = await Promise.all(
    data.map(async (application) => {
      console.log("Job: ",application)
      console.log("Job id is : " + application.job_id)
      const res = await fetch(`http://localhost:8080/jobs/${application.job_id}`);
      return await res.json();  // Resolve the job data
    })
  );
        console.log("List of Applications: ",data);
        console.log("Applied Job: ", list_of_jobs)
       
        
        setAppliedJobs(list_of_jobs);
         setJobs(data);
        console.log("Number of jobs applied: ",list_of_jobs.length)
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleApply = (jobId) => {
    alert(`Applying to job ID: ${jobId}`);
    // Implement apply functionality
  };

  const handleUpdate = (jobId) => {
    alert(`Updating application for job ID: ${jobId}`);
    // Implement update functionality
  };

  return (
    <div>
      <div className="content">
        <h1>Candidate Dashboard</h1>
        <div>
          <h2>Applied Jobs</h2>
       
          {(appliedjobs===null?[]:appliedjobs).length === 0 ? (
            <p>No jobs applied yet.</p>
          ) : (
            <ul>
              {appliedjobs.map((job,index) => (
                <div id='applied-jobs'>
                <li key={job.id}>
                     {console.log("Check application data ",jobs[index])}
                     
               
                 <p>Job title: {job.job_title}</p>
                <p>status: {jobs[index].application_status}</p>
               
                </li>
                </div>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2>Actions</h2>
          <Link to="/search-jobs">Search Job Openings</Link><br/>
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;