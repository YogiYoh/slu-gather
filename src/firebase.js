// Import only what you use
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDcD09NuTs_Bzj9NQjsCl7lLqdCbrQU_CY",
  authDomain: "slugather.firebaseapp.com",
  projectId: "slugather",
  storageBucket: "slugather.firebasestorage.app",
  messagingSenderId: "511663508598",
  appId: "1:511663508598:web:6b7d1b1d1316b697422357",
  measurementId: "G-HFYBWWH4QX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
