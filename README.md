# Chocolatería Delicia - Sitio Web con jQuery 🍫

## 📋 Descripción
Sitio web completo para una chocolatería con sistema de carrito de compras, desarrollado con **Bootstrap 5**, **jQuery** para manipulación del DOM y **JavaScript vanilla** para cálculos.

## 🏗️ Arquitectura del Proyecto

### Separación de Responsabilidades

Este proyecto sigue una arquitectura clara:

1. **jQuery** → Manipulación del DOM, eventos, animaciones
2. **JavaScript Puro** → Cálculos matemáticos, filtros, lógica de negocio
3. **localStorage** → Persistencia de datos del carrito
4. **Bootstrap 5** → Diseño responsive y componentes UI

## 🗂️ Estructura de Archivos

```
chocolateria-delicia/
│
├── index.html          # Página de inicio
├── productos.html      # Catálogo de productos con filtros
├── contacto.html       # Formulario de contacto
├── carrito.html        # Carrito de compras
├── test-iconos.html    # Página de prueba de iconos
│
└── js/
    ├── calculos.js     # ⚙️  CÁLCULOS (JavaScript puro)
    ├── productos.js    # 📦 DATOS (Array de productos)
    └── carrito.js      # 🎨 DOM (jQuery para interfaz)
```

## 📄 Descripción de Archivos JavaScript

### 1. **calculos.js** - Lógica de Cálculos (JavaScript Puro)
**Responsabilidad**: Solo cálculos matemáticos y lógica de negocio

Funciones principales:
- `calcularPrecioFormateado(precio)` - Formato de precios
- `calcularSubtotal(carrito, productos)` - Suma de productos
- `calcularEnvio(subtotal)` - Costo de envío ($5 o gratis si >$50)
- `calcularIVA(monto)` - 15% de IVA
- `calcularTotal(subtotal, envio, iva)` - Total de la compra
- `calcularResumenCompra(carrito, productos)` - Resumen completo
- `buscarProductoPorId(productos, id)` - Búsqueda de productos
- `filtrarPorCategoria(productos, categoria)` - Filtro por categoría
- `filtrarPorBusqueda(productos, termino)` - Búsqueda por texto
- `ordenarPorNombre(productos)` - Orden alfabético
- `ordenarPorPrecio(productos, ascendente)` - Orden por precio
- `aplicarFiltrosYOrdenamiento()` - Aplicación completa de filtros

**✅ Ventajas**: 
- Funciones puras, reutilizables
- Fácil de testear
- Sin dependencias del DOM
- Lógica centralizada

### 2. **productos.js** - Base de Datos
**Responsabilidad**: Solo contiene el array de productos

```javascript
const productos = [
    {
        id: 1,
        nombre: "Trufas de Chocolate Negro",
        descripcion: "Deliciosas trufas...",
        precio: 12.99,
        categoria: "trufas",
        imagen: "https://..."
    },
    // ... 16 productos en total
];
```

**✅ Ventajas**:
- Datos centralizados
- Fácil de mantener
- Simula una API/base de datos

### 3. **carrito.js** - Manipulación del DOM (jQuery)
**Responsabilidad**: Interfaz de usuario y eventos

Funciones principales:
- `obtenerCarrito()` / `guardarCarrito()` - localStorage
- `agregarAlCarrito(id)` - Agregar productos
- `eliminarDelCarrito(id)` - Eliminar productos
- `vaciarCarrito()` - Vaciar todo el carrito
- `actualizarContadorCarrito()` - Badge del navbar (jQuery)
- `mostrarNotificacion(mensaje)` - Toast notifications (jQuery)
- `renderizarProductos(productos, containerId)` - Renderizar tarjetas (jQuery)
- `renderizarCarrito()` - Renderizar página de carrito (jQuery)
- `actualizarResumen()` - Actualizar totales (jQuery)

**✅ Ventajas**:
- jQuery simplifica la manipulación del DOM
- Event delegation para elementos dinámicos
- Animaciones suaves con fade/slide
- Código más legible

## 🎯 Flujo de Datos

```
┌─────────────┐
│ productos.js│ ──► Array de productos (DATOS)
└─────────────┘
       │
       ▼
┌─────────────┐
│ calculos.js │ ──► Procesa filtros, cálculos (LÓGICA)
└─────────────┘
       │
       ▼
┌─────────────┐
│ carrito.js  │ ──► Renderiza con jQuery (VISTA)
└─────────────┘
       │
       ▼
┌─────────────┐
│ localStorage│ ──► Persiste el carrito (DATOS)
└─────────────┘
```

## ✨ Características Principales

