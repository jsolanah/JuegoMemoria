let imagenes = [
        'img/fresa.png', 'img/fresa.png',
        'img/cereza.png', 'img/cereza.png',
        'img/tomate.png', 'img/tomate.png',
        'img/frambuesa.png', 'img/frambuesa.png',
        'img/sandia.png', 'img/sandia.png',
        'img/caqui.png', 'img/caqui.png',
        'img/naranja.png', 'img/naranja.png',
        'img/zanahoria.png', 'img/zanahoria.png',
        'img/calabaza.png', 'img/calabaza.png',



        ];

let cartas = [];
let primeraCarta = null;
let segundaCarta = null;
let bloqueoTablero = false;
let cartasAdivinadas = [];
let intentos = 0;

function inicializarJuego() {
    const cartitasContainer = document.getElementById('cartitas');
    cartitasContainer.innerHTML = '';
    cartas = [];
    cartasAdivinadas = [];
    primeraCarta = null;
    segundaCarta = null;
    bloqueoTablero = false;
    intentos = 0;

    document.getElementById('contador').innerText = `Intentos: 0`;
    
// Mezclar imágenes
const imagenesMezcladas = [...imagenes];
imagenesMezcladas.sort(() => Math.random() - 0.5);

// Crear las cartas
imagenesMezcladas.forEach((imagen) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = imagen;

    carta.addEventListener('click', () => manejarClickCarta(carta, imagen));

    cartitasContainer.appendChild(carta);
    cartas.push(carta);
});
}

function manejarClickCarta(carta, imagen) {
if (bloqueoTablero || cartasAdivinadas.includes(carta) || carta === primeraCarta) return;

carta.style.backgroundImage = `url(${imagen})`;
carta.classList.add('flipped');

if (!primeraCarta) {
    primeraCarta = carta;
} else {
    segundaCarta = carta;
    bloqueoTablero = true;

    if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
        cartasAdivinadas.push(primeraCarta, segundaCarta);
        reiniciarSeleccion();
    } else {
        setTimeout(() => {
            primeraCarta.style.backgroundImage = '';
            segundaCarta.style.backgroundImage = '';
            reiniciarSeleccion();
        }, 750);
    }

    intentos++;
    document.getElementById('contador').innerText = `Intentos: ${intentos}`;
}

if (cartasAdivinadas.length === imagenes.length) {
    mostrarModalGanador();
}
}

function reiniciarSeleccion() {
primeraCarta = null;
segundaCarta = null;
bloqueoTablero = false;
}

function mostrarModalGanador() {
const modal = document.getElementById('modal-ganador');
modal.style.display = 'flex';

document.getElementById('boton-modal-reiniciar').addEventListener('click', () => {
    modal.style.display = 'none';
    inicializarJuego();
});
}

// Inicializar el juego al cargar la página
window.onload = () => {
inicializarJuego();
};