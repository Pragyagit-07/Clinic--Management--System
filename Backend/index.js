const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const doctorRoutes = require("./routes/doctorRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const billingRoutes = require("./routes/billingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// // const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/clinic', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error: ', err));

// // Routes
// app.use('/api/auth', authRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
