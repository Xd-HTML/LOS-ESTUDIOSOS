// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// 🔧 CONFIGURACIÓN DE TU PROYECTO FIREBASE
// (Copia estos valores desde tu consola de Firebase > Configuración del proyecto > SDK web)
const firebaseConfig = {
  apiKey: "AIzaSyDwird5A7fTnSD3JA7HgHNJhVOi3yiPVwU",
  authDomain: "stylish-steps.firebaseapp.com",
  projectId: "stylish-steps",
  storageBucket: "stylish-steps.firebasestorage.app",
  messagingSenderId: "580730135694",
  appId: "1:580730135694:web:3d77bfef3af246f9c755df",
  measurementId: "G-21F9WH2PZT"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 📦 Inicializa Firestore
export const db = getFirestore(app);
