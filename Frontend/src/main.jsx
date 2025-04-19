// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';  // Global styles (you can customize this file for general styles)
import App from './App';       // Importing the main App component

// Firebase Setup - Make sure firebase.js has the correct Firebase config
import { db, auth } from './Services/firebase';
// Create root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// You can initialize Firebase services if necessary. For example:
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User logged out");
  }
});

// Render the app using the new method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);