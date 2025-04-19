// src/components/TokenGenerator.js
import React, { useState } from 'react';
import { db } from '../Services/firebase';
import '../styles/TokenGenerator.css';

function TokenGenerator() {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    const token = Math.floor(Math.random() * 1000); // Random token generation
    const newPatient = {
      name: patientName,
      age: patientAge,
      token,
      createdAt: new Date(),
    };
    await db.collection('patients').add(newPatient); // Store in Firestore
    alert('Patient added with token: ' + token);
  };

  return (
    <div className="token-generator-container">
      <h2>Generate Token</h2>
      <form onSubmit={handleGenerateToken}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Patient Age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          required
        />
        <button type="submit">Generate Token</button>
      </form>
    </div>
  );
}

export default TokenGenerator;
