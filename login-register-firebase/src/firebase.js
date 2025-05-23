// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcJzQOs5RwTx0mWVJKacNc-HqU8o7mQcg",
  authDomain: "login-register-firebase-fdfdf.firebaseapp.com",
  projectId: "login-register-firebase-fdfdf",
  storageBucket: "login-register-firebase-fdfdf.firebasestorage.app",
  messagingSenderId: "648700696798",
  appId: "1:648700696798:web:d16b0552f1cf2daea7ca4f",
  measurementId: "G-LQGDWC05HX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);