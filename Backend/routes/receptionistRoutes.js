const express = require("express");
const { addPatient, getPatientHistory, getAllPatients } = require("../controllers/receptionistController");
const router = express.Router();

router.post("/add-patient", addPatient);
router.get("/patients", getAllPatients);
router.get("/patient/:id/history", getPatientHistory);

module.exports = router;
