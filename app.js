// app.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// === FUNCIÓN: Cargar productos desde Firestore ===
async function cargarProductos() {
  productList.innerHTML = "<p>Cargando productos...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    productList.innerHTML = ""; // Limpia antes de agregar

    querySnapshot.forEach((doc) => {
      const producto = doc.data();
      mostrarProducto(producto);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    productList.innerHTML = "<p>Error al cargar los productos.</p>";
  }
}

// === FUNCIÓN: Mostrar producto en pantalla ===
function mostrarProducto(producto) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <div class="product-info">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="price">S/ ${producto.precio}</p>
    </div>
  `;
  productList.appendChild(card);
}

// === FUNCIÓN: Buscar productos ===
searchBtn.addEventListener("click", async () => {
  const termino = searchInput.value.toLowerCase();
  if (termino.trim() === "") {
    cargarProductos();
    return;
  }

  productList.innerHTML = "<p>Buscando...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const resultados = [];

    querySnapshot.forEach((doc) => {
      const producto = doc.data();
      if (producto.nombre.toLowerCase().includes(termino)) {
        resultados.push(producto);
      }
    });

    productList.innerHTML = "";

    if (resultados.length > 0) {
      resultados.forEach((p) => mostrarProducto(p));
    } else {
      productList.innerHTML = "<p>No se encontraron productos.</p>";
    }
  } catch (error) {
    console.error("Error en búsqueda:", error);
  }
});

// === Iniciar ===
window.addEventListener("DOMContentLoaded", cargarProductos);
