import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkNOWiLkuxOd4RKPszV_3DppPUf1xjW9w",
  authDomain: "tase-d2eda.firebaseapp.com",
  projectId: "tase-d2eda",
  storageBucket: "tase-d2eda.firebasestorage.app",
  messagingSenderId: "319136650156",
  appId: "1:319136650156:web:6bcfcd53d0bd7f4e40e009",
  measurementId: "G-SMJD8N0HVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
export const db = getFirestore(app); // Added 'export' here

// Get a reference to the Auth service
export const auth = getAuth(app);

export default app;
