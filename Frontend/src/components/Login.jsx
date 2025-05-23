// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../Services/firebase";
import { useNavigate , Link} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import log from "../utils/logger";
import { loginUser, getUserRole } from "../auth/AuthService";
import { resetPassword } from "../auth/AuthService";
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState("");
const [showResetBox, setShowResetBox] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      const user = await loginUser(email, password);
 const role = await getUserRole(user.uid);


      log.info("Login successful:", email, "Role:", role);

      if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "receptionist") {
        navigate("/receptionist");
      }else if (role === "admin") {
        navigate("/adminpanel");
       } else {
        setError("Role not defined. Contact admin.");
      }
    } catch (err) {
      log.error("Login failed:", err.message);
      setError("Invalid credentials.");
    }
  };
  const handleResetPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email.");
      return;
    }
  
    const result = await resetPassword(resetEmail);
    alert(result.message);
  };

  return (
    
      <div className="login-container">
      <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p className =" error-text">  {error}</p>}
      <p className="forgot-password" onClick={() => setShowResetBox(!showResetBox)}>
  Forgot Password?
</p>

{showResetBox && (
  <div className="reset-box">
    <input
      type="email"
      placeholder="Enter your email"
      value={resetEmail}
      onChange={(e) => setResetEmail(e.target.value)}
    />
    <button onClick={handleResetPassword}>Send Reset Email</button>
  </div>
)}
      {/* <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p> */}
      </div>
     </div>
  );
}

export default Login;
