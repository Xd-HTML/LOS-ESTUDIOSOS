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

  // Método para crear la tarjeta del producto
  crearCard() {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${this.imagen}" alt="${this.nombre}" />
      <div class="product-info">
        <h3>${this.nombre}</h3>
        <p>${this.descripcion}</p>
        <p class="price">S/ ${this.precio}</p>
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
      <img src="${this.avatar}" alt="Avatar del usuario" class="avatar" />
      <div>
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

  // Cargar todos los productos
  async cargarProductos() {
    this.productList.innerHTML = "<p>Cargando productos...</p>";

    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      this.productList.innerHTML = "";

      querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();
        const producto = new Producto(p.nombre, p.descripcion, p.precio, p.imagen);
        this.productList.appendChild(producto.crearCard());
      });
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      this.productList.innerHTML = "<p>Error al cargar los productos.</p>";
    }
  }

  // Buscar productos
  async buscarProductos() {
    const termino = this.searchInput.value.toLowerCase().trim();
    if (termino === "") {
      this.cargarProductos();
      return;
    }

    this.productList.innerHTML = "<p>Buscando...</p>";

    try {
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

      if (encontrados === 0) {
        this.productList.innerHTML = "<p>No se encontraron productos.</p>";
      }
    } catch (error) {
      console.error("❌ Error en búsqueda:", error);
    }
  }

  // Mostrar perfil de usuario (desde Firestore)
  async cargarUsuario(uid = "usuario_demo") {
    try {
      const userRef = doc(db, "usuarios", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const u = userSnap.data();
        const usuario = new Usuario(u.nombre, u.correo, u.avatar);
        usuario.mostrarPerfil();
      } else {
        console.log("⚠️ No se encontró el usuario.");
      }
    } catch (error) {
      console.error("❌ Error al cargar usuario:", error);
    }
  }

  // Eventos
  initEventos() {
    this.searchBtn.addEventListener("click", () => this.buscarProductos());
  }
}

// =====================
// 🚀 INICIALIZAR APP
// =====================
window.addEventListener("DOMContentLoaded", async () => {
  const app = new TiendaVirtual();
  await app.cargarUsuario(); // Cargar el perfil del usuario
  await app.cargarProductos(); // Cargar los productos
});
