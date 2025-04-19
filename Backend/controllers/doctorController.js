const { db } = require("../config/firebase");

exports.updatePrescription = async (req, res) => {
  const { patientId, prescription } = req.body;

  try {
    const patientRef = db.collection("patients").doc(patientId);
    const doc = await patientRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const oldData = doc.data();

    const newHistoryEntry = {
      date: new Date().toISOString(),
      prescription
    };

    await patientRef.update({
      prescription,
      history: [...(oldData.history || []), newHistoryEntry]
    });

    res.status(200).json({ message: "Prescription updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
