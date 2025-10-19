// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwird5A7fTnSD3JA7HgHNJhVOi3yiPVwU",
  authDomain: "stylish-steps.firebaseapp.com",
  projectId: "stylish-steps",
  storageBucket: "stylish-steps.firebasestorage.app",
  messagingSenderId: "580730135694",
  appId: "1:580730135694:web:3d77bfef3af246f9c755df",
  measurementId: "G-21F9WH2PZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 📦 Inicializa Firestore
export const db = getFirestore(app);
