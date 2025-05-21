import React, { useEffect, useState, useRef } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { db } from '../Services/firebase';
import {  collection, addDoc, doc, getDoc, updateDoc, Timestamp, query, orderBy, limit, getDocs  } from 'firebase/firestore';
import PatientBillingHistory from './PatientBillingHistory';
import logger from '../utils/logger';
import "../styles/BillingForm.css";

const BillingForm = ({ patientId }) => {
  console.log("BillingForm received patientId:", patientId);
  const [patient, setPatient] = useState(null);
  const [prescription, setPrescription] = useState([]);
  const [charges, setCharges] = useState([]);
  const [customCharge, setCustomCharge] = useState({ name: '', cost: '' });
 
  const [total, setTotal] = useState(0);
   const billRef = useRef();

  


  // Fetch patient data and prescription
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientRef = doc(db, 'patients', patientId);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          const data = patientSnap.data();
          setPatient(data);
        const prescriptionsRef = collection(db, "patients", patientId, "prescriptions");
    const prescriptionsQuery = query(prescriptionsRef, orderBy("createdAt", "desc"), limit(1));
   const prescriptionsSnap = await getDocs(prescriptionsQuery);
          if (!prescriptionsSnap.empty) {
            const prescriptionData = prescriptionsSnap.docs.map(doc => doc.data().content);
            setPrescription(prescriptionData); // This will be an array
          } else {
            setPrescription([]);
          }

         } else {
           logger.warn('No patient found with ID:', patientId);
        }
          
      } catch (error) {
        logger.error('Failed to fetch patient:', error);
      }
    };

    if (patientId) fetchPatient();
  }, [patientId]);
  


  // Update total when charges change
  useEffect(() => {
    const totalCost = charges.reduce((sum, item) => sum + Number(item.cost), 0);
    setTotal(totalCost);
  }, [charges]);

  const addCharge = () => {
    if (customCharge.name && customCharge.cost) {
      setCharges([...charges, customCharge]);
      setCustomCharge({ name: '', cost: '' });
    }
  };

  const handleSaveBill = async () => {
    if (!patientId) {
      logger.error('Cannot save bill: patientId is undefined');
      alert('Please select a patient before saving billing info.');
      return;
    }
    if (charges.length === 0) {
      alert('Please add at least one charge before saving.');
      return;
    }
    try {
      const bill = {
        patientId,
        charges,
        total,
        createdAt: Timestamp.now(),
      };
      logger.info('Saving bill:', bill); 
      await addDoc(collection(db, 'bills'), bill);
    
      const patientRef = doc(db, 'patients', patientId);
      await updateDoc(patientRef, {
        billing: {
          items: charges,
          total,
          createdAt: Timestamp.now(),
        },
        billed: true //  Mark patient as billed
      });
      logger.info('Billing info saved', { patientId });
      alert('Billing information saved!');
      
      <button onClick={() => setCharges([])}>Clear Bill Form</button>

    } 
    catch (error) {
      logger.error('Failed to save billing info:', error);
      alert('Error saving bill.');
    }
  };
 
  // new fom of download pdf
  const downloadPDF = () => {
    if (!patient) return;
  
    const pdf = new jsPDF();
    let y = 10;
  
    // Clinic Header
    pdf.setFontSize(16);
    pdf.text(" Fast Cure Medicare", 80, y);
    y += 7;
    pdf.setFontSize(10);
    pdf.text("1234 pritampura  Street, Delhi", 80, y);
    y += 5;
    pdf.text("Phone: +91-98XXXXXXXX | Email: support@fastcuremedicare.com", 50, y);
    y += 10;
  
    // Bill Info
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);
    pdf.text(`Bill No: ${Math.floor(Math.random() * 100000)}`, 150, y);
    y += 10;
  
    // Patient Info
    pdf.setFontSize(12);
    pdf.text(`Patient Name: ${patient.name}`, 14, y);
    pdf.text(`Age: ${patient.age}`, 100, y);
    y += 7;
    pdf.text(`Token No: ${patient.token}`, 14, y);
    y += 10;
  
    // Prescription
    pdf.setFontSize(12);
    pdf.text("Prescription:", 14, y);
    y += 7;
    prescription.forEach((item, index) => {
      pdf.setFontSize(10);
      pdf.text(`- ${item}`, 18, y);
      y += 6;
    });
  
    y += 5;
  
    // Charges Header
    pdf.setFontSize(12);
    pdf.text("Charges:", 14, y);
    y += 7;
  
    pdf.setFontSize(10);
    pdf.text("#", 14, y);
    pdf.text("Item", 20, y);
    pdf.text("Amount (₹)", 160, y, { align: "right" });
    y += 6;
  
    // Charges List
    charges.forEach((item, index) => {
      pdf.text(`${index + 1}`, 14, y);
      pdf.text(item.name, 20, y);
      pdf.text(`${item.cost}`, 160, y, { align: "right" });
      y += 6;
    });
  
    // Total
    y += 6;
    pdf.setFontSize(11);
    pdf.text("Total:", 140, y);
    pdf.setFont("helvetica", "bold");
    pdf.text(`₹${total}`, 160, y, { align: "right" });
    pdf.setFont("helvetica", "normal");
  
    // Footer
    y += 20;
    pdf.setFontSize(10);
    pdf.text("Thank you for visiting. Get well soon!", 60, y);
  
    pdf.save(`Bill_${patient.name}.pdf`);
  };
  
  

  return (
    <div ref={billRef} className="pdf-content">
    <div className="billing-form">
      <h3>Billing Form</h3>

      {patient && (
        <div className="patient-info">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Token:</strong> {patient.token}</p>
        </div>
      )}

      <div>
        <h4>Prescription Items:</h4>
        <ul>
          {Array.isArray(prescription) && prescription.length > 0 ? (
            prescription.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No prescription items</li>
          )}
        </ul>
      </div>

      <div>
        <h4>Add Charges:</h4>
        <input
          type="text"
          placeholder="Item name"
          value={customCharge.name}
          onChange={(e) => setCustomCharge({ ...customCharge, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cost"
          value={customCharge.cost}
          onChange={(e) => setCustomCharge({ ...customCharge, cost: e.target.value })}
        />
        <button onClick={addCharge}>Add</button>
      </div>

      <div>
        <h4>Current Charges:</h4>
        <ul>
          {charges.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.cost}
            </li>
          ))}
        </ul>
        <h4>Total: ₹{total}</h4>
        <button onClick={handleSaveBill}>Generate Bill</button>
      </div>
      <PatientBillingHistory patientId={patientId} />
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
    
    </div>
  );
};

export default BillingForm;
