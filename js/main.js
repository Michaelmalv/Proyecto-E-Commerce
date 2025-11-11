/* ===================================
   ARCHIVO JAVASCRIPT PRINCIPAL
   Chocolates Indemini Baz
   ===================================
   
   Este archivo se carga en TODAS las páginas.
   Contiene funcionalidades comunes como:
   - Inicialización de tooltips
   - Actualización del badge del carrito
   - Funciones auxiliares globales
   
   IMPORTANTE: Este archivo usa jQuery
*/

// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====

/**
 * jQuery Document Ready
 * $(document).ready() se ejecuta cuando el DOM está completamente cargado
 * 
 * DOM = Document Object Model (estructura del HTML en memoria)
 * Es importante esperar a que cargue antes de manipular elementos
 */
$(document).ready(function() {
    console.log('🚀 Sitio web cargado - Chocolates Indemini Baz');
    
    // Inicializar componentes de Bootstrap
    inicializarTooltips();
    
    // Actualizar badge del carrito (se llama desde cart.js)
    actualizarBadgeCarrito();
    
    // Inicializar animaciones
    inicializarAnimaciones();
});

// ===== INICIALIZACIÓN DE COMPONENTES BOOTSTRAP =====

/**
 * Inicializa los tooltips de Bootstrap
 * Tooltips: textos que aparecen al pasar el mouse sobre un elemento
 */
function inicializarTooltips() {
    // jQuery: $('[data-bs-toggle="tooltip"]') selecciona todos los elementos
    // que tienen el atributo data-bs-toggle="tooltip"
    const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
    
    // .each(): itera sobre cada elemento seleccionado
    // index: índice del elemento (0, 1, 2, ...)
    // element: el elemento HTML actual
    tooltipTriggerList.each(function(index, element) {
        // Bootstrap Tooltip: crear instancia del tooltip
        new bootstrap.Tooltip(element);
    });
    
    console.log('✅ Tooltips inicializados:', tooltipTriggerList.length);
}

// ===== ANIMACIONES Y EFECTOS =====

/**
 * Inicializa animaciones de scroll y efectos visuales
 */
function inicializarAnimaciones() {
    // Animación suave al hacer click en enlaces del navbar
    // $('a[href^="#"]'): selecciona enlaces que comienzan con #
    $('a[href^="#"]').on('click', function(e) {
        // e: evento del click
        
        // Obtener el href del enlace
        const href = $(this).attr('href');
        
        // Si el href es solo "#", ignorar
        if (href === '#') {
            return;
        }
        
        // Prevenir comportamiento por defecto (salto brusco)
        e.preventDefault();
        
        // Scroll animado al elemento
        // $(href): selecciona el elemento con ese ID
        // .offset().top: posición vertical del elemento
        $('html, body').animate({
            scrollTop: $(href).offset().top - 70 // -70px para el navbar fijo
        }, 800); // Duración: 800ms
    });
    
    // Efecto fade-in para elementos al hacer scroll
    animarElementosAlScroll();
}

/**
 * Anima elementos cuando aparecen en la pantalla al hacer scroll
 */
function animarElementosAlScroll() {
    // $(window).on('scroll'): evento que se dispara al hacer scroll
    $(window).on('scroll', function() {
        // .each(): iterar sobre cada elemento con clase .animate-on-scroll
        $('.animate-on-scroll').each(function() {
            // Posición del elemento
            const elementTop = $(this).offset().top;
            // Posición actual del scroll + altura de la ventana
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            // Si el elemento está visible
            if (elementTop < viewportBottom - 100) {
                // Agregar clase para animar
                $(this).addClass('animate-fade-in');
            }
        });
    });
}

// ===== FUNCIONES AUXILIARES GLOBALES =====

/**
 * Formatea un número como moneda
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado como moneda
 */
function formatearMoneda(numero) {
    // toFixed(2): redondea a 2 decimales
    return '$' + numero.toFixed(2);
}

/**
 * Valida que un email tenga formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validarEmail(email) {
    // Expresión regular para validar emails
    // ^ = inicio, $ = fin
    // [a-zA-Z0-9] = letras y números
    // @ = arroba obligatoria
    // \. = punto literal
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

/**
 * Valida que un teléfono tenga formato correcto (10 dígitos)
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validarTelefono(telefono) {
    // Expresión regular: exactamente 10 dígitos
    const regex = /^\d{10}$/;
    return regex.test(telefono);
}

/**
 * Muestra un mensaje de error en un campo del formulario
 * @param {string} campoId - ID del campo
 * @param {string} mensaje - Mensaje de error
 */
function mostrarErrorCampo(campoId, mensaje) {
    // jQuery: $('#' + campoId) selecciona el campo
    const $campo = $('#' + campoId);
    
    // Agregar clase de Bootstrap para campos inválidos
    $campo.addClass('is-invalid');
    
    // Buscar el elemento .invalid-feedback siguiente
    const $feedback = $campo.next('.invalid-feedback');
    
    // Si existe, actualizar el mensaje
    if ($feedback.length > 0) {
        $feedback.text(mensaje);
    }
}

/**
 * Limpia los errores de validación de un formulario
 * @param {string} formularioId - ID del formulario
 */
