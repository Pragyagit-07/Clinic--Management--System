const express = require("express");
const { createBill, getBillingHistory } = require("../controllers/billingController");
const router = express.Router();

router.post("/create", createBill);
router.get("/history/:patientId", getBillingHistory);

module.exports = router;

