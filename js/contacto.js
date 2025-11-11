/* ===================================
   PÁGINA DE CONTACTO
   Chocolates Indemini Baz
   ===================================
   
   Este archivo maneja el formulario de contacto:
   - Validación con jQuery
   - Envío del formulario (simulado)
   - Mensajes de éxito/error
*/

// ===== INICIALIZACIÓN =====

$(document).ready(function() {
    console.log('📧 Página de contacto cargada');
    
    // Configurar validación del formulario
    configurarValidacionFormulario();
    
    // Botón para limpiar formulario
    $('#btn-limpiar').on('click', function() {
        limpiarFormulario();
    });
});

// ===== VALIDACIÓN DEL FORMULARIO (jQuery) =====

/**
 * Configura la validación del formulario de contacto
 * Usa validación personalizada con jQuery
 */
function configurarValidacionFormulario() {
    const $form = $('#formulario-contacto');
    
    // Event listener: submit (cuando se envía el formulario)
    $form.on('submit', function(e) {
        // Prevenir envío por defecto
        e.preventDefault();
        
        console.log('📝 Formulario enviado, validando...');
        
        // Limpiar errores previos
        limpiarErroresValidacion();
        
        // Validar todos los campos
        const esValido = validarFormulario();
        
        if (esValido) {
            // Si es válido, enviar formulario
            enviarFormulario();
        } else {
            // Si no es válido, mostrar mensaje
            console.warn('⚠️ Formulario inválido, revisa los campos');
            
            // Hacer scroll al primer campo con error
            const $primerError = $('.is-invalid').first();
            if ($primerError.length > 0) {
                $('html, body').animate({
                    scrollTop: $primerError.offset().top - 100
                }, 500);
            }
        }
    });
    
    // Validación en tiempo real al escribir
    // keyup: evento que se dispara al soltar una tecla
    $form.find('input, textarea, select').on('keyup change blur', function() {
        // blur: evento cuando el campo pierde el foco
        validarCampo($(this));
    });
}

/**
 * Valida todo el formulario
 * @returns {boolean} - true si es válido, false si no
 */
function validarFormulario() {
    let formularioValido = true;
    
    // Obtener valores de los campos con jQuery
    const nombre = $('#nombre').val().trim();
    const email = $('#email').val().trim();
    const telefono = $('#telefono').val().trim();
    const asunto = $('#asunto').val();
    const mensaje = $('#mensaje').val().trim();
    
    // VALIDAR NOMBRE
    if (nombre === '') {
        mostrarErrorValidacion('#nombre', 'Por favor, ingresa tu nombre completo');
        formularioValido = false;
    } else if (nombre.length < 3) {
        mostrarErrorValidacion('#nombre', 'El nombre debe tener al menos 3 caracteres');
        formularioValido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        // Expresión regular: solo letras y espacios
        mostrarErrorValidacion('#nombre', 'El nombre solo debe contener letras');
        formularioValido = false;
    } else {
        mostrarExitoValidacion('#nombre');
    }
    
    // VALIDAR EMAIL
    if (email === '') {
        mostrarErrorValidacion('#email', 'Por favor, ingresa tu email');
        formularioValido = false;
    } else if (!validarEmail(email)) {
        // validarEmail() está en main.js
        mostrarErrorValidacion('#email', 'Por favor, ingresa un email válido');
        formularioValido = false;
    } else {
        mostrarExitoValidacion('#email');
    }
    
    // VALIDAR TELÉFONO
    if (telefono === '') {
        mostrarErrorValidacion('#telefono', 'Por favor, ingresa tu teléfono');
        formularioValido = false;
    } else if (!validarTelefono(telefono)) {
        // validarTelefono() está en main.js
        mostrarErrorValidacion('#telefono', 'El teléfono debe tener 10 dígitos');
        formularioValido = false;
    } else {
        mostrarExitoValidacion('#telefono');
    }
    
    // VALIDAR ASUNTO
    if (asunto === '' || asunto === null) {
        mostrarErrorValidacion('#asunto', 'Por favor, selecciona un asunto');
        formularioValido = false;
    } else {
        mostrarExitoValidacion('#asunto');
    }
    
    // VALIDAR MENSAJE
    if (mensaje === '') {
        mostrarErrorValidacion('#mensaje', 'Por favor, escribe un mensaje');
        formularioValido = false;
    } else if (mensaje.length < 10) {
        mostrarErrorValidacion('#mensaje', 'El mensaje debe tener al menos 10 caracteres');
        formularioValido = false;
    } else {
        mostrarExitoValidacion('#mensaje');
    }
    
    return formularioValido;
}

