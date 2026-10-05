const paginas = document.querySelectorAll(".pagina");
const botonesNavegacion = document.querySelectorAll("[data-seccion]");
const botonAnterior = document.getElementById("botonAnterior");
const botonSiguiente = document.getElementById("botonSiguiente");
const botonMenu = document.getElementById("botonMenu");
const navegacion = document.getElementById("navegacion");
const numeroActual = document.getElementById("numeroActual");
const barra = document.getElementById("barra");
const botonFinal = document.getElementById("botonFinal");
const mensajeFinal = document.getElementById("mensajeFinal");

let paginaActual = 0;

function mostrarPagina(indice) {
    if (indice < 0) {
        indice = 0;
    }

    if (indice >= paginas.length) {
        indice = paginas.length - 1;
    }

    paginas.forEach((pagina) => {
        pagina.classList.remove("activa");
    });

    paginas[indice].classList.add("activa");

    paginaActual = indice;

    actualizarProgreso();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    navegacion.classList.remove("abierto");
}

function actualizarProgreso() {
    const numero = String(paginaActual + 1).padStart(2, "0");

    numeroActual.textContent = numero;

    const porcentaje = ((paginaActual + 1) / paginas.length) * 100;

    barra.style.width = `${porcentaje}%`;

    botonAnterior.style.opacity = paginaActual === 0 ? "0.35" : "1";

    botonSiguiente.style.opacity =
        paginaActual === paginas.length - 1 ? "0.35" : "1";
}

botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", () => {
        const nombreSeccion = boton.dataset.seccion;

        const indice = Array.from(paginas).findIndex(
            (pagina) => pagina.id === nombreSeccion
        );

        if (indice !== -1) {
            mostrarPagina(indice);
        }
    });
});

document.querySelectorAll("[data-siguiente]").forEach((boton) => {
    boton.addEventListener("click", () => {
        const nombreSeccion = boton.dataset.siguiente;

        const indice = Array.from(paginas).findIndex(
            (pagina) => pagina.id === nombreSeccion
        );

        if (indice !== -1) {
            mostrarPagina(indice);
        }
    });
});

botonAnterior.addEventListener("click", () => {
    mostrarPagina(paginaActual - 1);
});

botonSiguiente.addEventListener("click", () => {
    mostrarPagina(paginaActual + 1);
});

botonMenu.addEventListener("click", () => {
    navegacion.classList.toggle("abierto");
});

botonFinal.addEventListener("click", () => {
    mensajeFinal.classList.add("visible");

    for (let i = 0; i < 18; i++) {
        crearCorazon();
    }
});

function crearCorazon() {
    const corazon = document.createElement("div");

    corazon.classList.add("corazon");

    corazon.textContent = "♡";

    corazon.style.left = `${Math.random() * 100}%`;

    corazon.style.fontSize = `${15 + Math.random() * 25}px`;

    corazon.style.animationDuration = `${3 + Math.random() * 3}s`;

    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 6000);
}

const elementos = document.querySelectorAll(
    ".bloque-historia, .tarjeta, .recuerdo, .foto-album, .contenido-profundo"
);

elementos.forEach((elemento) => {
    elemento.classList.add("elemento-aparecer");
});

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elementos.forEach((elemento) => {
    observador.observe(elemento);
});

actualizarProgreso();