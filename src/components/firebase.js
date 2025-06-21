// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYuiAj1AbWB04F0iU1HaFmZP6VIZyIv6U",
  authDomain: "bhaggya-darshhan.firebaseapp.com",
  projectId: "bhaggya-darshhan",
  storageBucket: "bhaggya-darshhan.firebasestorage.app",
  messagingSenderId: "233513586592",
  appId: "1:233513586592:web:9792f06f7203b13e2ddec5",
  measurementId: "G-1JRYDMJSWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);