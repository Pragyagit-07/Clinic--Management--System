const admin = require("firebase-admin");

exports.signupUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    await admin.auth().setCustomUserClaims(user.uid, { role });

    res.status(201).json({ message: "User created", uid: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  res.status(501).json({ message: "Use Firebase Auth on frontend for login." });
};
