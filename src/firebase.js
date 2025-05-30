// Import only what you use
/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";


// Firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "slugather.firebaseapp.com",
  projectId: "slugather",
  storageBucket: "slugather.appspot.com", // corrected from 'firebasestorage.app' to 'appspot.com'
  messagingSenderId: "511663508598",
  appId: "1:511663508598:web:6b7d1b1d1316b697422357",
  measurementId: "G-HFYBWWH4QX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getDatabase(app);

export const firestore = getFirestore(app);
