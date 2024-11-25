// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
