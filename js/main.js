//Saludo
let botonSaludo = document.getElementById("saludarBtn");

    botonSaludo.addEventListener("click", function(){

        let nombre = document.getElementById("nombreInput").value;

        if(!isNaN(nombre) || nombre === ""){
            mensaje.innerText = "Por favor ingresá un nombre válido";
            return;
        }

        mensaje.innerText = "";

        document.getElementById("saludo").innerText =
        "Hola " + nombre + ", bienvenid@ a nuestra tienda online de moda.";
    });

//Mensaje para mostrar error o avisos
    let mensaje = document.getElementById("mensaje");

//Productos
let ropa = [
    {nombre:"remera", precio:15000},
    {nombre:"pantalon", precio:30000},
    {nombre:"buzo", precio:40000}
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Muestro productos
let contenedorProductos = document.getElementById("productos");

ropa.forEach(producto => {

    let div = document.createElement("div");

    div.innerHTML = `
        <p>${producto.nombre} - $${producto.precio}</p>
        <input type="number" min="1" placeholder="Cantidad" id="cantidad-${producto.nombre}">
        <button>Agregar al carrito</button>
    `;

    div.querySelector("button").addEventListener("click", function(){

        let cantidadInput = document.getElementById(`cantidad-${producto.nombre}`).value;
        let cantidad = parseInt(cantidadInput);

        if(isNaN(cantidad) || cantidad <= 0){
            mensaje.innerText = "Ingresá una cantidad válida.";
            return;
        }

        mensaje.innerText = "";

        agregarAlCarrito(producto, cantidad);
    });

    contenedorProductos.appendChild(div);

});

//Agrego producto/s al carrito
    function agregarAlCarrito(producto, cantidad){

    carrito.push({
        producto: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}



//Compra - Carrito
function mostrarCarrito(){

    let listaCarrito = document.getElementById("carrito");

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {

        let li = document.createElement("li");

        let subtotal = item.precio * item.cantidad;

        li.innerText =
        item.producto + " x" + item.cantidad + " - $" + subtotal;

        let botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";

        botonEliminar.addEventListener("click", function(){

            carrito.splice(index,1);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            mostrarCarrito();

        });

        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);

        total += subtotal;

    });

    document.getElementById("total").innerText =
    "Total de la compra: $" + total;
}


mostrarCarrito();