/**
 * Valida un campo individual
 * @param {jQuery} $campo - Campo a validar
 */
function validarCampo($campo) {
    // Obtener el ID del campo
    const campoId = $campo.attr('id');
    const valor = $campo.val().trim();
    
    // Validar según el tipo de campo
    switch(campoId) {
        case 'nombre':
            if (valor === '') {
                mostrarErrorValidacion(`#${campoId}`, 'Campo requerido');
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                mostrarErrorValidacion(`#${campoId}`, 'Solo se permiten letras');
            } else {
                mostrarExitoValidacion(`#${campoId}`);
            }
            break;
            
        case 'email':
            if (valor === '') {
                mostrarErrorValidacion(`#${campoId}`, 'Campo requerido');
            } else if (!validarEmail(valor)) {
                mostrarErrorValidacion(`#${campoId}`, 'Email inválido');
            } else {
                mostrarExitoValidacion(`#${campoId}`);
            }
            break;
            
        case 'telefono':
            if (valor === '') {
                mostrarErrorValidacion(`#${campoId}`, 'Campo requerido');
            } else if (!validarTelefono(valor)) {
                mostrarErrorValidacion(`#${campoId}`, '10 dígitos requeridos');
            } else {
                mostrarExitoValidacion(`#${campoId}`);
            }
            break;
            
        case 'asunto':
            if (valor === '' || valor === null) {
                mostrarErrorValidacion(`#${campoId}`, 'Selecciona un asunto');
            } else {
                mostrarExitoValidacion(`#${campoId}`);
            }
            break;
            
        case 'mensaje':
            if (valor === '') {
                mostrarErrorValidacion(`#${campoId}`, 'Campo requerido');
            } else if (valor.length < 10) {
                mostrarErrorValidacion(`#${campoId}`, 'Mínimo 10 caracteres');
            } else {
                mostrarExitoValidacion(`#${campoId}`);
            }
            break;
    }
}

/**
 * Muestra mensaje de error en un campo
 * @param {string} selector - Selector jQuery del campo
 * @param {string} mensaje - Mensaje de error
 */
function mostrarErrorValidacion(selector, mensaje) {
    const $campo = $(selector);
    
    // Agregar clases de Bootstrap para campos inválidos
    $campo.addClass('is-invalid');
    $campo.removeClass('is-valid');
    
    // Actualizar mensaje de error
    // .next(): selecciona el siguiente elemento hermano
    $campo.next('.invalid-feedback').text(mensaje);
}

/**
 * Muestra que un campo es válido
 * @param {string} selector - Selector jQuery del campo
 */
function mostrarExitoValidacion(selector) {
    const $campo = $(selector);
    
    // Agregar clases de Bootstrap para campos válidos
    $campo.removeClass('is-invalid');
    $campo.addClass('is-valid');
}

/**
 * Limpia todos los errores de validación
 */
function limpiarErroresValidacion() {
    // Remover todas las clases de validación
    $('.is-invalid').removeClass('is-invalid');
    $('.is-valid').removeClass('is-valid');
}

// ===== ENVÍO DEL FORMULARIO =====

/**
 * Envía el formulario (simulado)
 * En una aplicación real, aquí enviarías los datos a un servidor
 */
