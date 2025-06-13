import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/UpdateJobPage.css';

const UpdateJobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setJob({
          ...data,
          techs: Array.isArray(data.techs) ? data.techs.join(', ') : data.techs,
        })
      )
      .catch((error) => console.error('Error fetching job:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJobData = {
      ...job,
      techs: job.techs.split(',').map((tech) => tech.trim()),
    };

    fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJobData),
    })
      .then((response) => response.json())
      .then(() => navigate(`/jobs/${id}`)) 
      .catch((error) => console.error('Error updating job:', error));
  };

  return (
    <div className="update-job-container">
      <h1>Update Job</h1>
      {job ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={job.profile}
            onChange={(e) => setJob({ ...job, profile: e.target.value })}
            placeholder="Profile"
            required
          />
          <textarea
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            placeholder="Description"
            required
          />
          <input
            type="number"
            value={job.experience}
            onChange={(e) => setJob({ ...job, experience: e.target.value })}
            placeholder="Experience"
            required
          />
          <input
            type="text"
            value={job.techs}
            onChange={(e) => setJob({ ...job, techs: e.target.value })}
            placeholder="Technologies (comma separated)"
            required
          />
          <button type="submit">Update Job</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateJobPage;
