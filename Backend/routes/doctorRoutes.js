const express = require("express");
const { updatePrescription } = require("../controllers/doctorController");
const router = express.Router();

router.post("/prescription", updatePrescription);

module.exports = router;
