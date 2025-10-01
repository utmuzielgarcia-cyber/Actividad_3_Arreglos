/**
 * main.js - Controlador central de la aplicación de Arreglos y Matrices.
 * Sigue el patrón POO/modular del ejemplo de recursividad.
 * * Lógica: Detecta el ejercicio actual usando el atributo 'data-ejercicio' 
 * en el body del HTML y enlaza el botón de inicio con la clase JavaScript apropiada.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el identificador del ejercicio de la página actual.
    const body = document.body;
    const ejercicio = body.getAttribute('data-ejercicio');

    if (ejercicio) {
        // Si hay un identificador, configuramos y enlazamos el ejercicio.
        setupEjercicio(ejercicio);
    }
});

/**
 * Configura el botón de inicio para un ejercicio específico, instanciando la clase JS.
 * @param {string} nombreEjercicio - Nombre clave (ej: 'conteoCeros').
 */
function setupEjercicio(nombreEjercicio) {
    const btnIniciar = document.getElementById('btnIniciar');
    const resultadosDiv = document.getElementById('resultados');
    
    // Mapeo de identificadores a nombres de Clases/Archivos (POO)
    // ESTE MAPEO DEBE CRECER CON CADA NUEVO EJERCICIO QUE IMPLEMENTES.
    const ejercicios = {
        'conteoCeros': 'ConteoCeros',             // Ejercicio 1 
        'cuadradoMagico': 'CuadradoMagico',       // Ejercicio 2 (Pendiente)
        'operacionesMatrices': 'OperacionesMatrices', // Ejercicio 3 (Pendiente)
        'matrizIdentidad': 'MatrizIdentidad',     // <<--- CORRECCIÓN AGREGADA
        // ... (Agrega más ejercicios aquí: sumaPromedio, analisisVentas, etc.)
    };

    const className = ejercicios[nombreEjercicio];

    // 2. Validación y enlazado
    // Se valida: 1) Que el botón exista, 2) Que haya un nombre de clase mapeado, 
    // 3) Que la clase haya sido cargada globalmente por su respectivo script (.js)
    if (btnIniciar && className && typeof window[className] === 'function') {
        // Creamos una instancia de la clase de lógica (POO)
        const instanciaEjercicio = new window[className]();
        
        // Asignamos la función principal de la clase al clic del botón
        btnIniciar.onclick = () => {
             // Llamamos al método que contiene el ENTRADA, PROCESO y SALIDA
             instanciaEjercicio.iniciarAnalisis(); 
        };
        
    } else {
        // Muestra un error si la configuración falla.
        if (resultadosDiv) {
             // Verificamos si el className se encontró en el mapeo, pero no se cargó el script.
             const errorMsg = className 
                 ? `Error de carga: La clase '${className}' no se cargó correctamente (verifique el script tag).`
                 : `Error de mapeo: El ID '${nombreEjercicio}' no está definido en main.js.`;
             
             resultadosDiv.innerHTML = `<p class="error">Error de configuración: ${errorMsg}</p>`;
        }
    }
}

/**
 * Función global para la navegación de retorno (usada en el botón "Volver al Menú").
 */
function volverAlMenu() {
    window.location.href = '../index.html';
}