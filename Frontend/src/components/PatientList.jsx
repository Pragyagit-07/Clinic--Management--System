// src/components/PatientList.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc,updateDoc, } from "firebase/firestore";
import { db } from "../Services/firebase";
import BillingForm from './Billingform';
import '../styles/PatientList.css';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');


  useEffect(() => {
    
    const unsubscribe = 
       onSnapshot(collection(db, "patients"),(snapshot) => {
        const patientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPatients(patientsData);
      });

    return () => unsubscribe(); // Clean up the listener
  }, []);
 // Handle delete
 const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this patient?')) {
    try {
      await deleteDoc(doc(db, 'patients', id));
    } catch (err) {
      console.error('Failed to delete patient:', err);
    }
  }
};

// Handle edit submit
const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const patientRef = doc(db, 'patients', editingPatient.id);
    await updateDoc(patientRef, {
      name: editName,
      age: parseInt(editAge),
    });
    setEditingPatient(null);
  } catch (err) {
    console.error('Failed to update patient:', err);
  }
};

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} (Token: {patient.token}, Age: {patient.age})
            <button 
              onClick={() =>{
                console.log("Setting patient ID to:", patient.id);
                setSelectedPatientId(patient.id);
              }}
              style={{ marginLeft: '10px' }}
            >
              Generate Bill
            </button>
            <button
              onClick={() => {
                setEditingPatient(patient);
                setEditName(patient.name);
                setEditAge(patient.age);
              }}
              style={{ marginLeft: '10px' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(patient.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
          
        ))}
      </ul>
      
      {/* Show billing form when a patient is selected */}
      {selectedPatientId && (
        <div className="billing-form-section">
          <hr />
          <BillingForm patientId={selectedPatientId} />
        </div>
      )}
      {/* Edit Patient Form */}
      {editingPatient && (
        <div className="edit-patient-form">
          <h3>Edit Patient</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              placeholder="Age"
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingPatient(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PatientList;