function enviarFormulario() {
    // Obtener datos del formulario
    const datosFormulario = {
        nombre: $('#nombre').val().trim(),
        email: $('#email').val().trim(),
        telefono: $('#telefono').val().trim(),
        asunto: $('#asunto').val(),
        mensaje: $('#mensaje').val().trim(),
        fecha: obtenerFechaActual() // Función de main.js
    };
    
    console.log('📤 Enviando formulario:', datosFormulario);
    
    // Simular envío con un pequeño retraso (loading)
    const $btnEnviar = $('#formulario-contacto button[type="submit"]');
    
    // Deshabilitar botón y mostrar loading
    $btnEnviar.prop('disabled', true);
    $btnEnviar.html('<i class="spinner-border spinner-border-sm me-2"></i> Enviando...');
    
    // Simular petición al servidor con setTimeout
    setTimeout(function() {
        // "Respuesta exitosa" del servidor (simulada)
        console.log('✅ Formulario enviado exitosamente');
        
        // Mostrar modal de éxito
        mostrarModalExito(datosFormulario);
        
        // Limpiar formulario
        limpiarFormulario();
        
        // Restaurar botón
        $btnEnviar.prop('disabled', false);
        $btnEnviar.html('📤 Enviar Mensaje');
        
        // En una aplicación real, aquí harías:
        // $.ajax({
        //     url: 'tu-servidor.com/api/contacto',
        //     method: 'POST',
        //     data: datosFormulario,
        //     success: function(response) { ... },
        //     error: function(error) { ... }
        // });
        
    }, 1500); // Simular 1.5 segundos de "envío"
}

/**
 * Muestra un modal de éxito con los datos enviados
 * @param {object} datos - Datos del formulario
 */
function mostrarModalExito(datos) {
    // Crear modal dinámicamente con jQuery
    const modalHTML = `
        <div class="modal fade" id="modalExito" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            ✅ ¡Mensaje Enviado!
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="display-1 text-success mb-3">✉️✅</div>
                        <h4 class="mb-3">¡Gracias por contactarnos!</h4>
                        <p class="text-muted">
                            Hemos recibido tu mensaje correctamente, <strong>${datos.nombre}</strong>.
                            Nos pondremos en contacto contigo pronto a través de:
                        </p>
                        <div class="alert alert-light">
                            <p class="mb-1"><strong>Email:</strong> ${datos.email}</p>
                            <p class="mb-0"><strong>Teléfono:</strong> ${datos.telefono}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al body
    $('body').append(modalHTML);
    
    // Mostrar modal
    const modal = new bootstrap.Modal($('#modalExito')[0]);
    modal.show();
    
    // Eliminar modal del DOM cuando se cierra
    $('#modalExito').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

/**
 * Limpia el formulario y resetea la validación
 */
function limpiarFormulario() {
    // Resetear formulario (método nativo de HTML)
    $('#formulario-contacto')[0].reset();
    
    // Limpiar validaciones
    limpiarErroresValidacion();
    
    console.log('🧹 Formulario limpiado');
}

// ===== NOTAS PARA ESTUDIANTES =====

/*
CONCEPTOS CLAVE DE VALIDACIÓN:

1. VALIDACIÓN DEL LADO DEL CLIENTE:
   - Se hace con JavaScript antes de enviar
   - Mejora la experiencia del usuario (respuesta inmediata)
   - NO es suficiente (siempre validar en el servidor también)
   
2. EXPRESIONES REGULARES (RegEx):
   - /^[a-zA-Z]+$/: solo letras
   - /^\d{10}$/: exactamente 10 dígitos
   - test(): método que retorna true/false

3. EVENTOS DE FORMULARIO:
   - submit: cuando se envía el formulario
   - keyup: al soltar una tecla
   - change: cuando cambia el valor
   - blur: cuando el campo pierde el foco
   - focus: cuando el campo obtiene el foco

4. PREVENIR ENVÍO POR DEFECTO:
   - e.preventDefault(): cancela la acción por defecto
   - Permite validar antes de enviar
   
5. JQUERY PARA FORMULARIOS:
   - .val(): obtiene/establece valor
   - .prop(): manipula propiedades (disabled, checked, etc)
   - [0].reset(): accede al elemento HTML nativo

6. CLASES DE BOOTSTRAP PARA VALIDACIÓN:
   - is-valid: campo válido (verde)
   - is-invalid: campo inválido (rojo)
   - invalid-feedback: mensaje de error
   - valid-feedback: mensaje de éxito

7. SIMULACIÓN vs REAL:
   - setTimeout(): simula una petición asíncrona
   - En producción: usar $.ajax() o fetch()
   
BUENAS PRÁCTICAS:
- Validar en tiempo real (mejor UX)
- Mensajes de error claros y específicos
- Deshabilitar botón mientras se envía
- Mostrar feedback visual (loading spinner)
- Limpiar formulario después de enviar
- Siempre validar también en el servidor
*/
