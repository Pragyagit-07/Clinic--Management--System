import React, { useState, useEffect } from "react";
import { addDoc, getDocs,collection, Timestamp } from "firebase/firestore";
import { db } from "../Services/firebase";
import { signUpUser} from "../auth/AuthService";  
import { getUsers } from "../Services/firebase";   
import log from "../utils/logger";
import PatientList from "./PatientList";
import BillingForm from "./BillingForm";
import "../styles/AdminPanel.css";


function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [patientName, setPatientName] = useState("");
const [doctorId, setDoctorId] = useState("");
const [appointmentDate, setAppointmentDate] = useState("");
const [appointmentTime, setAppointmentTime] = useState("");
const [doctorsList, setDoctorsList] = useState([]);
  

 
  // Fetch users on component mount
  useEffect(() => {
    console.log("AdminPanel loaded");
    async function fetchUsers() {
      try {
        const users = await getUsers(); // Function to get users from Firestore
        setUserList(users);
        setFilteredUsers(users);
      } catch (error) {
        log.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const doctorList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "doctor");
      setDoctorsList(doctorList);
    };
    fetchDoctors();
  }, []);
  
  // For Settings
const [profileData, setProfileData] = useState({
  displayName: '',
  email: '',
  password: '',
});

const [systemSettings, setSystemSettings] = useState({
  consultationFee: '',
  availableSlots: '',
  holidays: '',
});
  // Appointment state
const [appointmentData, setAppointmentData] = useState({
  patientName: '',
  doctorName: '',
  date: '',
  time: '',
  notes: ''
});


  // Handle new user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUpUser(email, password, role);
      setMessage(`User ${email} created successfully!`);
      setEmail("");
      setPassword("");
      setRole("doctor");
      // Refresh user list after creating user
      const users = await getUsers();
      console.log("Fetched users:", users);
      setUserList(users);
      setFilteredUsers(users);
    } catch (error) {
      setMessage(`Error creating user: ${error.message}`);
      log.error("Signup failed:", error.message);
    }
    finally {
  setLoading(false);
}
  }; 
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "appointments"), {
        patientName,
        doctorId,
        date: appointmentDate,
        time: appointmentTime,
        status: "booked",
        createdAt: new Date(),
      });
  
      alert("Appointment booked!");
  
      // Reset fields
      setPatientName("");
      setDoctorId("");
      setAppointmentDate("");
      setAppointmentTime("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };
  
  
  //  setting handlers
  const handleUpdateProfile = () => {
    console.log("Updating profile with:", profileData);
    alert("Profile update triggered (logic to be added)");
    // Here you can add firebase/auth logic if needed
  };
  
  const handleSaveSystemSettings = () => {
    console.log("Saving system settings:", systemSettings);
    alert("System settings saved (logic to be added)");
  };
  
  // search box 
   const handleSearchManual = (query) => {
     const results = userList.filter((user) =>
       user?.email?.toLowerCase().includes(query.toLowerCase())
    );
   
     setFilteredUsers(results);
 };
 

  return (
    <div  className="admin-panel" style={{ padding: "20px" }}>
      {/* Navigation Bar */}
      <nav className="admin-nav">
        <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
 
         
         <li className={activeTab === "users" ? "active" : ""} onClick={()=> setActiveTab("users")}>Users</li> 
          <li  onClick={() => setActiveTab("patients")}>Patients</li>
          <li onClick={() => setActiveTab("billing")}>Billing</li>
          <li  onClick={() => setActiveTab("appointments")}>Appointments</li>
          <li onClick={() => setActiveTab("settings")}>Settings</li>
        </ul>
      </nav>

      {/* Conditional Module Rendering */}
      {activeTab === "users" && (
        <div>
          <h2>Admin Panel - User Management</h2>

          <form onSubmit={handleCreateUser}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create User"}</button>
          </form>

          {message && <p>{message}</p>}

          {/* Search Bar */}
          <div className="search-section">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
             className="search-bar"
          />
          <button className="search-button" onClick={() => handleSearchManual(searchQuery)}>Search</button> 
</div>
<div className="user-list">
          <h3>User List</h3>
          <ul>
            {filteredUsers.map((user, index) => (
              <li key={index}>
                <strong>{user.email}</strong> ({user.role})
              </li>
            ))}
          </ul>
        </div>
        </div>
      )}

      {activeTab === "patients" && (
        <div>
          <h2>Patient Management</h2>
          <PatientList />
        </div>
      )}

      {activeTab === "billing" && (
        <div>
          <h2>Billing & Payments</h2>
          <BillingForm />
        </div>
      )}
{activeTab === "appointments" && (
  <div className="appointments-tab">
    <h2>Appointments</h2>

    <form onSubmit={handleBookAppointment} style={{ maxWidth: "400px", marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        required
      />

      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
        <option value="">Select Doctor</option>
        {doctorsList.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.displayName || doc.email}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        required
      />

      <input
        type="time"
        value={appointmentTime}
        onChange={(e) => setAppointmentTime(e.target.value)}
        required
      />

      <button type="submit">Book Appointment</button>
    </form>
  </div>
)}

    

        {/* setting section */}

      {activeTab === "settings" && (
        <div className="settings-tab">
          <h2>Settings</h2>
          {/*profile section */}
          
          <div className="settings-section">
          <h3>Profile</h3>
          <input type="text" placeholder="Display Name" 
          value={profileData.displayName}
          onChange={(e) => 
          setProfileData({ ...profileData, displayName: e.target.value })} />
      <input type="email" placeholder="New Email"  
      value={profileData.email}
      onChange={(e) => 
        setProfileData({ ...profileData, email: e.target.value })}
      />
      <input type="password" placeholder="New Password" 
       value={profileData.password}
       onChange={(e) =>
         setProfileData({ ...profileData, password: e.target.value })}
      />
       <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
        {/* System Config Section */}
    <div className="settings-section">
      <h3>System Config</h3>
      <input type="number" placeholder="Default Consultation Fee"
      value={systemSettings.consultationFee}
      onChange={(e) => 
        setSystemSettings({ ...systemSettings, consultationFee: e.target.value })}
      />
      <input type="text" 
      placeholder="Available Slots (comma separated)" 
      value={systemSettings.availableSlots}
      onChange={(e) => 
        setSystemSettings({ ...systemSettings, availableSlots: e.target.value })}
      />
      <input type="text"
       placeholder="Holiday Dates (yyyy-mm-dd, comma separated)"
      value={systemSettings.holidays}
      onChange={(e) => 
        setSystemSettings({ ...systemSettings, holidays: e.target.value })}
      />
      <button onClick={handleSaveSystemSettings}>Save Settings</button>
    </div>

    

    {/* Audit Logs */}
    <div className="settings-section">
      <h3>Audit Logs</h3>
      <ul>
        <li>Admin created user: doctor@example.com</li>
        <li> Receptionist generated bill for Patient A</li>
        <li>Admin updated consultation fee</li>
      </ul>
      </div>
      </div>
    )}
    </div>
  );
}


export default AdminPanel;
