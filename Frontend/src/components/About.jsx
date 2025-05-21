import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <h1>About FastCureMediCare</h1>
        <p>
          <strong>FastCureMediCare</strong> is a healthcare technology solution dedicated to
          simplifying and modernizing clinic operations. Our platform supports healthcare
          professionals in delivering better care through efficient appointment management,
          real-time patient tracking, and seamless medical record handling.
        </p>

        <p>
          With a focus on accuracy, speed, and security, FastCureMediCare ensures that clinics can
          operate smoothly while maintaining full control over administrative and clinical tasks.
          Our goal is to help clinics reduce paperwork, streamline workflows, and improve the overall
          patient experience.
        </p>

        <h2>What We Provide</h2>
        <ul>
          <li>Smart appointment scheduling and token system</li>
          <li>Complete patient history and medical records</li>
          <li>Prescription generation and tracking</li>
          <li>Billing and invoicing automation</li>
          <li>Role-based access for doctors, receptionists, and administrators</li>
          <li>Detailed reports and activity logs for operational transparency</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          At FastCureMediCare, our mission is to empower clinics of all sizes to deliver faster,
          smarter, and more compassionate healthcare. We believe technology should reduce burdens on
          healthcare professionals—so they can focus on what matters most: the patients.
        </p>

        <h2>Why Choose Us</h2>
        <p>
          Whether you're a solo practitioner or part of a growing clinic network, FastCureMediCare
          adapts to your needs with user-friendly tools and reliable performance. From patient
          check-ins to detailed billing summaries, everything is built with simplicity and security
          in mind.
        </p>

        <p>
          Partner with FastCureMediCare and bring your clinic into the future of healthcare
          management.
        </p>
      </div>
    </div>
  );
};

export default About;

