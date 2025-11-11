/* ===================================
   PÁGINA DEL CARRITO
   Chocolates Indemini Baz
   ===================================
   
   Este archivo maneja la página carrito.html:
   - Renderizar productos del carrito
   - Eliminar productos
   - Actualizar cantidades
   - Calcular totales y mostrar resumen
   - Finalizar compra
   
   USA JQUERY para manipular DOM
   USA JavaScript puro para cálculos (de cart.js)
*/

// ===== INICIALIZACIÓN =====

$(document).ready(function() {
    console.log('🛒 Página del carrito cargada');
    
    // Renderizar el carrito
    renderizarCarrito();
    
    // Configurar event listeners
    configurarEventListeners();
    
    // Actualizar resumen
    actualizarResumen();
});

// ===== CONFIGURACIÓN DE EVENT LISTENERS =====

/**
 * Configura todos los event listeners de la página
 */
function configurarEventListeners() {
    // Botón para vaciar carrito
    $('#btn-vaciar-carrito').on('click', function() {
        mostrarConfirmacionVaciar();
    });
    
    // Botón para finalizar compra
    $('#btn-finalizar-compra').on('click', function() {
        finalizarCompra();
    });
    
    // Botón para aplicar descuento (funcionalidad extra)
    $('#btn-aplicar-descuento').on('click', function() {
        aplicarCodigoDescuento();
    });
}

// ===== RENDERIZADO DEL CARRITO (jQuery) =====

/**
 * Renderiza todos los productos del carrito
 * Muestra diferentes vistas para desktop y móvil
 */
function renderizarCarrito() {
    // Obtener carrito actual (función de cart.js)
    const carrito = obtenerCarrito();
    
    console.log('📋 Renderizando carrito:', carrito.length, 'productos');
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        mostrarCarritoVacio();
        return;
    }
    
    // Si hay productos, mostrar carrito con productos
    mostrarCarritoConProductos();
    
    // Renderizar en tabla (desktop)
    renderizarTabla(carrito);
    
    // Renderizar en cards (móvil)
    renderizarCardsMobile(carrito);
    
    // Actualizar badge de cantidad total
    $('#total-items-badge').text(carrito.length);
}

/**
 * Muestra la vista de carrito vacío
 */
function mostrarCarritoVacio() {
    // Mostrar sección de carrito vacío
    $('#carrito-vacio').removeClass('d-none');
    // Ocultar sección de carrito con productos
    $('#carrito-con-productos').addClass('d-none');
    
    // Limpiar resumen
    actualizarResumen();
}

/**
 * Muestra la vista de carrito con productos
 */
function mostrarCarritoConProductos() {
    // Ocultar sección de carrito vacío
    $('#carrito-vacio').addClass('d-none');
    // Mostrar sección de carrito con productos
    $('#carrito-con-productos').removeClass('d-none');
}

/**
 * Renderiza los productos en la tabla (vista desktop)
 * @param {Array} carrito - Array de productos en el carrito
 */
