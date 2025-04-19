// Import only the necessary functions from Firebase
import { initializeApp } from 'firebase/app';
 import { getFirestore } from 'firebase/firestore';
 import { getAuth} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs } from "firebase/firestore";


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyDmEWAGtBVBakwNuXOoSk58lSWfd981zBE',
  authDomain: 'clinic-management-system-2b1c4.firebaseapp.com',
  projectId: 'clinic-management-system-2b1c4',
  storageBucket: 'clinic-management-system-2b1c4.firebasestorage.app',
  messagingSenderId: '763692297363',
  appId: '1:763692297363:web:7ed8e18c408aa4f9f67166',
  measurementId: "G-XGX05Z8MH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Fetch all users from Firestore
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};


// Export these if you need to use them elsewhere
export { db, auth };
