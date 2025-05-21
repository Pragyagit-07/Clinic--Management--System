import React from "react";
import "../styles/Contact.css";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      <main className="contact-main">
        <div className="contact-container">
          <h1>Internal Contact & Support</h1>
          <p>This page is for internal staff communication and IT support within FastCureMediCare.</p>

          <section className="staff-directory">
            <h2>Staff Directory</h2>
            <ul>
              <li><strong>Admin:</strong> admin@gmail.com | +91 90XXXXXXXX</li>
              <li><strong>IT Support:</strong> support@fastcure.com | +91 98XXXXXXXX</li>
              
            </ul>
          </section>

          <section className="support-info">
            <h2>Report a Problem</h2>
            <p>If you face technical issues, please contact IT support or use the Help Desk portal.</p>
            <p><strong>Help Desk:</strong><a href="mailto: support@fastcure.com">support@fastcure.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
