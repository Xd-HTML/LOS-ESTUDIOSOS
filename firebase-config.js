// =======================================================
// 🔥 CONFIGURACIÓN DE FIREBASE PARA TIENDA VIRTUAL
// =======================================================

// Importar las funciones necesarias del SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNeN0AIcXw0aAiwc6S7472y7YMjHzbV94",
  authDomain: "tienda-virtual-883ef.firebaseapp.com",
  projectId: "tienda-virtual-883ef",
  storageBucket: "tienda-virtual-883ef.firebasestorage.app",
  messagingSenderId: "871120614985",
  appId: "1:871120614985:web:0274d91497b7f1e3d33198"
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
