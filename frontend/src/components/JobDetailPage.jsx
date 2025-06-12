import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/JobDetailPage.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error('Error fetching job:', error));
  }, [id]);

  return (
    <div className="job-detail-container">
      {job ? (
        <>
          <h1>{job.profile}</h1>
          <p>{job.description}</p>
          <p>Experience: {job.experience} years</p>
          <p>Technologies: {job.techs.join(', ')}</p>
          <Link to={`/update-job/${job.id}`}>Update Job</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobDetailPage;