function renderizarTabla(carrito) {
    const $tbody = $('#carrito-items-table');
    
    // Limpiar tabla
    $tbody.empty();
    
    // Iterar sobre cada producto
    $.each(carrito, function(index, item) {
        // Calcular subtotal del producto
        const subtotalProducto = item.precio * item.cantidad;
        
        // Crear fila de la tabla
        const $row = $(`
            <tr class="carrito-item-row" data-producto-id="${item.id}">
                <td class="px-4">
                    <div class="d-flex align-items-center">
                        <img src="${item.imagen}" 
                             alt="${item.nombre}" 
                             class="carrito-item-img me-3">
                        <div>
                            <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                            <small class="text-muted">SKU: ${item.id.toUpperCase()}</small>
                        </div>
                    </div>
                </td>
                <td class="text-center align-middle">
                    <strong>${formatearMoneda(item.precio)}</strong>
                </td>
                <td class="text-center align-middle">
                    <div class="input-group input-group-sm" style="max-width: 130px; margin: 0 auto;">
                        <button class="btn btn-outline-secondary btn-decrementar" type="button">
                            ➖
                        </button>
                        <input type="number" 
                               class="form-control text-center input-cantidad" 
                               value="${item.cantidad}" 
                               min="1" 
                               max="${obtenerStock(item.stockKey)}"
                               readonly>
                        <button class="btn btn-outline-secondary btn-incrementar" type="button">
                            ➕
                        </button>
                    </div>
                </td>
                <td class="text-end align-middle">
                    <strong class="text-danger">${formatearMoneda(subtotalProducto)}</strong>
                </td>
                <td class="text-center align-middle">
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" title="Eliminar producto">
                        🗑️
                    </button>
                </td>
            </tr>
        `);
        
        // Agregar event listeners a los botones de la fila
        configurarEventosFila($row, item);
        
        // Agregar fila a la tabla
        $tbody.append($row);
    });
}

/**
 * Renderiza los productos en cards (vista móvil)
 * @param {Array} carrito - Array de productos en el carrito
 */
