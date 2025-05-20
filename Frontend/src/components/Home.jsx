
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Services/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData?.role === "admin") navigate("/admin");
        else if (userData?.role === "doctor") navigate("/doctor");
        else if (userData?.role === "receptionist") navigate("/reception");
      }
    };

    checkUserAndRedirect();
  }, []);
  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <div className="home-card">
          <h1>Welcome to the  Fast Cure Medicare</h1>
          <p>Please log in to continue.</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};




export default Home;
