/*022handlers.html/.js: Hay un botón en la variable. No hay handlers en él.
¿Qué handlers se ejecutan con el click después del siguiente código? ¿Qué alertas se
muestran?
button.addEventListener("click", () => alert("1"));
button.removeEventListener("click", () => alert("1"));
button.onclick = () => alert(2);*/
"use strict"
let button = document.getElementById('button');

button.addEventListener('click', () => alert('1'));
button.removeEventListener('click', () => alert('1'));
button.onclick = () => alert('2');
