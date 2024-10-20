/* Variable */
let carrito = [];

/* Funciones */

function agregarCurso(event) {
    event.preventDefault();

    const curso = event.target.parentElement.parentElement;
    const cursoInfo = {
        id: event.target.getAttribute('data-id'),
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        imagen: curso.querySelector('img').src,
        cantidad: 1
    };

    const existe = carrito.some(item => item.id === cursoInfo.id);
    if (existe) {
        carrito = carrito.map(item => {
            if (item.id === cursoInfo.id) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        carrito.push(cursoInfo);
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const tbody = document.querySelector('#lista-carrito tbody');
    tbody.innerHTML = ''; 

    carrito.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.imagen}" width="50"></td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${item.id}">X</a></td>
        `;
        tbody.appendChild(row);
    });

    actualizarEventosBorrar();
}


function borrarCurso(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    carrito = carrito.filter(item => item.id !== id); 
    mostrarCarrito(); 
}

function vaciarCarrito() {
    carrito = []; 
    mostrarCarrito();
}

function actualizarEventosBorrar() {
    const botonesBorrar = document.querySelectorAll('.borrar-curso');
    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', borrarCurso);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const agregarBotones = document.querySelectorAll('.agregar-carrito');
    agregarBotones.forEach(boton => {
        boton.addEventListener('click', agregarCurso);
    });

    const botonVaciar = document.querySelector('#vaciar-carrito');
    botonVaciar.addEventListener('click', vaciarCarrito);
});