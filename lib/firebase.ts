// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDywLudxE5EjCvsNlrJ3i1wtQXuC6JESyw",
  authDomain: "chatbot-7a065.firebaseapp.com",
  projectId: "chatbot-7a065",
  storageBucket: "chatbot-7a065.firebasestorage.app",
  messagingSenderId: "395082274069",
  appId: "1:395082274069:web:47ca5933957c5f0761451c",
  measurementId: "G-Y6YCK28W0R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
