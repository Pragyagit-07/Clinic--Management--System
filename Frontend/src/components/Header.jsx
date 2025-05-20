import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <img src="/assets/clinic-logo.png" alt="Clinic Logo" className="clinic-logo" /> 
      <h1 className="clinic-name"> FAST CURE MEDICARE</h1>
    </header>
  );
};

export default Header;