import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcD09NuTs_Bzj9NQjsCl7lLqdCbrQU_CY",
  authDomain: "slugather.firebaseapp.com",
  projectId: "slugather",
  storageBucket: "slugather.appspot.com",
  messagingSenderId: "511663508598",
  appId: "1:511663508598:web:6b7d1b1d1316b697422357",
  measurementId: "G-HFYBWWH4QX", // ✅ added trailing comma
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
