import React, { useEffect, useState, useRef } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { db } from '../Services/firebase';
import {  collection, addDoc, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
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
       
           const safePrescription = Array.isArray(data.prescription) ? data.prescription : [];
           setPrescription(safePrescription);
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
      setCharges([]);
    } 
    catch (error) {
      logger.error('Failed to save billing info:', error);
      alert('Error saving bill.');
    }
  };
  const downloadPDF = async () => {
    if (!billRef.current) return;
    const canvas = await html2canvas(billRef.current);
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Bill_${patient?.name || 'patient'}.pdf`);
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
