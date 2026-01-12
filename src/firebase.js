// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJJdPQ7PYRyf1Bmmzr216fLT1QLtOZ8u8",
  authDomain: "login-9962a.firebaseapp.com",
  projectId: "login-9962a",
  storageBucket: "login-9962a.appspot.com", // 🔹 corrected .appspot.com
  messagingSenderId: "1084016210130",
  appId: "1:1084016210130:web:e326f799da8b6f4d48fd0b",
};

const app = initializeApp(firebaseConfig);

// 🔹 Export auth for Email/Password and Google Sign-In
export const auth = getAuth(app);
