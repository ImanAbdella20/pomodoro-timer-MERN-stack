import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC2PRdhr_y-Bvk9cm_eBZJZsCMnh7AUbLk",
  authDomain: "pomodoro-timer-6625c.firebaseapp.com",
  projectId: "pomodoro-timer-6625c",
  storageBucket: "pomodoro-timer-6625c.firebasestorage.app",
  messagingSenderId: "244468146929",
  appId: "1:244468146929:web:05304926d8e802e2177f50",
  measurementId: "G-T6GPXSMLEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export  default auth;