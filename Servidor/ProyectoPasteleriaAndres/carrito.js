// Elementos del DOM
let listaProductos = document.getElementById("lista-productos");
let listaCarrito = document.getElementById("lista-carrito");
let totalElement = document.getElementById("total");
let vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// Variables para manejar el carrito
let carrito = [];

// Productos disponibles (esto podría venir de una base de datos más adelante)
let productos = [
    { id: 1, nombre: "Tarta de Chocolate", precio: 15.99 },
    { id: 2, nombre: "Bollo de Crema", precio: 3.99 },
    { id: 3, nombre: "Chocolate con Avellanas", precio: 6.99 },
    { id: 4, nombre: "Dulce de Leche", precio: 4.50 },
];

// Renderizar productos en la página
function mostrarProductos() {
    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toFixed(2)}</p>
            <button onclick="añadirAlCarrito(${producto.id})">Añadir</button>
        `;
        listaProductos.appendChild(div);
    });
}

// Añadir producto al carrito
function añadirAlCarrito(idProducto) {
    let producto = productos.find((p) => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    // Limpiar el carrito
    listaCarrito.innerHTML = "";
    let total = 0;

    // Mostrar productos en el carrito
    carrito.forEach((producto, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio.toFixed(2)}
            <button onclick="quitarDelCarrito(${index})">X</button>
        `;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });

    // Actualizar el total
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Quitar un producto del carrito
function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar todo el carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Agregar el botón "Realizar Pedido"
let realizarPedidoBtn = document.createElement("button");
realizarPedidoBtn.textContent = "Realizar Pedido";
realizarPedidoBtn.addEventListener("click", realizarPedido);
document.body.appendChild(realizarPedidoBtn);

// Función para realizar el pedido
function realizarPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Añade productos antes de realizar el pedido.");
        return;
    }

    // Preparar los datos para enviar al servidor
    let pedido = {
        clienteId: 1, // Esto se debe obtener del sistema de autenticación
        productos: carrito.map((producto) => ({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
        })),
    };

    // Enviar los datos al servidor
    fetch("realizar_pedido.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
    })
        .then((response) => {
            if (response.ok) {
                alert("Pedido realizado con éxito.");
                carrito = []; // Vaciar el carrito
                actualizarCarrito();
            } else {
                alert("Error al realizar el pedido. Inténtalo nuevamente.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Ocurrió un error al procesar el pedido.");
        });
}

// Inicializar la aplicación
mostrarProductos();
