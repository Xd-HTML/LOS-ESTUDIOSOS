// =======================================================
// 🔥 CONFIGURACIÓN DE FIREBASE PARA TIENDA VIRTUAL
// =======================================================

// Importar las funciones necesarias del SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwird5A7fTnSD3JA7HgHNJhVOi3yiPVwU",
  authDomain: "stylish-steps.firebaseapp.com",
  projectId: "stylish-steps",
  storageBucket: "stylish-steps.firebasestorage.app",
  messagingSenderId: "580730135694",
  appId: "1:580730135694:web:3d77bfef3af246f9c755df",
  measurementId: "G-21F9WH2PZT"
};

// =======================================================
// 🚀 INICIALIZAR FIREBASE
// =======================================================
const app = initializeApp(firebaseConfig);
getAnalytics(app); // opcional: solo si usas Google Analytics

// =======================================================
// 📦 EXPORTAR INSTANCIA DE FIRESTORE
// =======================================================
export const db = getFirestore(app);
