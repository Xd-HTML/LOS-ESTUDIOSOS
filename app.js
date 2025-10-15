// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// 🔧 CONFIGURACIÓN DE TU PROYECTO FIREBASE
// (Copia estos valores desde tu consola de Firebase > Configuración del proyecto > SDK web)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TUSENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 📦 Inicializa Firestore
export const db = getFirestore(app);
