import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADNQtyIDciDwl-NjL6dyKISI5rkICsh9o",
  authDomain: "venture-sync-01.firebaseapp.com",
  projectId: "venture-sync-01",
  storageBucket: "venture-sync-01.firebasestorage.app",
  messagingSenderId: "211621480928",
  appId: "1:211621480928:web:f71b0b98d9f80abb680385",
  measurementId: "G-T6WWVVC9VR"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

// Firebase v11 automatically handles persistence for React Native
// AsyncStorage persistence is built-in and doesn't require manual configuration
