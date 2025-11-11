/* ===================================
   FUNCIONES DEL CARRITO DE COMPRAS
   Chocolates Indemini Baz
   ===================================
   
   Este archivo maneja toda la lógica del carrito:
   - Agregar productos
   - Eliminar productos
   - Actualizar cantidades
   - Calcular totales (JavaScript puro)
   - Actualizar la interfaz (jQuery)
   
   NOTA: Los cálculos se hacen con JavaScript puro,
   la manipulación del DOM se hace con jQuery.
*/

// ===== VARIABLE GLOBAL DEL CARRITO =====
// Array que almacena los productos en el carrito
// Se guarda en localStorage para persistencia entre páginas
let carritoProductos = [];

// ===== INICIALIZACIÓN DEL CARRITO =====

/**
 * Inicializa el carrito cargando datos de localStorage
 * Se ejecuta automáticamente al cargar el script
 */
function inicializarCarrito() {
    // localStorage: almacenamiento del navegador que persiste entre sesiones
    // getItem(): obtiene un valor del localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    
    // Si existe un carrito guardado
    if (carritoGuardado) {
        try {
            // JSON.parse(): convierte string JSON a objeto JavaScript
            carritoProductos = JSON.parse(carritoGuardado);
            console.log('✅ Carrito cargado desde localStorage:', carritoProductos);
        } catch (error) {
            // Si hay error al parsear, inicializar carrito vacío
            console.error('❌ Error al cargar carrito:', error);
            carritoProductos = [];
        }
    }
    
    // Actualizar el badge del carrito en todas las páginas
    actualizarBadgeCarrito();
}

// ===== FUNCIONES DE CÁLCULO (JavaScript Puro) =====

/**
 * Calcula el número total de productos en el carrito
 * @returns {number} - Total de productos
 */
function calcularTotalProductos() {
    // reduce(): método que acumula valores
    // sum: acumulador (comienza en 0)
    // item: cada elemento del array
    return carritoProductos.reduce((sum, item) => sum + item.cantidad, 0);
}

/**
 * Calcula el subtotal del carrito (suma de todos los productos)
 * @returns {number} - Subtotal en dólares
 */
function calcularSubtotal() {
    // Para cada producto: precio × cantidad
    // Luego sumar todos los totales
    return carritoProductos.reduce((sum, item) => {
        return sum + (item.precio * item.cantidad);
    }, 0);
}

/**
 * Calcula el IVA (15% del subtotal)
 * @returns {number} - IVA en dólares
 */
function calcularIVA() {
    const subtotal = calcularSubtotal();
    return subtotal * 0.15; // 15% de IVA
}

/**
 * Calcula el total del carrito (subtotal + IVA)
 * @returns {number} - Total en dólares
 */
function calcularTotal() {
    const subtotal = calcularSubtotal();
    const iva = calcularIVA();
    return subtotal + iva;
}

// ===== FUNCIONES DE MANIPULACIÓN DEL CARRITO =====

/**
 * Agrega un producto al carrito o actualiza la cantidad si ya existe
 * @param {string} productoId - ID del producto
 * @param {number} cantidad - Cantidad a agregar
 * @returns {boolean} - true si se agregó correctamente, false si no
 */
function agregarAlCarrito(productoId, cantidad = 1) {
    // Obtener información del producto desde products-data.js
    const producto = obtenerProductoPorId(productoId);
    
    // Validación: verificar que el producto existe
    if (!producto) {
        console.error('❌ Producto no encontrado:', productoId);
        return false;
    }
    
    // Validación: verificar que hay stock suficiente
    const stockDisponible = obtenerStock(producto.stockKey);
    if (cantidad > stockDisponible) {
        console.warn('⚠️ Stock insuficiente. Disponible:', stockDisponible);
        return false;
    }
    
    // Buscar si el producto ya existe en el carrito
    // findIndex(): retorna el índice del elemento o -1 si no existe
    const indiceExistente = carritoProductos.findIndex(item => item.id === productoId);
    
    if (indiceExistente !== -1) {
        // Si existe, actualizar la cantidad
        const nuevaCantidad = carritoProductos[indiceExistente].cantidad + cantidad;
        
        // Verificar que no exceda el stock
        if (nuevaCantidad > stockDisponible) {
            console.warn('⚠️ No puedes agregar más, stock insuficiente');
            return false;
        }
        
        carritoProductos[indiceExistente].cantidad = nuevaCantidad;
        console.log('🔄 Cantidad actualizada:', producto.nombre);
    } else {
        // Si no existe, agregar nuevo producto
        carritoProductos.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            stockKey: producto.stockKey
        });
        console.log('✅ Producto agregado:', producto.nombre);
    }
    
    // Guardar en localStorage y actualizar interfaz
    guardarCarrito();
    actualizarBadgeCarrito();
    
    return true;
}

/**
 * Elimina un producto del carrito
 * @param {string} productoId - ID del producto a eliminar
 */
