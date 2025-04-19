import React, { useState, useEffect }from "react";
import { collection, addDoc, serverTimestamp, query,  where,  doc,orderBy, getDocs } from "firebase/firestore";
import { db } from "../Services/firebase";
import { logoutUser } from "../auth/AuthService";
import BillingForm from "./BillingForm";
import { useNavigate } from "react-router-dom";
import "../styles/ReceptionistDashboard.css";

const ReceptionistDashboard = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [patients, setPatients] = useState([]);
  const [seenPatients, setSeenPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const navigate = useNavigate();
  const handleAddPatient = async () => {
    try {
      const token = Date.now(); // basic token generation
      const docRef = await addDoc(collection(db, "patients"), {
        name: patientName,
        age,
        token,
        createdAt: serverTimestamp(),
        prescription: "",
        seen: false,
        billed: false
      });
      console.log("Patient added:", { id: docRef.id, token });
      setPatientName("");
      setAge("");
      fetchPatients();
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  const fetchPatients = async () => {
    const q = query(collection(db, "patients"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPatients(data);
  };

  
   // Load patients who have been marked as "seen"
   const fetchSeenPatients = async () => {
    try {
      const patientsRef = collection(db, 'patients');
      const q = query(patientsRef, where('seen', '==', true), where('billed', '!=', true));
      const snapshot = await getDocs(q);

      const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSeenPatients(patients);
    } catch (err) {
      console.error('Error fetching seen patients:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPatients();
  fetchSeenPatients();
  }, []);
  const handleBillingComplete = async (patientId) => {
    try {
      const patientRef = doc(db, "patients", patientId);
      await updateDoc(patientRef, { billed: true }); // Mark patient as billed
      setSeenPatients(prevState => prevState.filter(patient => patient.id !== patientId)); // Remove from seen list
    } catch (err) {
      console.error("Error updating patient billing status:", err);
    }
  };

  
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="receptionist-dashboard">
      <h2>Receptionist Dashboard</h2>
      <p>Welcome! Here you will register patients and generate tokens.</p>
      <div className="input-section">
        <input type="text" placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} />
        <br/>
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <br />
        <button onClick={handleAddPatient}>Assign Token</button>
      </div>
      <h3 className="section-title">Patient List</h3>
      <ul className="patient-list">
        {patients.map(p => (
          <li key={p.id}>
            {p.name} | Token: {p.token} | Age: {p.age}
   
          </li>
        ))}
      </ul>
      
      <h3 className="section-title">Seen Patients (Ready for Billing)</h3>
      <p> Patient Count: {seenPatients.length}</p>

      <ul className="seen-patient-list">
  {seenPatients.map(p => (
    <li key={p.id}>
      {p.name} | Token: {p.token} | Age: {p.age}
      <br />
      <button onClick={() => setSelectedPatient(p)}>Generate Bill</button>
    </li>
  ))}
</ul>
{selectedPatient && (
  <div className="billing-section">
    <h3>Billing for: {selectedPatient.name}</h3>
    <BillingForm patientId={selectedPatient.id} onComplete={() => handleBillingComplete(selectedPatient.id)} />
    <button className="cancel-button"  onClick={() => setSelectedPatient(null)}>Cancel</button>
  </div>
  )}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};



  
     
   

export default ReceptionistDashboard;
