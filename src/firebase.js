// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcD09NuTs_Bzj9NQjsCl7lLqdCbrQU_CY",
  authDomain: "slugather.firebaseapp.com",
  projectId: "slugather",
  storageBucket: "slugather.firebasestorage.app",
  messagingSenderId: "511663508598",
  appId: "1:511663508598:web:6b7d1b1d1316b697422357",
  measurementId: "G-HFYBWWH4QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);