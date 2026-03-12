//Saludo

function pedirNombre() {
    let nombre = prompt("Ingresa tu nombre:");

    while (!isNaN(nombre) || nombre === ""){
        alert("Error, por favor, ingrese un nombre válido (solo letras)");
        nombre = prompt("Ingresa tu nombre:");
    }
    alert("Hola " +  nombre + ", bienvenid@ a nuestra tienda online de moda :)")
}

pedirNombre();


//Productos
let ropa = ["remera","pantalon","buzo"];

const precios = {
    remera: 15000,
    pantalon: 30000,
    buzo: 40000
};

let carrito = [];
let total = 0;

function mostrarProductos(){
    alert("Productos disponibles:\n- " + ropa. join("\n- "));
}


//Compra
function iniciarCompra() {

    let continuar = confirm("¿Queres ver los productos disponibles?");

    
if (!continuar) {
    alert("Gracias por visitarnos.")
    return;
}

while (continuar){
    mostrarProductos();
    let productoElegido = prompt ("Escribí el nombre del producto que queres comprar:");
        if (precios[productoElegido]) {
            let cantidad = parseInt (prompt ("¿Cuantas unidades querés comprar?"));
            let subtotal = precios[productoElegido] * cantidad;

            carrito.push(productoElegido);
            total += subtotal;
       

            alert("Agregaste " + cantidad + " " + productoElegido + " al carrito");
            console.log("Carrito actual:", carrito); 
    
    }else{
        alert("Producto inválido");
    }
    continuar = confirm("¿Queres seguir comprando?");
}
 alert("el total de tu compra es de: $" + total);
 console.log("Total final", total)
 alert("Gracias por elegirnos ;)")   

}

iniciarCompra();