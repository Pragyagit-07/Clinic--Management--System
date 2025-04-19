const { db } = require("../config/firebase");
const { generateToken } = require("../services/tokenService");

exports.addPatient = async (req, res) => {
  const { name, age } = req.body;
  const token = generateToken();

  try {
    const newPatientRef = db.collection("patients").doc();
    await newPatientRef.set({
      name,
      age,
      token,
      createdAt: new Date().toISOString(),
      prescription: "",
      history: []
    });

    res.status(201).json({ message: "Patient added", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const snapshot = await db.collection("patients").get();
    const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPatientHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await db.collection("patients").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const data = doc.data();
    res.status(200).json(data.history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
