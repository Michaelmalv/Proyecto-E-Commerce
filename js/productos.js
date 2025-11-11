/* ===================================
   PÁGINA DE PRODUCTOS
   Chocolates Indemini Baz
   ===================================
   
   Este archivo maneja la funcionalidad específica
   de la página productos.html:
   - Renderizar productos con jQuery
   - Abrir modal con detalles
   - Agregar productos al carrito
   
   USA JQUERY para manipular el DOM
*/

// ===== VARIABLES GLOBALES =====
let productoSeleccionado = null; // Producto actualmente seleccionado en el modal

// ===== INICIALIZACIÓN =====

/**
 * jQuery Document Ready - Se ejecuta al cargar la página
 */
$(document).ready(function() {
    console.log('📦 Página de productos cargada');
    
    // Renderizar todos los productos
    renderizarProductos();
    
    // Configurar event listeners del modal
    configurarModal();
});

// ===== RENDERIZADO DE PRODUCTOS (jQuery) =====

/**
 * Renderiza todas las tarjetas de productos en la página
 * Usa jQuery para crear y agregar elementos al DOM
 */
function renderizarProductos() {
    // Seleccionar el contenedor con jQuery
    const $container = $('#productos-container');
    
    // Limpiar contenedor
    $container.empty();
    
    // Iterar sobre cada producto del array PRODUCTOS (de products-data.js)
    // jQuery.each(): itera sobre arrays u objetos
    $.each(PRODUCTOS, function(index, producto) {
        // Crear la card del producto con jQuery
        const $card = crearCardProducto(producto);
        
        // Agregar la card al contenedor
        $container.append($card);
    });
    
    console.log('✅ Productos renderizados:', PRODUCTOS.length);
}

/**
 * Crea una tarjeta (card) de producto usando jQuery
 * @param {object} producto - Objeto con datos del producto
 * @returns {jQuery} - Elemento jQuery de la card
 */