function limpiarErroresFormulario(formularioId) {
    const $form = $('#' + formularioId);
    
    // Remover clases de validación de Bootstrap
    $form.find('.is-invalid').removeClass('is-invalid');
    $form.find('.is-valid').removeClass('is-valid');
}

/**
 * Genera un número aleatorio entre min y max (inclusive)
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Número aleatorio
 */
function numeroAleatorio(min, max) {
    // Math.random(): genera número entre 0 y 1
    // Math.floor(): redondea hacia abajo
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Genera un código alfanumérico aleatorio
 * @param {number} longitud - Longitud del código
 * @returns {string} - Código generado
 */
function generarCodigoAleatorio(longitud = 8) {
    // Caracteres posibles para el código
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let resultado = '';
    
    // Generar cada carácter del código
    for (let i = 0; i < longitud; i++) {
        // Seleccionar un carácter aleatorio
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }
    
    return resultado;
}

/**
 * Desplaza la página al inicio con animación
 */
function scrollToTop() {
    // jQuery animate: animación personalizada
    $('html, body').animate({
        scrollTop: 0 // Posición: arriba del todo
    }, 600); // Duración: 600ms
}

/**
 * Obtiene la fecha y hora actual formateada
 * @returns {string} - Fecha formateada
 */
function obtenerFechaActual() {
    const fecha = new Date();
    
    // Opciones de formato
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    // toLocaleDateString: formatea la fecha según el idioma
    return fecha.toLocaleDateString('es-ES', opciones);
}

/**
 * Copia un texto al portapapeles
 * @param {string} texto - Texto a copiar
 */
function copiarAlPortapapeles(texto) {
    // Crear un elemento temporal
    const $temp = $('<textarea>');
    
    // Agregar al body
    $('body').append($temp);
    
    // Establecer el valor y seleccionar
    $temp.val(texto).select();
    
    // Ejecutar comando de copiar
    document.execCommand('copy');
    
    // Remover elemento temporal
    $temp.remove();
    
    console.log('📋 Texto copiado al portapapeles');
}

/**
 * Debounce: retrasa la ejecución de una función
 * Útil para eventos que se disparan muy seguido (scroll, resize, typing)
 * 
 * @param {function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {function} - Función con debounce aplicado
 */
function debounce(func, wait) {
    let timeout;
    
    // Retornar nueva función
    return function ejecutar(...args) {
        // Limpiar timeout anterior
        clearTimeout(timeout);
        
        // Establecer nuevo timeout
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

// ===== EVENT LISTENERS GLOBALES =====

/**
 * Botón "Volver arriba" (si existe en la página)
 */
$(window).on('scroll', function() {
    // Mostrar botón después de 300px de scroll
    if ($(window).scrollTop() > 300) {
        $('#btn-volver-arriba').fadeIn();
    } else {
        $('#btn-volver-arriba').fadeOut();
    }
});

// Click en botón volver arriba
$('#btn-volver-arriba').on('click', function() {
    scrollToTop();
});

// ===== MANEJO DE ERRORES GLOBAL =====

/**
 * Captura errores JavaScript no manejados
 */
window.onerror = function(message, source, lineno, colno, error) {
    console.error('❌ Error capturado:', {
        mensaje: message,
        archivo: source,
        linea: lineno,
        columna: colno,
        error: error
    });
    
    // En producción, aquí podrías enviar el error a un servidor
    // para monitoreo
    
    // Retornar true para prevenir el error por defecto del navegador
    return true;
};

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS CLAVE DE ESTE ARCHIVO:

1. $(document).ready():
   - Se ejecuta cuando el DOM está listo
   - Forma corta: $(function() { ... })
   - Garantiza que los elementos HTML existan antes de manipularlos

2. EVENT LISTENERS (Escuchadores de eventos):
   - .on('evento', function): escucha un evento
   - Eventos comunes: click, scroll, submit, change, keyup
   - e.preventDefault(): previene comportamiento por defecto

3. SELECTORES JQUERY:
   - $('#id'): selecciona por ID
   - $('.clase'): selecciona por clase
   - $('elemento'): selecciona por etiqueta
   - $('[atributo="valor"]'): selecciona por atributo

4. ANIMACIONES JQUERY:
   - .fadeIn(), .fadeOut(): aparecer/desaparecer
   - .animate(): animación personalizada
   - .slideUp(), .slideDown(): deslizar

5. MANIPULACIÓN DOM:
   - .text(): obtener/establecer texto
   - .html(): obtener/establecer HTML
   - .val(): obtener/establecer valor de input
   - .addClass(), .removeClass(): manipular clases

6. EXPRESIONES REGULARES (RegEx):
   - Patrón para validar strings
   - /patrón/flags
   - .test(): retorna true/false

7. SCOPE DE VARIABLES:
   - Variables dentro de funciones son locales
   - Variables fuera son globales (cuidado con esto)
   - Usar const/let en lugar de var

BUENAS PRÁCTICAS:
- Siempre usar $(document).ready()
- Comentar código complejo
- Validar inputs del usuario
- Usar console.log() para debugging
- Separar lógica en funciones pequeñas
- Nombrar funciones de forma descriptiva
*/
