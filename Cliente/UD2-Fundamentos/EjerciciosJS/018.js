"use strict";
function sumarNumeros() {
    let suma = 0;
    for (var i = 1; i <= 100; i++) {
        suma += i;
    }
    console.log("La suma de los números del 1 al 100 es: " + suma);
}
sumarNumeros()