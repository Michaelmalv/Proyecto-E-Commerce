/* ===================================
   DATOS DE PRODUCTOS
   Chocolates Indemini Baz
   ===================================
   
   Este archivo contiene SOLO DATOS (JavaScript puro).
   No tiene jQuery, solo declaraciones de variables.
   
   Aquí definimos:
   - Array de productos con toda su información
   - Stock disponible de cada producto
*/

// ===== ARRAY DE PRODUCTOS =====
// Array: lista ordenada de elementos (en este caso, objetos de productos)
// const: declara una variable constante (no se puede reasignar)

const PRODUCTOS = [
    {
        // Cada producto es un objeto con propiedades (key: value)
        id: 'trufas', // Identificador único del producto
        nombre: 'Trufas Artesanales',
        precio: 1.00, // Precio en dólares (número, no string)
        imagen: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400',
        // Descripción corta para las tarjetas de productos
        descripcionCorta: 'Deliciosas trufas de chocolate con rellenos únicos',
        // Descripción completa para el modal de detalles
        descripcionCompleta: 'Nuestras trufas artesanales son elaboradas a mano con chocolate belga de la más alta calidad. Cada trufa es una pequeña obra de arte con rellenos de ganache casero y sabores únicos que deleitarán tu paladar. Perfectas para un regalo especial o para darte un gusto.',
        // Array de características (lista de strings)
        caracteristicas: [
            'Chocolate belga 70% cacao',
            'Rellenos de ganache casero',
            'Sin conservantes artificiales',
            'Presentación individual',
            'Peso: 25g por unidad'
        ],
        stockKey: 'trufas' // Llave para buscar el stock en STOCK_PRODUCTOS
    },
    {
        id: 'tabletas',
        nombre: 'Tabletas Premium',
        precio: 6.00,
        imagen: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
        descripcionCorta: 'Tabletas de chocolate negro desde 60% hasta 100% cacao',
        descripcionCompleta: 'Tabletas de chocolate negro premium elaboradas con granos de cacao ecuatoriano seleccionados. Disponibles en diferentes porcentajes de cacao para satisfacer todos los gustos, desde los más dulces hasta los más intensos. El verdadero sabor del cacao fino de aroma.',
        caracteristicas: [
            'Cacao ecuatoriano orgánico',
            'Opciones: 60%, 75%, 85%, 100%',
            'Libre de gluten y lactosa',
            'Peso: 100g por tableta',
            'Certificación Fair Trade'
        ],
        stockKey: 'tabletas'
    },
    {
        id: 'bombones',
        nombre: 'Bombones Surtidos',
        precio: 15.99,
        imagen: 'https://images.unsplash.com/photo-1606312619070-d48b4ccc6f24?w=400',
        descripcionCorta: 'Caja de 12 bombones con variedades de sabores exquisitos',
        descripcionCompleta: 'Una selección premium de 12 bombones artesanales con diferentes rellenos y coberturas. Cada caja incluye una variedad cuidadosamente seleccionada de sabores: caramelo salado, café, frutos rojos, avellana y más. Presentación elegante ideal para regalo.',
        caracteristicas: [
            '12 bombones de sabores variados',
            'Incluye: caramelo, café, frutos rojos, avellana',
            'Empaque elegante para regalo',
            'Chocolates con y sin licor',
            'Peso total: 240g'
        ],
        stockKey: 'bombones'
    },
    {
        id: 'regalo',
        nombre: 'Caja Regalo',
        precio: 11.99,
        imagen: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400',
        descripcionCorta: 'Elegante caja con selección de nuestros mejores chocolates',
        descripcionCompleta: 'La caja regalo perfecta para cualquier ocasión especial. Incluye una cuidadosa selección de nuestros chocolates más populares en un empaque decorativo reutilizable. Viene con tarjeta de dedicatoria para personalizar tu regalo. Sorprende a esa persona especial.',
        caracteristicas: [
            'Surtido de 6 trufas + 6 bombones',
            '2 mini tabletas de chocolate negro',
            'Caja decorativa reutilizable',
            'Incluye tarjeta de dedicatoria',
            'Peso total: 300g'
        ],
        stockKey: 'regalo'
    }
];

// ===== STOCK DE PRODUCTOS =====
// Objeto: estructura de datos con pares clave-valor
// Cada clave (key) es el ID del producto
// Cada valor (value) es la cantidad disponible en stock

const STOCK_PRODUCTOS = {
    trufas: 152,    // 152 unidades disponibles
    tabletas: 5,    // Solo 5 unidades (casi agotado)
    bombones: 0,    // Sin stock
    regalo: 8       // 8 unidades disponibles
};

// ===== FUNCIONES AUXILIARES PARA PRODUCTOS =====

/**
 * Obtiene un producto por su ID
 * @param {string} id - ID del producto a buscar
 * @returns {object|null} - Objeto del producto o null si no se encuentra
 */
function obtenerProductoPorId(id) {
    // find() busca el primer elemento que cumple la condición
    // producto => producto.id === id es una arrow function
    // Retorna el producto cuyo id coincide con el parámetro
    return PRODUCTOS.find(producto => producto.id === id) || null;
}

/**
 * Obtiene el stock disponible de un producto
 * @param {string} stockKey - Clave del stock del producto
 * @returns {number} - Cantidad disponible (0 si no existe)
 */
function obtenerStock(stockKey) {
    // Retorna el stock del producto o 0 si no existe
    return STOCK_PRODUCTOS[stockKey] || 0;
}

/**
 * Verifica si hay stock disponible de un producto
 * @param {string} stockKey - Clave del stock del producto
 * @returns {boolean} - true si hay stock, false si no
 */
function hayStock(stockKey) {
    return obtenerStock(stockKey) > 0;
}

/**
 * Verifica si el stock es bajo (5 unidades o menos)
 * @param {string} stockKey - Clave del stock del producto
 * @returns {boolean} - true si el stock es bajo, false si no
 */
function esStockBajo(stockKey) {
    const stock = obtenerStock(stockKey);
    return stock > 0 && stock <= 5;
}

/**
 * Formatea un precio a formato de moneda
 * @param {number} precio - Precio a formatear
 * @returns {string} - Precio formateado (ej: "$12.99")
 */
function formatearPrecio(precio) {
    // toFixed(2) redondea a 2 decimales
    return `$${precio.toFixed(2)}`;
}

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS CLAVE:

1. ARRAYS (Arreglos):
   - Lista ordenada de elementos
   - Se declaran con corchetes []
   - Cada elemento tiene un índice (posición)
   - Ejemplo: const frutas = ['manzana', 'pera', 'uva'];

2. OBJETOS:
   - Estructura de datos con propiedades
   - Se declaran con llaves {}
   - Formato: propiedad: valor
   - Ejemplo: const persona = { nombre: 'Juan', edad: 25 };

3. CONST vs LET vs VAR:
   - const: no se puede reasignar (usar por defecto)
   - let: se puede reasignar
   - var: antigua forma (no usar)

4. ARROW FUNCTIONS (=>):
   - Forma corta de escribir funciones
   - Ejemplo: const suma = (a, b) => a + b;
   
5. MÉTODOS DE ARRAY:
   - find(): busca un elemento que cumple una condición
   - filter(): filtra elementos que cumplen una condición
   - map(): transforma cada elemento del array

Este archivo es SOLO para datos. La lógica de la aplicación
va en otros archivos JavaScript.
*/
