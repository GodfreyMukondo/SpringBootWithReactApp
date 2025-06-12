import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './assets/styles/global.css'; // <-- global styles
import JobListPage from './components/JobListPage';
import JobDetailPage from './components/JobDetailPage';
import JobSearchPage from './components/JobSearchPage';
import AddJobPage from './components/AddJobPage';
import UpdateJobPage from './components/UpdateJobPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/search-jobs" element={<JobSearchPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/update-job/:id" element={<UpdateJobPage />} />
      </Routes>
    </Router>
  );
};

export default App;
