import React, { useState } from "react";
import { signUpUser } from "../auth/AuthService";

import log from "../utils/logger";
import "../styles/SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor"); // default role
  const [message, setMessage] = useState("");
  
  const determineRole = (qualification) => {
    const lowerQ = qualification.toLowerCase();
    if (lowerQ.includes("mbbs") || lowerQ.includes("md") || lowerQ.includes("doctor")) {
      return "doctor";
    } else {
      return "receptionist";
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const assignedRole = determineRole(qualification);
    try {
      const userCredential = await signUpUser(email, password, assignedRole);
      const user = userCredential.user;
  
      // Save user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        email,
        qualification,
        role: assignedRole,
        createdAt: Timestamp.now(),
      });
  
      alert(`User ${name} signed up successfully as ${assignedRole}`);
      // Clear form
      setName("");
      setQualification("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to sign up.");
    }
  };
  
  

  return (
    <div className  ="signup-container">
      <div className="signup-box">
      <h2>Create User (Admin Only)</h2>
      <form onSubmit={handleSignUp}>
      <input
            type="text"
           placeholder="Full Name"
           value={name}
            onChange={(e) => setName(e.target.value)}
           required
        />

        <input
               type="text"
               placeholder="Qualification"
               value={qualification}
             onChange={(e) => setQualification(e.target.value)}
                  required
           />

        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="User Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="doctor">Doctor</option>
          <option value="receptionist">Receptionist</option>
          {/* <option value="admin">Admin  </option> */}
          
        </select>
        <button type="submit">Create User</button>
      </form>
      {message && <p className="signup-message">{message}</p>}
    </div>
    </div>
  );
}

export default SignUp;