function renderizarCardsMobile(carrito) {
    const $container = $('#carrito-items-mobile');
    
    // Limpiar contenedor
    $container.empty();
    
    // Iterar sobre cada producto
    $.each(carrito, function(index, item) {
        // Calcular subtotal del producto
        const subtotalProducto = item.precio * item.cantidad;
        
        // Crear card del producto
        const $card = $(`
            <div class="carrito-item-card" data-producto-id="${item.id}">
                <div class="row g-3">
                    <div class="col-4">
                        <img src="${item.imagen}" 
                             alt="${item.nombre}" 
                             class="img-fluid rounded"
                             style="height: 100px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="col-8">
                        <h6 class="fw-bold mb-2">${item.nombre}</h6>
                        <p class="text-muted small mb-2">Precio: ${formatearMoneda(item.precio)}</p>
                        
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="input-group input-group-sm" style="max-width: 110px;">
                                <button class="btn btn-outline-secondary btn-decrementar" type="button">
                                    ➖
                                </button>
                                <input type="number" 
                                       class="form-control text-center input-cantidad" 
                                       value="${item.cantidad}" 
                                       min="1" 
                                       readonly>
                                <button class="btn btn-outline-secondary btn-incrementar" type="button">
                                    ➕
                                </button>
                            </div>
                            
                            <button class="btn btn-sm btn-outline-danger btn-eliminar">
                                🗑️
                            </button>
                        </div>
                        
                        <div class="text-end mt-2">
                            <strong class="text-danger">Subtotal: ${formatearMoneda(subtotalProducto)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        // Agregar event listeners
        configurarEventosFila($card, item);
        
        // Agregar card al contenedor
        $container.append($card);
    });
}

/**
 * Configura los event listeners de una fila/card del carrito
 * @param {jQuery} $elemento - Elemento jQuery (fila o card)
 * @param {object} item - Producto del carrito
 */
function configurarEventosFila($elemento, item) {
    // Botón incrementar
    $elemento.find('.btn-incrementar').on('click', function() {
        incrementarCantidad(item.id);
    });
    
    // Botón decrementar
    $elemento.find('.btn-decrementar').on('click', function() {
        decrementarCantidad(item.id);
    });
    
    // Botón eliminar
    $elemento.find('.btn-eliminar').on('click', function() {
        eliminarProducto(item.id);
    });
}

// ===== FUNCIONES DE MANIPULACIÓN DE CANTIDAD =====

/**
 * Incrementa la cantidad de un producto
 * @param {string} productoId - ID del producto
 */
function incrementarCantidad(productoId) {
    // Obtener el producto del carrito
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === productoId);
    
    if (!item) return;
    
    // Verificar stock disponible
    const stockDisponible = obtenerStock(item.stockKey);
    
    if (item.cantidad >= stockDisponible) {
        mostrarNotificacion(
            `Solo hay ${stockDisponible} unidades disponibles`,
            'warning'
        );
        return;
    }
    
    // Incrementar cantidad (función de cart.js)
    const actualizado = actualizarCantidad(productoId, item.cantidad + 1);
    
    if (actualizado) {
        // Re-renderizar carrito
        renderizarCarrito();
        actualizarResumen();
    }
}

/**
 * Decrementa la cantidad de un producto
 * @param {string} productoId - ID del producto
 */
function decrementarCantidad(productoId) {
    // Obtener el producto del carrito
    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === productoId);
    
    if (!item) return;
    
    // Si la cantidad es 1, preguntar si desea eliminar
    if (item.cantidad === 1) {
        eliminarProducto(productoId);
        return;
    }
    
    // Decrementar cantidad
    const actualizado = actualizarCantidad(productoId, item.cantidad - 1);
    
    if (actualizado) {
        // Re-renderizar carrito
        renderizarCarrito();
        actualizarResumen();
    }
}

/**
 * Elimina un producto del carrito
 * @param {string} productoId - ID del producto
 */
function eliminarProducto(productoId) {
    // Obtener información del producto
    const producto = obtenerProductoPorId(productoId);
    
    if (!producto) return;
    
    // Confirmación con SweetAlert2 o confirm nativo
    if (confirm(`¿Deseas eliminar "${producto.nombre}" del carrito?`)) {
        // Eliminar del carrito (función de cart.js)
        eliminarDelCarrito(productoId);
        
        // Mostrar notificación
        mostrarNotificacion(
            `${producto.nombre} eliminado del carrito`,
            'success'
        );
        
        // Re-renderizar carrito
        renderizarCarrito();
        actualizarResumen();
    }
}

/**
 * Muestra confirmación antes de vaciar el carrito
 */
function mostrarConfirmacionVaciar() {
    if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
        // Vaciar carrito (función de cart.js)
        vaciarCarrito();
        
        mostrarNotificacion('Carrito vaciado correctamente', 'success');
        
        // Re-renderizar
        renderizarCarrito();
        actualizarResumen();
    }
}

// ===== RESUMEN Y TOTALES =====

/**
 * Actualiza el resumen del pedido con los totales
 */
function actualizarResumen() {
    // Calcular totales (funciones de cart.js)
    const subtotal = calcularSubtotal();
    const iva = calcularIVA();
    const total = calcularTotal();
    
    // Actualizar en la interfaz con jQuery
    $('#resumen-subtotal').text(formatearMoneda(subtotal));
    $('#resumen-iva').text(formatearMoneda(iva));
    $('#resumen-total').text(formatearMoneda(total));
    
    console.log('💰 Resumen actualizado:', {
        subtotal: formatearMoneda(subtotal),
        iva: formatearMoneda(iva),
        total: formatearMoneda(total)
    });
}

// ===== CÓDIGO DE DESCUENTO =====

/**
 * Aplica un código de descuento (funcionalidad extra)
 * Esta es una implementación simple de ejemplo
 */
function aplicarCodigoDescuento() {
    const codigo = $('#codigo-descuento').val().toUpperCase().trim();
    
    // Códigos válidos (ejemplo)
    const codigosValidos = {
        'CHOCO10': 0.10,  // 10% descuento
        'CHOCO20': 0.20,  // 20% descuento
        'PROMO50': 0.50   // 50% descuento (wow!)
    };
    
    if (codigo === '') {
        alert('Por favor, ingresa un código de descuento');
        return;
    }
    
    // Verificar si el código es válido
    if (codigosValidos[codigo]) {
        const descuento = codigosValidos[codigo];
        
        // Mostrar mensaje de éxito
        $('#mensaje-descuento').removeClass('d-none');
        $('#mensaje-descuento').html(`
            <small>
                ✅ 
                ¡Descuento del ${descuento * 100}% aplicado!
            </small>
        `);
        
        // En una app real, aquí aplicarías el descuento al total
        // Por simplicidad, solo mostramos el mensaje
        
        mostrarNotificacion(`Descuento del ${descuento * 100}% aplicado`, 'success');
        
        console.log('🎉 Código válido:', codigo, '- Descuento:', descuento);
    } else {
        // Código inválido
        $('#mensaje-descuento').removeClass('d-none alert-success').addClass('alert-danger');
        $('#mensaje-descuento').html(`
            <small>
                ❌ 
                Código inválido o expirado
            </small>
        `);
        
        mostrarNotificacion('Código de descuento inválido', 'error');
    }
}

// ===== FINALIZAR COMPRA =====

/**
 * Finaliza la compra y muestra confirmación
 */
function finalizarCompra() {
    const carrito = obtenerCarrito();
    
    // Verificar que haya productos
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Generar número de pedido aleatorio
    const numeroPedido = generarCodigoAleatorio(8);
    
    // Guardar información del pedido
    const pedido = {
        numero: numeroPedido,
        fecha: obtenerFechaActual(),
        productos: carrito,
        subtotal: calcularSubtotal(),
        iva: calcularIVA(),
        total: calcularTotal()
    };
    
    console.log('📦 Pedido generado:', pedido);
    
    // Mostrar número de pedido en el modal
    $('#numero-pedido').text(numeroPedido);
    
    // Abrir modal de confirmación
    const modal = new bootstrap.Modal($('#modalConfirmacion')[0]);
    modal.show();
    
    // Vaciar carrito después de confirmar
    vaciarCarrito();
    
    // Cuando se cierre el modal, recargar la página
    $('#modalConfirmacion').on('hidden.bs.modal', function() {
        // Recargar para mostrar carrito vacío
        location.reload();
    });
}

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS IMPORTANTES DE ESTA PÁGINA:

1. RENDERIZADO CONDICIONAL:
   - Mostrar/ocultar elementos según condiciones
   - .addClass('d-none'), .removeClass('d-none')
   - Diferente contenido para móvil vs desktop

2. MANIPULACIÓN DE ARRAYS:
   - .find(): busca un elemento
   - .filter(): filtra elementos
   - .map(): transforma elementos
   - Todas retornan nuevo array (no modifican el original)

3. RESPONSIVE DESIGN:
   - d-none d-md-block: oculto en móvil, visible en tablet+
   - d-block d-md-none: visible en móvil, oculto en tablet+
   - Bootstrap breakpoints: sm, md, lg, xl, xxl

4. EVENT DELEGATION:
   - Agregar listeners a elementos dinámicos
   - Los listeners se agregan después de crear el elemento

5. CÁLCULOS MATEMÁTICOS:
   - Subtotal = suma de (precio × cantidad)
   - IVA = subtotal × 0.15
   - Total = subtotal + IVA
   - Usar .toFixed(2) para 2 decimales

6. CONFIRMACIONES:
   - confirm(): diálogo nativo del navegador
   - Retorna true si OK, false si Cancel
   - Para apps avanzadas: usar SweetAlert2

7. PERSISTENCIA:
   - localStorage: guarda entre sesiones
   - sessionStorage: solo en la sesión actual
   - Limpiar al finalizar compra

8. GENERACIÓN DE CÓDIGOS:
   - Math.random(): número aleatorio 0-1
   - .charAt(): obtiene carácter en posición
   - .toUpperCase(): convierte a mayúsculas

FLUJO DE LA PÁGINA:
1. Cargar → renderizarCarrito()
2. Usuario cambia cantidad → actualizarCantidad()
3. Re-renderizar carrito
4. Actualizar resumen
5. Usuario finaliza → vaciarCarrito()
6. Mostrar confirmación

MEJORAS POSIBLES:
- Integrar con API real
- Agregar animaciones smooth
- Guardar pedidos en base de datos
- Enviar email de confirmación
- Múltiples métodos de pago
- Calcular envío según ubicación
*/
