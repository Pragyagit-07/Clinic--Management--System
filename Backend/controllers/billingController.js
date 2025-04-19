const { db } = require("../config/firebase");

exports.createBill = async (req, res) => {
  const { patientId, amount, description } = req.body;

  try {
    const billRef = db.collection("billing").doc();
    await billRef.set({
      patientId,
      amount,
      description,
      date: new Date().toISOString()
    });

    res.status(201).json({ message: "Billing record created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBillingHistory = async (req, res) => {
  const { patientId } = req.params;
  try {
    const snapshot = await db.collection("billing").where("patientId", "==", patientId).get();
    const bills = snapshot.docs.map(doc => doc.data());
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
