document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const ejercicio = body.getAttribute('data-ejercicio');

    if (ejercicio) {
        setupEjercicio(ejercicio);
    }
});

function setupEjercicio(nombreEjercicio) {
    const btnIniciar = document.getElementById('btnIniciar');
    const resultadosDiv = document.getElementById('resultados');
    
    const ejercicios = {
        'conteoCeros': 'ConteoCeros', 
        'cuadradoMagico': 'CuadradoMagico', 
        'operacionesMatrices': 'OperacionesMatrices', 
        'matrizIdentidad': 'MatrizIdentidad', 
        'sumaPromedio': 'SumaPromedio', 
        'analisisVentas': 'AnalisisVentas',
        'analisisCalificaciones': 'AnalisisCalificaciones',
        'multiplicacionMatrices': 'MultiplicacionMatrices', 
        'transpuestaSimetria': 'TranspuestaSimetria'
    };

    const className = ejercicios[nombreEjercicio];

    if (btnIniciar && className && typeof window[className] === 'function') {
        const instanciaEjercicio = new window[className]();
        
        btnIniciar.onclick = () => {
            instanciaEjercicio.iniciarAnalisis(); 
        };
        
    } else {
        if (resultadosDiv) {
            const errorMsg = className 
                ? `Error de carga: La clase '${className}' no se cargó correctamente (verifique el script tag en el HTML).`
                : `Error de mapeo: El ID '${nombreEjercicio}' no está definido en main.js o la clase no existe.`;
            
            resultadosDiv.innerHTML = `<p class="error">Error de configuración: ${errorMsg}</p>`;
        }
    }
}

function volverAlMenu() {
    window.location.href = '../index.html';
}