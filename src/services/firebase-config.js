"use client"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATmVZ3U_HXDRA2XGQ-omV-i0laIsM3ezk",
  authDomain: "budgetwise-9858d.firebaseapp.com",
  projectId: "budgetwise-9858d",
  storageBucket: "budgetwise-9858d.firebasestorage.app",
  messagingSenderId: "478949716554",
  appId: "1:478949716554:web:af51576369c547dcfc6cb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const gprovider = new GoogleAuthProvider();
export const db = getFirestore(app);