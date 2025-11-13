// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 add this
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFZSifItDpTU_XWxfS8qd_Mv7mzRm7iwI",
  authDomain: "event-tracker-afba9.firebaseapp.com",
  projectId: "event-tracker-afba9",
  storageBucket: "event-tracker-afba9.firebasestorage.app",
  messagingSenderId: "835829889252",
  appId: "1:835829889252:web:9fd4311fe53abb8e3754f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
