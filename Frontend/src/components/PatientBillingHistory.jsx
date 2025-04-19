// components/PatientBillingHistory.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebase';
import '../styles/PatientBillingHistory.css'; // Optional: create if you want custom styles

function PatientBillingHistory({ patientId }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billsRef = collection(db, 'bills');
        const q = query(billsRef, where('patientId', '==', patientId));
        const querySnapshot = await getDocs(q);
        const billData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBills(billData);
      } catch (error) {
        console.error('Error fetching billing history:', error);
      }
    };

    if (patientId) {
      fetchBills();
    }
  }, [patientId]);

  return (
    <div className="billing-history">
      <h4>Billing History</h4>
      {bills.length === 0 ? (
        <p>No previous bills found.</p>
      ) : (
        <ul>
          {bills.map((bill) => (
            <li key={bill.id} className="bill-entry">
              <p><strong>Date:</strong> {bill.createdAt.toDate().toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{bill.total}</p>
              <ul>
                {bill.charges.map((charge, index) => (
                  <li key={index}>{charge.name} - ₹{charge.cost}</li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientBillingHistory;
