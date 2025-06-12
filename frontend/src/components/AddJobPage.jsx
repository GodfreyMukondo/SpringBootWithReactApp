import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AddJobPage.css';

const AddJobPage = () => {
  const [profile, setProfile] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [techs, setTechs] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      profile,
      description,
      experience: parseInt(experience),
      techs: techs.split(',').map((tech) => tech.trim()),
    };

    fetch('http://localhost:8080/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then(() => navigate('/')) // Redirect to home page after adding job
      .catch((error) => console.error('Error adding job:', error));
  };

  return (
    <div className="add-job-container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          placeholder="Profile"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Experience"
          required
        />
        <input
          type="text"
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
          placeholder="Technologies (comma separated)"
          required
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
