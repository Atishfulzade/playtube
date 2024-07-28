// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
