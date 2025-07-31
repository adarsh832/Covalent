// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl2F-dNZWS0KCX855P3T5U8J1-ovshvEw",
  authDomain: "peerup-5781e.firebaseapp.com",
  projectId: "peerup-5781e",
  storageBucket: "peerup-5781e.firebasestorage.app",
  messagingSenderId: "1037000254488",
  appId: "1:1037000254488:web:3a499b371829aa38aacf6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

