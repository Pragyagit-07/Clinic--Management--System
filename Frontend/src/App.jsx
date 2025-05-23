// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
 import SignUp from "./components/SignUp";
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import PatientList from './components/PatientList';
import TokenGenerator from './components/TokenGenerator';
import About from './components/About';
import Contact from "./components/Contact";

import './styles/App.css';

function App() {
 

  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Home/>}/>
        {/* login route/ home page */}
        {/* <Route path="/" element={<Login />} /> */}

{/* Auth routes */}
{/* < Route path='/signup' element={<SignUp/>}/> */}
<Route path="/login" element={<Login />} />

{/* Dashboard routes */}
<Route path="/about" element={<About/>}/>
<Route path="/contact" element={<Contact />} />
<Route path="/adminpanel" element={<AdminPanel />} />
<Route path="/doctor" element={<DoctorDashboard />} />
<Route path="/receptionist" element={<ReceptionistDashboard />} />

{/* Feature-specific routes */}
<Route path="/generate-token" element={<TokenGenerator />} /> 
<Route path="/patientlist" element={<PatientList />} />
        
             
            

        </Routes>
      </div>
    </Router>
  );
}


export default App;
