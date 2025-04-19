const express = require('express');
const { loginUser, signupUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel');
// const jwt = require('jsonwebtoken');

// // User login API
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
