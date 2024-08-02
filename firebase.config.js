// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"; // Correct import path
import firebase from "firebase/compat/app";

const api_key = import.meta.env.VITE_VITE_API_FIREBASE_KEY;
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "playtube-db274.firebaseapp.com",
  projectId: "playtube-db274",
  storageBucket: "playtube-db274.appspot.com",
  messagingSenderId: "754080424618",
  appId: "1:754080424618:web:3f9d3b324359abdaa1e6d3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence);
const db = getFirestore(app);
export { db };
