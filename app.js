// app.js
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// =====================
// 🔹 CLASE PRODUCTO
// =====================
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
      <img src="${this.imagen}" alt="${this.nombre}" loading="lazy" />
      <div class="product-info">
        <h3>${this.nombre}</h3>
        <p>${this.descripcion}</p>
        <p class="price">S/ ${this.precio.toFixed(2)}</p>
        <button class="buy-btn">🛒 Agregar al carrito</button>
      </div>
    `;
    return card;
  }
}

// =====================
// 🔹 CLASE USUARIO
// =====================
class Usuario {
  constructor(nombre, correo, avatar) {
    this.nombre = nombre;
    this.correo = correo;
    this.avatar = avatar;
  }

  mostrarPerfil() {
    const perfilDiv = document.getElementById("userProfile");
    perfilDiv.innerHTML = `
      <img src="${this.avatar}" alt="Avatar" class="avatar" />
      <div class="user-text">
        <h3>${this.nombre}</h3>
        <p>${this.correo}</p>
      </div>
    `;
  }
}

// =====================
// 🔹 CLASE APLICACIÓN PRINCIPAL
// =====================
class TiendaVirtual {
  constructor() {
    this.productList = document.getElementById("productList");
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");

    this.initEventos();
  }

  // Cargar todos los productos desde Firestore
  async cargarProductos() {
    this.productList.innerHTML = `<div class="loading">⏳ Cargando productos...</div>`;

    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      this.productList.innerHTML = "";

      if (querySnapshot.empty) {
        this.productList.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
      }

      querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();
        const producto = new Producto(p.nombre, p.descripcion, p.precio, p.imagen);
        this.productList.appendChild(producto.crearCard());
      });
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      this.productList.innerHTML = "<p>Error al cargar los productos. Intenta más tarde.</p>";
    }
  }

  // Buscar productos
  async buscarProductos() {
    const termino = this.searchInput.value.toLowerCase().trim();
    if (termino === "") {
      this.cargarProductos();
      return;
    }

    this.productList.innerHTML = `<div class="loading">🔎 Buscando productos...</div>`;

    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      this.productList.innerHTML = "";
      let encontrados = 0;

      querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();
        if (p.nombre.toLowerCase().includes(termino) || p.descripcion.toLowerCase().includes(termino)) {
          const producto = new Producto(p.nombre, p.descripcion, p.precio, p.imagen);
          this.productList.appendChild(producto.crearCard());
          encontrados++;
        }
      });

      if (encontrados === 0) {
        this.productList.innerHTML = "<p>No se encontraron productos con ese nombre.</p>";
      }
    } catch (error) {
      console.error("❌ Error en búsqueda:", error);
    }
  }

  // Cargar usuario (perfil desde Firestore)
  async cargarUsuario(uid = "usuario_demo") {
    try {
      const userRef = doc(db, "usuarios", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const u = userSnap.data();
        const usuario = new Usuario(u.nombre, u.correo, u.avatar);
        usuario.mostrarPerfil();
      } else {
        console.warn("⚠️ No se encontró el usuario en la base de datos.");
        document.getElementById("userProfile").innerHTML = `
          <div class="guest">👤 Invitado</div>
        `;
      }
    } catch (error) {
      console.error("❌ Error al cargar usuario:", error);
    }
  }

  // Inicializar eventos
  initEventos() {
    this.searchBtn.addEventListener("click", () => this.buscarProductos());
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.buscarProductos();
    });
  }
}

// =====================
// 🚀 INICIALIZAR APP
// =====================
window.addEventListener("DOMContentLoaded", async () => {
  const app = new TiendaVirtual();
  await app.cargarUsuario();
  await app.cargarProductos();
});
