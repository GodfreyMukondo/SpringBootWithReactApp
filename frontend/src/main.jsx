import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'; // Import the updated App component

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component into the root div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
