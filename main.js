// === MAIN.JS ===

// ✅ Referencias a los elementos del DOM
const authModal = document.getElementById("authModal");
const userModal = document.getElementById("userModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const closeUserModal = document.getElementById("closeUserModal");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const userBtn = document.getElementById("userBtn");
const logoutBtn = document.getElementById("logoutBtn");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

// ✅ Firebase (ya cargado desde index.html)
const auth = window.firebaseAuth;
const db = window.firebaseDB;

// === FUNCIONES DE MODALES ===
userBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) {
    showUserModal();
  } else {
    showAuthModal();
  }
});

closeAuthModal.addEventListener("click", () => {
  authModal.classList.add("hidden");
});

closeUserModal.addEventListener("click", () => {
  userModal.classList.add("hidden");
});

// === Alternar entre Login y Registro ===
showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  document.getElementById("authTitle").textContent = "Crear Cuenta";
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  document.getElementById("authTitle").textContent = "Iniciar Sesión";
});

// === Mostrar Modales ===
function showAuthModal() {
  authModal.classList.remove("hidden");
}

function showUserModal() {
  userModal.classList.remove("hidden");
}

// === REGISTRO DE USUARIO ===
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizar nombre del perfil
    await updateProfile(user, { displayName: name });

    // Guardar datos del usuario en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: name,
      email: email,
      creado: new Date()
    });

    alert("✅ Cuenta creada con éxito.");
    authModal.classList.add("hidden");
    registerForm.reset();
  } catch (error) {
    alert("❌ Error al registrarte: " + error.message);
  }
});

// === INICIO DE SESIÓN ===
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Sesión iniciada correctamente.");
    authModal.classList.add("hidden");
    loginForm.reset();
  } catch (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  }
});

// === CERRAR SESIÓN ===
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("👋 Sesión cerrada correctamente.");
    userModal.classList.add("hidden");
  } catch (error) {
    alert("❌ Error al cerrar sesión: " + error.message);
  }
});

// === DETECTAR CAMBIOS DE SESIÓN ===
onAuthStateChanged(auth, (user) => {
  if (user) {
    userName.textContent = user.displayName || "Usuario";
    userEmail.textContent = user.email;
    document.getElementById("userProfile").innerHTML = `
      <span>👤 ${user.displayName || user.email}</span>
    `;
  } else {
    userName.textContent = "Invitado";
    userEmail.textContent = "-";
    document.getElementById("userProfile").innerHTML = "";
  }
});
