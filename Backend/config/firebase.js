const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.firebase_config);
//  const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<clinic-management-system-2b1c4>.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