function eliminarDelCarrito(productoId) {
    // filter(): crea un nuevo array con los elementos que cumplen la condición
    // En este caso, todos excepto el que queremos eliminar
    const productoEliminado = carritoProductos.find(item => item.id === productoId);
    
    carritoProductos = carritoProductos.filter(item => item.id !== productoId);
    
    console.log('🗑️ Producto eliminado:', productoEliminado?.nombre);
    
    // Guardar y actualizar
    guardarCarrito();
    actualizarBadgeCarrito();
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {string} productoId - ID del producto
 * @param {number} nuevaCantidad - Nueva cantidad (debe ser >= 1)
 * @returns {boolean} - true si se actualizó correctamente
 */
function actualizarCantidad(productoId, nuevaCantidad) {
    // Validación: cantidad mínima es 1
    if (nuevaCantidad < 1) {
        console.warn('⚠️ La cantidad debe ser al menos 1');
        return false;
    }
    
    // Buscar el producto en el carrito
    const item = carritoProductos.find(item => item.id === productoId);
    
    if (!item) {
        console.error('❌ Producto no encontrado en el carrito');
        return false;
    }
    
    // Verificar stock disponible
    const stockDisponible = obtenerStock(item.stockKey);
    if (nuevaCantidad > stockDisponible) {
        console.warn('⚠️ Stock insuficiente. Disponible:', stockDisponible);
        return false;
    }
    
    // Actualizar cantidad
    item.cantidad = nuevaCantidad;
    console.log('🔄 Cantidad actualizada:', item.nombre, '→', nuevaCantidad);
    
    // Guardar y actualizar
    guardarCarrito();
    actualizarBadgeCarrito();
    
    return true;
}

/**
 * Vacía completamente el carrito
 */
function vaciarCarrito() {
    carritoProductos = [];
    console.log('🗑️ Carrito vaciado completamente');
    
    guardarCarrito();
    actualizarBadgeCarrito();
}

/**
 * Obtiene el carrito actual
 * @returns {Array} - Array de productos en el carrito
 */
function obtenerCarrito() {
    return [...carritoProductos]; // Retorna una copia del array
}

// ===== PERSISTENCIA (localStorage) =====

/**
 * Guarda el carrito en localStorage
 */
function guardarCarrito() {
    try {
        // JSON.stringify(): convierte objeto JavaScript a string JSON
        localStorage.setItem('carrito', JSON.stringify(carritoProductos));
        console.log('💾 Carrito guardado en localStorage');
    } catch (error) {
        console.error('❌ Error al guardar carrito:', error);
    }
}

// ===== ACTUALIZACIÓN DE INTERFAZ (jQuery) =====

/**
 * Actualiza el badge (número) del carrito en el navbar
 * Usa jQuery para manipular el DOM
 */
function actualizarBadgeCarrito() {
    // jQuery: $() selecciona elementos del DOM
    const $badge = $('#cart-badge');
    const totalProductos = calcularTotalProductos();
    
    // .text(): establece el texto del elemento
    $badge.text(totalProductos);
    
    // Opcional: ocultar badge si está en 0
    if (totalProductos === 0) {
        $badge.addClass('d-none'); // Bootstrap class para ocultar
    } else {
        $badge.removeClass('d-none');
    }
}

/**
 * Muestra una notificación temporal (toast)
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo: 'success', 'error', 'warning'
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Seleccionar elementos del toast con jQuery
    const $toast = $('#producto-toast');
    const $toastMessage = $('#toast-message');
    
    // Cambiar el color según el tipo
    $toast.removeClass('bg-success bg-danger bg-warning');
    
    if (tipo === 'error') {
        $toast.addClass('bg-danger');
    } else if (tipo === 'warning') {
        $toast.addClass('bg-warning');
    } else {
        $toast.addClass('bg-success');
    }
    
    // Establecer el mensaje
    $toastMessage.text(mensaje);
    
    // Mostrar el toast usando Bootstrap
    // Bootstrap proporciona el objeto Toast
    const toast = new bootstrap.Toast($toast[0]);
    toast.show();
}

// ===== INICIALIZACIÓN AUTOMÁTICA =====
// Este código se ejecuta inmediatamente al cargar el archivo
inicializarCarrito();

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS IMPORTANTES:

1. JAVASCRIPT PURO para CÁLCULOS:
   - reduce(), find(), filter(), findIndex()
   - Operaciones matemáticas simples (+, -, *, /)
   - No depende de jQuery

2. JQUERY para INTERFAZ:
   - $('#elemento'): selecciona elementos
   - .text(): cambia el texto
   - .addClass(), .removeClass(): manipula clases CSS
   - .show(), .hide(): muestra/oculta elementos

3. LOCALSTORAGE:
   - Almacenamiento del navegador
   - Persiste entre sesiones
   - Solo guarda strings (por eso usamos JSON)
   
4. JSON:
   - JavaScript Object Notation
   - Formato para intercambiar datos
   - JSON.stringify(): objeto → string
   - JSON.parse(): string → objeto

5. ARROW FUNCTIONS:
   - (param) => expresión
   - Forma corta de escribir funciones
   
6. VALIDACIONES:
   - Siempre validar datos antes de procesarlos
   - Verificar que los productos existan
   - Verificar que haya stock suficiente
   - Verificar cantidades mínimas/máximas

BUENAS PRÁCTICAS:
- Separar lógica de negocio (cálculos) de la interfaz
- Usar console.log() para debug
- Validar todos los inputs
- Comentar el código para futuro
*/