### 1. **Página de Inicio (index.html)**
- Hero section con gradiente
- Sección de características
- Productos destacados (primeros 3)
- **jQuery**: Renderizado dinámico de productos

### 2. **Página de Productos (productos.html)**
- Listado dinámico de 16 productos
- **Filtros con jQuery**:
  - Por categoría (chocolates, bombones, trufas, tabletas)
  - Por precio (ascendente/descendente)
  - Búsqueda por texto
- **Cálculos JavaScript**: Aplicación de filtros
- Event delegation para botones

### 3. **Página de Contacto (contacto.html)**
- Formulario completo con validación HTML5
- **jQuery**: Manejo de formulario y validación
- Animaciones con fadeIn/fadeOut
- Información de contacto

### 4. **Carrito de Compras (carrito.html)**
- Lista de productos con imágenes
- Control de cantidad (+/-)
- **jQuery**: Manipulación completa del DOM
- **JavaScript**: Todos los cálculos
- Resumen con:
  - Subtotal
  - Envío ($5 o GRATIS si > $50)
  - IVA (15%)
  - Total
- Modal de confirmación (Bootstrap + jQuery)

## 🎨 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | - | Estructura semántica |
| **CSS3** | - | Estilos y variables CSS |
| **Bootstrap** | 5.3.0 | Framework responsive |
| **Font Awesome** | 6.4.0 | Iconos con integrity hash |
| **jQuery** | 3.7.1 | Manipulación del DOM |
| **JavaScript** | ES6 | Cálculos y lógica |

## 🔧 Funcionalidades jQuery Implementadas

### Selección y Manipulación
```javascript
$('#productosContainer').empty();           // Limpiar contenedor
$('#subtotal').text(`$${precio}`);          // Actualizar texto
$('.btn-remove').addClass('active');        // Agregar clase
```

### Eventos
```javascript
$('#categoryFilter').on('change', aplicarFiltros);     // Event listener
$('#productosContainer').on('click', '.btn', fn);      // Event delegation
```

### Animaciones
```javascript
$('#mensajeExito').fadeIn();                // Aparecer suave
$('#notificacion').fadeOut();               // Desaparecer suave
```

### Efectos
```javascript
$('#cartCount').each(function() { ... });   // Iterar elementos
$(this).data('producto-id');                // Data attributes
```

## 🚀 Cómo Usar

1. **Descargar archivos** manteniendo la estructura
2. **Abrir en navegador**: Abre `index.html` directamente
3. **Probar iconos**: Abre `test-iconos.html` para verificar Font Awesome

## 🎓 Ejemplos de Código

### Ejemplo 1: Agregar al Carrito (jQuery + Cálculos)
```javascript
// jQuery maneja el evento
$('#productosContainer').on('click', 'button[data-producto-id]', function() {
    const productoId = parseInt($(this).data('producto-id'));
    agregarAlCarrito(productoId); // Función que usa cálculos JS
});

// JavaScript puro hace los cálculos
function agregarAlCarrito(idProducto) {
    const producto = buscarProductoPorId(productos, idProducto); // Cálculo
    // ... lógica de carrito
    mostrarNotificacion(`${producto.nombre} agregado`); // jQuery
}
```

### Ejemplo 2: Filtrar Productos
```javascript
// jQuery captura los valores
$('#categoryFilter').on('change', function() {
    const categoria = $(this).val();
    
    // JavaScript puro hace los cálculos
    const productosFiltrados = aplicarFiltrosYOrdenamiento(
        productos, categoria, ordenamiento, busqueda
    );
    
    // jQuery renderiza el resultado
    renderizarProductos(productosFiltrados, 'productosContainer');
});
```

## 📝 Orden de Carga de Scripts
```html
<script src="jquery.min.js"></script>         <!-- 1. jQuery primero -->
<script src="bootstrap.bundle.min.js"></script> <!-- 2. Bootstrap -->
<script src="js/calculos.js"></script>        <!-- 3. Funciones de cálculo -->
<script src="js/productos.js"></script>       <!-- 4. Datos -->
<script src="js/carrito.js"></script>         <!-- 5. Funciones DOM -->
<!-- 6. Código inline al final -->
```

## 🎉 ¡Listo para Usar!

El proyecto está completamente funcional con:
- ✅ jQuery para toda la manipulación del DOM
- ✅ JavaScript vanilla para cálculos
- ✅ Separación clara de responsabilidades
- ✅ Código organizado y mantenible
- ✅ Iconos funcionando correctamente
- ✅ Sin dependencias quemadas

¡Disfruta tu sitio de chocolatería! 🍫
