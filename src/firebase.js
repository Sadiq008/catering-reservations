import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGJUeYMoijs7O4UoKH3Tql-SgQIhevXrI",
  authDomain: "catering-reservation-fec04.firebaseapp.com",
  projectId: "catering-reservation-fec04",
  storageBucket: "catering-reservation-fec04.appspot.com",
  messagingSenderId: "468276336189",
  appId: "1:468276336189:web:65ca24113f1716da52bc54",
  measurementId: "G-VZXCD58TV8",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // if already initialized, use that one
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
