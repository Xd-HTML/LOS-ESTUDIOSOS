// importar-productos.js
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Cargar el archivo productos.json
async function importarProductos() {
  try {
    const response = await fetch("./productos.json");
    const productos = await response.json();

    for (const producto of productos) {
      await addDoc(collection(db, "productos"), producto);
      console.log(`✅ Producto agregado: ${producto.nombre}`);
    }

    alert("Todos los productos fueron importados correctamente a Firestore 🎉");
  } catch (error) {
    console.error("❌ Error al importar productos:", error);
    alert("Ocurrió un error al importar los productos.");
  }
}

// Puedes llamar esta función manualmente o al presionar un botón
window.addEventListener("DOMContentLoaded", () => {
  const btnImportar = document.createElement("button");
  btnImportar.textContent = "Importar Productos a Firestore";
  btnImportar.style = `
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 20px;
  `;
  btnImportar.addEventListener("click", importarProductos);
  document.body.appendChild(btnImportar);
});
