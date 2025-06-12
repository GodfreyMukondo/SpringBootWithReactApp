import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/JobSearchPage.css';

const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`http://localhost:8080/api/jobs/search?profile=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error('Error searching jobs:', error));
  };

  return (
    <div className="job-search-container">
      <h1>Search Jobs</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by profile"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((job) => (
          <li key={job.id}>
            <h2>{job.profile}</h2>
            <p>Description: {job.description}</p>
            <p>Experience: {job.experience} years</p>
            <p>Technologies: {job.techs.join(', ')}</p>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearchPage;
