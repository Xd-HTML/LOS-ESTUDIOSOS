// === app.js ===
// ===============================
// 🔧 IMPORTACIONES DE FIREBASE
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ===============================
// 🔹 CONFIGURACIÓN DE FIREBASE (StylishSteps)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyC05rE_hWyVygjNwTX81seU3yHBLbJSy",
  authDomain: "stylishsteps-1fc4a.firebaseapp.com",
  databaseURL: "https://stylishsteps-1fc4a-default-rtdb.firebaseio.com",
  projectId: "stylishsteps-1fc4a",
  storageBucket: "stylishsteps-1fc4a.appspot.com",
  messagingSenderId: "32645693346",
  appId: "1:32645693346:web:62ca52a58af7ad38cb8",
  measurementId: "G-369VP27S3G"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// ===============================
// 🔸 CLASE PRODUCTO
// ===============================
class Producto {
  constructor(nombre, descripcion, precio, imagen) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
  }

  crearCard() {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${this.imagen}" alt="${this.nombre}" />
      <div class="product-info">
        <h3>${this.nombre}</h3>
        <p>${this.descripcion}</p>
        <p class="price">S/ ${parseFloat(this.precio).toFixed(2)}</p>
        <button class="buy-btn">🛒 Agregar al carrito</button>
      </div>
    `;
    return card;
  }
}

// ===============================
// 🔸 CLASE AUTENTICACIÓN
// ===============================
class AuthApp {
  constructor() {
    this.authModal = document.getElementById("authModal");
    this.userModal = document.getElementById("userModal");
    this.userBtn = document.getElementById("userBtn");
    this.closeAuthModal = document.getElementById("closeAuthModal");
    this.closeUserModal = document.getElementById("closeUserModal");
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");
    this.showRegister = document.getElementById("showRegister");
    this.showLogin = document.getElementById("showLogin");
    this.logoutBtn = document.getElementById("logoutBtn");

    this.initEventos();
    this.escucharEstado();
  }

  // === Inicializar eventos ===
  initEventos() {
    this.userBtn.addEventListener("click", () => {
      if (auth.currentUser) this.abrirUserModal();
      else this.abrirAuthModal();
    });

    this.closeAuthModal.addEventListener("click", () => this.cerrarAuthModal());
    this.closeUserModal.addEventListener("click", () => this.cerrarUserModal());
    this.showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleForm("register");
    });
    this.showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleForm("login");
    });

    this.loginForm.addEventListener("submit", (e) => this.login(e));
    this.registerForm.addEventListener("submit", (e) => this.registrar(e));
    this.logoutBtn.addEventListener("click", () => this.logout());
  }

  abrirAuthModal() {
    this.authModal.classList.remove("hidden");
  }
  cerrarAuthModal() {
    this.authModal.classList.add("hidden");
  }
  abrirUserModal() {
    this.userModal.classList.remove("hidden");
  }
  cerrarUserModal() {
    this.userModal.classList.add("hidden");
  }

  toggleForm(tipo) {
    const title = document.getElementById("authTitle");
    if (tipo === "register") {
      this.loginForm.classList.add("hidden");
      this.registerForm.classList.remove("hidden");
      title.textContent = "Registrar Cuenta";
    } else {
      this.registerForm.classList.add("hidden");
      this.loginForm.classList.remove("hidden");
      title.textContent = "Iniciar Sesión";
    }
  }

  // === Registro ===
  async registrar(e) {
    e.preventDefault();
    const nombre = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const pass = document.getElementById("registerPassword").value.trim();

    if (!nombre || !email || !pass) return alert("⚠️ Complete todos los campos.");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCred.user, { displayName: nombre });

      await setDoc(doc(db, "usuarios", userCred.user.uid), {
        nombre: nombre,
        email: email,
        creado: new Date().toISOString()
      });

      alert("✅ Te registraste con éxito. Ahora inicia sesión.");
      this.toggleForm("login");
    } catch (error) {
      alert("⚠️ Error al registrarte: " + error.message);
    }
  }

  // === Inicio de sesión ===
  async login(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      alert("✅ Sesión iniciada correctamente.");
      this.cerrarAuthModal();
    } catch (error) {
      alert("⚠️ Error al iniciar sesión: " + error.message);
    }
  }

  // === Cerrar sesión ===
  async logout() {
    await signOut(auth);
    this.cerrarUserModal();
  }

  // === Estado de usuario ===
  escucharEstado() {
    onAuthStateChanged(auth, async (user) => {
      const userName = document.getElementById("userName");
      const userEmail = document.getElementById("userEmail");
      const userAvatar = document.getElementById("userAvatar");

      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const datos = docSnap.data();
          userName.textContent = datos.nombre;
          userEmail.textContent = datos.email;
        } else {
          userName.textContent = user.displayName || "Usuario";
          userEmail.textContent = user.email;
        }
        userAvatar.src = user.photoURL || "assets/icons/user.png";
      } else {
        userName.textContent = "Invitado";
        userEmail.textContent = "-";
        userAvatar.src = "assets/icons/user.png";
      }
    });
  }
}

// ===============================
// 🔸 CLASE TIENDA VIRTUAL
// ===============================
class TiendaVirtual {
  constructor() {
    this.productList = document.getElementById("productList");
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.initEventos();
  }

  async cargarProductos() {
    this.productList.innerHTML = `<p>Cargando productos...</p>`;
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      this.productList.innerHTML = "";
      querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();
        const producto = new Producto(p.nombre, p.descripcion, p.precio, p.imagen);
        this.productList.appendChild(producto.crearCard());
      });
    } catch (error) {
      console.error("Error al cargar productos:", error);
      this.productList.innerHTML = `<p>Error al cargar productos ❌</p>`;
    }
  }

  async buscarProductos() {
    const termino = this.searchInput.value.toLowerCase();
    if (termino === "") return this.cargarProductos();

    this.productList.innerHTML = "<p>Buscando...</p>";
    const querySnapshot = await getDocs(collection(db, "productos"));
    this.productList.innerHTML = "";
    let encontrados = 0;

    querySnapshot.forEach((docSnap) => {
      const p = docSnap.data();
      if (p.nombre.toLowerCase().includes(termino)) {
        const producto = new Producto(p.nombre, p.descripcion, p.precio, p.imagen);
        this.productList.appendChild(producto.crearCard());
        encontrados++;
      }
    });

    if (encontrados === 0)
      this.productList.innerHTML = "<p>No se encontraron productos.</p>";
  }

  initEventos() {
    this.searchBtn.addEventListener("click", () => this.buscarProductos());
  }
}

// ===============================
// 🚀 INICIO DE LA APP
// ===============================
window.addEventListener("DOMContentLoaded", async () => {
  const tienda = new TiendaVirtual();
  const authApp = new AuthApp();
  await tienda.cargarProductos();
});
