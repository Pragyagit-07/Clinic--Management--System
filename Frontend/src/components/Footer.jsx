import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} FastCureMediCare. All rights reserved.</p>
   
    <div className="footer-links">
        <Link to="/">Home</Link> | 
        <Link to="/about">About Us</Link> | 
        <Link to="/contact">Contact</Link>
      </div>
      </footer>
  );
};

export default Footer;
