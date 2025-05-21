import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";


const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
      <img src="/assets/clinic-logo.png" alt="Clinic Logo" className="clinic-logo" /> 
      <h1 className="clinic-name"> FAST CURE MEDICARE</h1>
       </div>
       <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        
      </nav>
    </header>
  );
};

export default Header;