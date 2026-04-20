//mensaje para avisos
let mensaje = document.getElementById("mensaje");

//funcion alertas
function mostrarAlerta(texto, tipo = "info"){
    if (typeof Swal !== "undefined"){
        Swal.fire({
            icon: tipo,
            text: texto,
            background: "#f7f5f4",
            color: "#594540",
            customClass: {
                popup: "swal-popup",
                title: "swal-title",
                confirmButton: "swal-confirm",
                cancelButton: "swal-cancel"
            }
        });
    } else {
        mensaje.innerText = texto;
    }
}

//formateo de precio
function formatearPrecio(precio){
    return precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
    });
}

//traducción
function traducirProducto(texto){
    let diccionario = {
        "shirt": "remera",
        "t-shirt": "remera",
        "jacket": "campera",
        "coat": "abrigo",
        "jeans": "jean",
        "pants": "pantalón",
        "sweater": "suéter",
        "hoodie": "buzo",
        "dress": "vestido"
    };

    let textoLower = texto.toLowerCase();

    for (let palabra in diccionario){
        if(textoLower.includes(palabra)){
            return diccionario[palabra];
        }
    }

    return texto;
}

//saludo
document.getElementById("saludarBtn").addEventListener("click", function(){

    let nombre = document.getElementById("nombreInput").value.trim();

    if(!nombre || !isNaN(nombre)){
        mostrarAlerta("Ingresá un nombre válido", "error");
        return;
    }

    mensaje.innerText = "";

    document.getElementById("saludo").innerText =
    "Hola " + nombre + ", bienvenid@ a la tienda";
});

//contenedor productos
let contenedorProductos = document.getElementById("productos");

//consumo de API
Promise.all([
    fetch("https://fakestoreapi.com/products/category/men's clothing").then(res => res.json()),
    fetch("https://fakestoreapi.com/products/category/women's clothing").then(res => res.json())
])
.then(([hombres, mujeres]) => {

    let productos = [...hombres, ...mujeres];

    if(productos.length === 0){
        mensaje.innerText = "No hay productos disponibles";
        return;
    }

    mostrarProductos(productos);
})
.catch(() => {
    mensaje.innerText = "Error al cargar productos";
});

//mostrar productos
function mostrarProductos(productos){

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        let nombreTraducido = traducirProducto(producto.title);

        let div = document.createElement("div");

        div.innerHTML = `
            <p>${nombreTraducido} - ${formatearPrecio(producto.price)}</p>
            <input type="number" min="1" placeholder="Cantidad" id="cantidad-${producto.id}">
            <button>Agregar</button>
        `;

        div.querySelector("button").addEventListener("click", function(){

            let input = document.getElementById(`cantidad-${producto.id}`);
            let cantidad = parseInt(input.value);

            if(isNaN(cantidad) || cantidad <= 0){
                mostrarAlerta("Ingresá una cantidad válida", "error");
                return;
            }

            agregarAlCarrito(producto, cantidad);

            mostrarAlerta("Producto agregado", "success");

            input.value = "";
        });

        contenedorProductos.appendChild(div);
    });
}

//carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//agregar al carrito
function agregarAlCarrito(producto, cantidad){

    let nombreTraducido = traducirProducto(producto.title);

    let existente = carrito.find(item => item.producto === nombreTraducido);

    if(existente){
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            producto: nombreTraducido,
            precio: producto.price,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

//mostrar carrito
function mostrarCarrito(){

    let lista = document.getElementById("carrito");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {

        let li = document.createElement("li");

        let subtotal = item.precio * item.cantidad;

        li.innerHTML = `
            ${item.producto} x${item.cantidad} - ${formatearPrecio(subtotal)}
            <button>Eliminar</button>
        `;

        li.querySelector("button").addEventListener("click", function(){

            carrito.splice(index,1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();

            mostrarAlerta("Producto eliminado", "info");
        });

        lista.appendChild(li);

        total += subtotal;
    });

    document.getElementById("total").innerText =
    "Total: " + formatearPrecio(total);
}

//vaciar carrito
document.getElementById("vaciarCarritoBtn").addEventListener("click", function(){

    if(carrito.length === 0){
        mostrarAlerta("El carrito ya está vacío");
        return;
    }

    Swal.fire({
        title: "¿Vaciar carrito?",
        background: "#f7f5f4",
        color: "#594540",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel"
        }
    }).then(result => {

        if(result.isConfirmed){
            carrito = [];
            localStorage.removeItem("carrito");
            mostrarCarrito();
            mostrarAlerta("Carrito vaciado", "success");
        }
    });
});

//finalizar compra
document.getElementById("comprarBtn").addEventListener("click", function(){

    if(carrito.length === 0){
        mostrarAlerta("El carrito está vacío", "error");
        return;
    }

    Swal.fire({
        title: "¿Confirmar compra?",
        background: "#f7f5f4",
        color: "#594540",
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Cancelar",
        customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel"
        }
    }).then(result => {

        if(result.isConfirmed){
            carrito = [];
            localStorage.removeItem("carrito");
            mostrarCarrito();
            mostrarAlerta("Compra realizada con éxito", "success");
        }
    });
});

//inicio
mostrarCarrito();