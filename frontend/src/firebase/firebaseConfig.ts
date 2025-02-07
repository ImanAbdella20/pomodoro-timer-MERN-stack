import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2PRdhr_y-Bvk9cm_eBZJZsCMnh7AUbLk",
  authDomain: "pomodoro-timer-6625c.firebaseapp.com",
  projectId: "pomodoro-timer-6625c",
  storageBucket: "pomodoro-timer-6625c.firebasestorage.app",
  messagingSenderId: "244468146929",
  appId: "1:244468146929:web:a5b8661c031bf668177f50",
  measurementId: "G-REY5RKVWT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export  {auth , db};