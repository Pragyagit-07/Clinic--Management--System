import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} FastCureMediCare. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
