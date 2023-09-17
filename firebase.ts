import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // import auth from firebase/auth

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

console.log("API_KEY:", FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "furqaan-constructions.firebaseapp.com",
  projectId: "furqaan-constructions",
  storageBucket: "furqaan-constructions.appspot.com",
  messagingSenderId: "842392100198",
  appId: "1:842392100198:web:e0bb99423998ca2b3bbca7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // initialize and export auth module
