import React, {useEffect,useState} from "react";
import { collection, addDoc, getDocs, getDoc,updateDoc, doc, query, orderBy, where } from "firebase/firestore";
import {auth, db } from "../Services/firebase";
import { logoutUser } from "../auth/AuthService";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [appointments, setAppointments] = useState({ today: [], upcoming: [] });
  const [doctorInfo, setDoctorInfo] = useState(null);
const navigate = useNavigate();

// fetch Appointments
useEffect(() => {
  const fetchAppointments = async () => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const q = query(
      collection(db, "appointments"),
      where("doctorId", "==", auth.currentUser.uid)
  
    );
    const querySnapshot = await getDocs(q);
    // const todaysAppointments = [];
    const allAppts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const todayAppts = [];
    const upcomingAppts = [];
  
    allAppts.forEach((appt) => {
      if (appt.date === today) {
        todayAppts.push(appt);
      } else if (appt.date > today) {
        upcomingAppts.push(appt);
      }
      // We ignore past appointments here. You can collect them if needed.
    });
  
    setAppointments({ today: todayAppts, upcoming: upcomingAppts });
  };
    // setAppointments(appts);
  // };

  fetchAppointments();
  const fetchDoctorInfo = async () => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDoctorInfo(docSnap.data());
      }
    }
  };

  fetchDoctorInfo();
}, []);
// Marked As arrived
const handleMarkAsArrived = async (appt) => {
  try {
    // Add the patient to the `patients` collection
    await addDoc(collection(db, "patients"), {
      name: appt.patientName,
      doctorId: appt.doctorId,
      appointmentId: appt.id, // Link appointment to the patient
      seen: false, // Receptionist will set this when they check-in
      billed: false,
      token: Math.floor(Math.random() * 1000), // Example token, adjust as needed
      createdAt: new Date(),
    });

    // Update the appointment status to "arrived" or "completed"
    const apptRef = doc(db, "appointments", appt.id);
    await updateDoc(apptRef, {
      status: "arrived", // Or "completed" depending on your workflow
    });

    alert(`Patient ${appt.patientName} has been marked as arrived!`);
  } catch (error) {
    console.error("Error marking as arrived:", error);
    alert("Failed to mark patient as arrived.");
  }
};



const fetchPatients = async () => {
  const q = query(collection(db, "patients"), where("seen", "==", false), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setPatients(data);
};

const handleAddPrescription = async (id) => {
  try {
    const prescriptionText = prescriptions[id] || "";
    const docRef = doc(db, "patients", id);
    // Save prescription in subcollection
  await addDoc(collection(db, "patients", id, "prescriptions"), {
  content: prescriptionText,
  createdAt: new Date(),
  });
    await updateDoc(docRef, {
      // prescription: prescriptionText,
      seen: true,
      billed: false
      
    });
    

    console.log(`Prescription added for patient ${id} and add seen status updated`);
    setPrescriptions((prev) => ({ ...prev, [id]: "" }));
    fetchPatients(); // Refresh list
    
  } catch (err) {
    log.error("Error adding prescription:", err);
  }
};

useEffect(() => {
  fetchPatients();
}, []);
  
const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      {doctorInfo && (
    <div className="doctor-name">
      Dr. {doctorInfo.name || doctorInfo.email}
    </div>
    )}
      <p>Welcome, Doctor! This is where you'll view patients and write prescriptions.</p>
      <h3>Today's Patients</h3>
<div className="todays-appointments">
  {appointments.today.length === 0 ? (
    <p>No patients scheduled for today.</p>
  ) : (
    <ul>
      {appointments.today.map((appt) => (
        <li key={appt.id}>
          <strong>{appt.patientName}</strong> — {appt.time}
          <span style={{ color: "gray", fontSize: "0.8rem" }}>(waiting for check-in)</span>
        </li>
      ))}
    </ul>
  )}
</div>

      <h4>Upcoming Appointments</h4>
      <div className="upcoming-appointments">
      {appointments.upcoming.length === 0 ? (
  <p>No upcoming appointments.</p>
) : (
  <ul>
  {appointments.upcoming.map((appt) => {
    const dateObj = new Date(`${appt.date}T${appt.time}`);
    const formatted = dateObj.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return (
<li key={appt.id}>
          <strong>{appt.patientName}</strong> — {formatted}
         { /* Mark as Arrived Button */}
          {appt.status === "scheduled" && (
            <button 
              onClick={() => handleMarkAsArrived(appt)} 
              style={{ marginLeft: "10px", backgroundColor: "#4CAF50", color: "white" }}
            >
              Mark as Arrived
            </button>
            )}
        </li>
    );
        })}
        </ul>
      )}
      </div>
      <br/>
      {patients.length === 0 ? <p>No patients waiting</p> : (
        patients.map((p) => ( 
        <div key={p.id}  className="patient-card"style={{ border: "1px solid gray", textAlign:"center",padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>Name:</strong> {p.name}</p>
          <p><strong>Token:</strong> {p.token}</p>
          <p><strong>Age:</strong> {p.age}</p>
          <textarea
            placeholder="Enter Prescription"
            value={prescriptions[p.id] || ""}
            onChange={(e) => 
            setPrescriptions((prev) => ({
                ...prev,
                [p.id]: e.target.value
              }))
            }
          />
          
          <br />
          <button onClick={() => handleAddPrescription(p.id)}>Submit Prescription</button>
          <br />
     
    </div>
    ))
  )}
  <button className="logout-btn" onClick={handleLogout}>Logout</button> 
</div>
  );
};

export default DoctorDashboard;
