// Funciones del Carrito de Compras

// Obtener el carrito del localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }

    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        // Si existe, incrementar la cantidad
        itemExistente.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo item
        carrito.push({
            id: idProducto,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();

    // Mostrar notificación
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito(carrito);

    // Si estamos en la página del carrito, renderizar de nuevo
    if (typeof renderizarCarrito === 'function') {
        renderizarCarrito();
    }

    actualizarContadorCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// Vaciar todo el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.setItem('carrito', JSON.stringify([]));

        // Si estamos en la página del carrito, renderizar de nuevo
        if (typeof renderizarCarrito === 'function') {
            renderizarCarrito();
        }

        actualizarContadorCarrito();
        mostrarNotificacion('Carrito vaciado');
    }
}

// Actualizar contador del carrito en el navbar
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    const contadores = document.querySelectorAll('#cartCount');
    contadores.forEach(contador => {
        contador.textContent = totalItems;

        // Agregar animación si el contador cambia
        if (totalItems > 0) {
            contador.classList.add('badge');
            contador.classList.add('bg-danger');
        } else {
            contador.classList.remove('badge');
            contador.classList.remove('bg-danger');
        }
    });
}

// Obtener total del carrito
function obtenerTotalCarrito() {
    const carrito = obtenerCarrito();
    let total = 0;

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            total += producto.precio * item.cantidad;
        }
    });

    return total;
}

// Obtener cantidad de items en el carrito
function obtenerCantidadItems() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    notificacion.style.zIndex = '9999';
    notificacion.style.minWidth = '300px';
    notificacion.innerHTML = `
        <i class="fas fa-check-circle"></i> ${mensaje}
    `;

    document.body.appendChild(notificacion);

    // Animar entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();
});

// Exportar funciones para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        obtenerCarrito,
        guardarCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarContadorCarrito,
        obtenerTotalCarrito,
        obtenerCantidadItems
    };
}