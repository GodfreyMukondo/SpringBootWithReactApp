import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/JobListPage.css';
import '../assets/styles/Links.css';


const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/jobs/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setJobs(jobs.filter((job) => job.id !== id));
        }
      })
      .catch((error) => console.error('Error deleting job:', error));
  };

  return (
   <div className="job-list-container">
      <h1>Job Listings</h1>

      /* Wraping links in a container */
        <div className="job-list-links">
          <Link to="/add-job">Add New Job</Link>
          <Link to="/search-jobs">Search Jobs</Link>
        </div>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.profile}</h2>
            <p>Description: {job.description}</p>
            <p>Experience: {job.experience} years</p>
            <p>Technologies: {job.techs.join(', ')}</p>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListPage;
