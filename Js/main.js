/**
 * main.js - Controlador central de la aplicación de Arreglos y Matrices.
 * Lógica: Detecta el ejercicio actual usando el atributo 'data-ejercicio' 
 * en el body del HTML y enlaza el botón de inicio con la clase JavaScript apropiada (POO).
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
    // Incluye los 7 Obligatorios + los 2 Adicionales.
    const ejercicios = {
        'conteoCeros': 'ConteoCeros',            
        'cuadradoMagico': 'CuadradoMagico',       
        'operacionesMatrices': 'OperacionesMatrices', 
        'matrizIdentidad': 'MatrizIdentidad',   
        'sumaPromedio': 'SumaPromedio', 
        'analisisVentas': 'AnalisisVentas',
        'analisisCalificaciones': 'AnalisisCalificaciones',
        // EJERCICIOS ADICIONALES (ALTO NIVEL)
        'multiplicacionMatrices': 'MultiplicacionMatrices', // Ejercicio 8
        'transpuestaSimetria': 'TranspuestaSimetria'       // Ejercicio 9
    };

    const className = ejercicios[nombreEjercicio];

    // 2. Validación y enlazado
    // Verifica que el botón exista y que la clase de lógica haya sido cargada globalmente.
    if (btnIniciar && className && typeof window[className] === 'function') {
        // Creamos una instancia de la clase de lógica (POO)
        const instanciaEjercicio = new window[className]();
        
        // Asignamos la función principal de la clase al clic del botón
        btnIniciar.onclick = () => {
             // Llamamos al método que contiene el ENTRADA, PROCESO y SALIDA
             instanciaEjercicio.iniciarAnalisis(); 
        };
        
    } else {
        // Muestra un error si la configuración falla (por mapeo o script no cargado).
        if (resultadosDiv) {
             const errorMsg = className 
                 ? `Error de carga: La clase '${className}' no se cargó correctamente (verifique el script tag en el HTML).`
                 : `Error de mapeo: El ID '${nombreEjercicio}' no está definido en main.js o la clase no existe.`;
             
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