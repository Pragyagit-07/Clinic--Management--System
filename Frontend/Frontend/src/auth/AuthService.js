
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut} from "firebase/auth";
import { doc, getDoc ,setDoc} from "firebase/firestore";
import {  db } from "../Services/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import log from "../utils/logger";
const auth = getAuth();
// Signup function
export const signUpUser = async (email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      // Store role in Firestore
      await setDoc(doc(db, "users", uid), {
        email,
        role,
        createdAt: new Date()
      });
  
      log.info(`User signed up: ${email} (${role})`);
      return userCredential.user;
    } catch (error) {
      log.error("Signup error:", error.message);
      throw error;
    }
  };
  

// Login function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    log.info("User logged in:", user.email);
    return user;
  } catch (error) {
    log.error("Login failed:", error.message);
    throw error;
  }
};
//  reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get role (doctor/receptionist) from Firestore
export const getUserRole = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const role = userSnap.data().role;
      log.info("Fetched role:", role);
      return role;
    } else {
      log.warn("No such user in Firestore");
      return null;
    }
  } catch (error) {
    log.error("Error fetching user role:", error.message);
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    log.info("User logged out");
  } catch (error) {
    log.error("Logout error:", error.message);
  }
};