function crearCardProducto(producto) {
    // Obtener información de stock
    const stock = obtenerStock(producto.stockKey);
    const hayStockDisponible = hayStock(producto.stockKey);
    const stockBajo = esStockBajo(producto.stockKey);
    
    // Crear badge de stock
    let stockBadge = '';
    if (!hayStockDisponible) {
        stockBadge = '<span class="stock-badge badge-no-stock">Agotado</span>';
    } else if (stockBajo) {
        stockBadge = `<span class="stock-badge badge-low-stock">¡Últimas ${stock}!</span>`;
    } else {
        stockBadge = '<span class="stock-badge badge-stock">Disponible</span>';
    }
    
    // Template HTML de la card
    // Usamos template literals (backticks) para interpolar variables
    const cardHTML = `
        <div class="col">
            <div class="card producto-card h-100" data-producto-id="${producto.id}">
                <div class="position-relative">
                    ${stockBadge}
                    <img src="${producto.imagen}" 
                         class="card-img-top" 
                         alt="${producto.nombre}"
                         style="height: 250px; object-fit: cover;">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${producto.nombre}</h5>
                    <p class="card-text text-muted flex-grow-1">
                        ${producto.descripcionCorta}
                    </p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="h4 mb-0 text-danger fw-bold">
                            ${formatearPrecio(producto.precio)}
                        </span>
                        <button class="btn btn-sm btn-outline-danger btn-ver-detalles">
                            👁️ Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Crear elemento jQuery desde el HTML
    const $card = $(cardHTML);
    
    // Agregar event listener al botón "Ver detalles"
    // .find(): busca elementos dentro de la card
    $card.find('.btn-ver-detalles').on('click', function(e) {
        // e.stopPropagation(): evita que el evento se propague al padre
        e.stopPropagation();
        abrirModalProducto(producto);
    });
    
    // También abrir modal al hacer click en toda la card
    $card.on('click', function() {
        abrirModalProducto(producto);
    });
    
    return $card;
}

// ===== MODAL DE PRODUCTO =====

/**
 * Configura los event listeners del modal
 */
function configurarModal() {
    // Botón de incrementar cantidad
    $('#modal-btn-mas').on('click', function() {
        incrementarCantidadModal();
    });
    
    // Botón de decrementar cantidad
    $('#modal-btn-menos').on('click', function() {
        decrementarCantidadModal();
    });
    
    // Botón de agregar al carrito
    $('#modal-btn-agregar').on('click', function() {
        agregarDesdeModal();
    });
    
    // Reset cuando se cierra el modal
    // Bootstrap trigger events: eventos que dispara Bootstrap
    $('#productoModal').on('hidden.bs.modal', function() {
        resetearModal();
    });
}

/**
 * Abre el modal con la información del producto
 * @param {object} producto - Producto a mostrar
 */
function abrirModalProducto(producto) {
    // Guardar producto seleccionado
    productoSeleccionado = producto;
    
    // Obtener información de stock
    const stock = obtenerStock(producto.stockKey);
    const hayStockDisponible = hayStock(producto.stockKey);
    
    // Llenar información del modal con jQuery
    $('#productoModalLabel').text(producto.nombre);
    $('#modal-imagen').attr('src', producto.imagen).attr('alt', producto.nombre);
    $('#modal-precio').text(formatearPrecio(producto.precio));
    $('#modal-descripcion').text(producto.descripcionCompleta);
    
    // Llenar características
    const $caracteristicasList = $('#modal-caracteristicas');
    $caracteristicasList.empty(); // Limpiar lista
    
    // Iterar sobre características
    $.each(producto.caracteristicas, function(index, caracteristica) {
        // Crear elemento <li> y agregarlo
        $caracteristicasList.append(`
            <li class="mb-2">
                <span class="text-danger me-2">✓</span>
                ${caracteristica}
            </li>
        `);
    });
    
    // Mostrar información de stock
    const $stockInfo = $('#modal-stock-info');
    $stockInfo.removeClass('alert-success alert-warning alert-danger');
    
    if (!hayStockDisponible) {
        $stockInfo.addClass('alert-danger');
        $stockInfo.html('❌ <strong>Sin stock</strong> - Producto agotado temporalmente');
        $('#modal-btn-agregar').prop('disabled', true);
    } else if (esStockBajo(producto.stockKey)) {
        $stockInfo.addClass('alert-warning');
        $stockInfo.html(`⚠️ <strong>Stock bajo</strong> - Solo quedan ${stock} unidades`);
        $('#modal-btn-agregar').prop('disabled', false);
    } else {
        $stockInfo.addClass('alert-success');
        $stockInfo.html(`✅ <strong>En stock</strong> - ${stock} unidades disponibles`);
        $('#modal-btn-agregar').prop('disabled', false);
    }
    
    // Resetear cantidad a 1
    $('#modal-cantidad').val(1);
    
    // Abrir modal usando Bootstrap
    const modal = new bootstrap.Modal($('#productoModal')[0]);
    modal.show();
    
    console.log('📖 Modal abierto:', producto.nombre);
}

/**
 * Incrementa la cantidad en el modal
 */
function incrementarCantidadModal() {
    if (!productoSeleccionado) return;
    
    const $input = $('#modal-cantidad');
    const cantidadActual = parseInt($input.val());
    const stock = obtenerStock(productoSeleccionado.stockKey);
    
    // Validar que no exceda el stock
    if (cantidadActual < stock) {
        $input.val(cantidadActual + 1);
    } else {
        // Mostrar notificación de stock máximo
        mostrarNotificacion(`Solo hay ${stock} unidades disponibles`, 'warning');
    }
}

/**
 * Decrementa la cantidad en el modal
 */
function decrementarCantidadModal() {
    const $input = $('#modal-cantidad');
    const cantidadActual = parseInt($input.val());
    
    // Cantidad mínima es 1
    if (cantidadActual > 1) {
        $input.val(cantidadActual - 1);
    }
}

/**
 * Agrega el producto al carrito desde el modal
 */
function agregarDesdeModal() {
    if (!productoSeleccionado) {
        console.error('❌ No hay producto seleccionado');
        return;
    }
    
    // Obtener cantidad del input
    const cantidad = parseInt($('#modal-cantidad').val());
    
    // Intentar agregar al carrito (función de cart.js)
    const agregado = agregarAlCarrito(productoSeleccionado.id, cantidad);
    
    if (agregado) {
        // Mostrar notificación de éxito
        mostrarNotificacion(
            `✓ ${productoSeleccionado.nombre} (x${cantidad}) agregado al carrito`,
            'success'
        );
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance($('#productoModal')[0]);
        modal.hide();
        
        // Opcional: animación del badge del carrito
        $('#cart-badge').addClass('animate__animated animate__heartBeat');
        setTimeout(() => {
            $('#cart-badge').removeClass('animate__animated animate__heartBeat');
        }, 1000);
    } else {
        // Mostrar notificación de error
        mostrarNotificacion(
            'No se pudo agregar el producto. Verifica el stock disponible.',
            'error'
        );
    }
}

/**
 * Resetea el modal a su estado inicial
 */
function resetearModal() {
    productoSeleccionado = null;
    $('#modal-cantidad').val(1);
}

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS IMPORTANTES:

1. RENDERIZADO DINÁMICO:
   - Crear elementos HTML con JavaScript/jQuery
   - Template literals con backticks: `texto ${variable}`
   - .append(): agregar elementos al DOM

2. EVENT LISTENERS en elementos dinámicos:
   - Se agregan DESPUÉS de crear el elemento
   - .on('click', function): escucha eventos
   - e.stopPropagation(): evita propagación del evento

3. BOOTSTRAP MODAL:
   - new bootstrap.Modal(elemento): crear instancia
   - .show(): mostrar modal
   - .hide(): ocultar modal
   - 'hidden.bs.modal': evento cuando se cierra

4. INTERPOLACIÓN DE DATOS:
   - ${variable}: inserta valor de variable en string
   - Funciona solo con backticks (`)
   - No con comillas simples (') o dobles (")

5. VALIDACIONES:
   - Verificar stock antes de agregar
   - Limitar cantidad según disponibilidad
   - Deshabilitar botones cuando no hay stock

6. COMUNICACIÓN ENTRE ARCHIVOS:
   - products-data.js: provee PRODUCTOS y funciones
   - cart.js: provee agregarAlCarrito()
   - Las funciones globales están disponibles en todos los archivos

FLUJO DEL CÓDIGO:
1. Página carga → $(document).ready()
2. renderizarProductos() crea las cards
3. Click en card → abrirModalProducto()
4. Ajustar cantidad con botones +/-
5. Click "Agregar" → agregarDesdeModal()
6. Actualiza carrito y muestra notificación
*/
