import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

let authInstance;
if (Platform.OS === "web") {
  authInstance = getAuth(app);
} else {
  try {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // Falls back when Auth was already initialized (e.g., hot reload)
    authInstance = getAuth(app);
  }
}

export const auth = authInstance;
export const db = getFirestore(app);
export const storage = getStorage(app);