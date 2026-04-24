import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAddO32E0QPpdCpB9_dPC-6KMgxyo6g25o",
  authDomain: "stroke-health.firebaseapp.com",
  projectId: "stroke-health",
  storageBucket: "stroke-health.firebasestorage.app",
  messagingSenderId: "971974847835",
  appId: "1:971974847835:web:13ac6552bd5f0d86bf7e7e",
  measurementId: "G-0GS8L6YD3K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);