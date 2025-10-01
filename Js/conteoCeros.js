/**
 * Clase ConteoCeros para resolver el Ejercicio 1: Conteo de Ceros en Arreglo.
 * CORREGIDO: Ahora solicita una matriz 5x5 al usuario y valida la entrada.
 */
class ConteoCeros {

    constructor() {
        // CORRECCIÓN: El tamaño debe ser 5x5 según el enunciado original
        this.FILAS = 5;
        this.COLUMNAS = 5;
    }

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            // 1. ENTRADA: Solicitar la matriz 5x5 al usuario
            const matriz = await this.solicitarMatriz();

            // 2. PROCESO: Realizar el conteo
            const conteo = this.contarCeros(matriz);

            // 3. SALIDA: Mostrar el análisis, la matriz de entrada y los resultados
            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(conteo);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    /**
     * Solicita al usuario los valores para una matriz 5x5.
     * @returns {Promise<number[][]>} La matriz 5x5 llena con números.
     */
    solicitarMatriz() {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < this.FILAS; i++) {
                // Mensaje de entrada con 5 columnas
                const entrada = prompt(`Ingrese los ${this.COLUMNAS} números para el Renglón ${i + 1} (Ej: 0, 2, 5, 7, 6):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada por el usuario."));
                }
                
                // Procesar y validar la entrada
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseInt(val.trim());
                                           if (isNaN(numVal)) {
                                                // Mensaje de excepción limpio
                                                throw new Error("Introducir sólo números enteros para la matriz."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.COLUMNAS) {
                    // Mensaje de excepción limpio
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${this.COLUMNAS} números para el Renglón ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    /**
     * Realiza el conteo de ceros por cada renglón.
     */
    contarCeros(matriz) {
        return matriz.map(fila => {
            let contadorCeros = 0;
            for (const valor of fila) {
                if (valor === 0) {
                    contadorCeros++;
                }
            }
            return contadorCeros;
        });
    }

    // --- Métodos de Presentación (ANÁLISIS y SALIDA) ---

    mostrarAnalisis(matriz) {
        // Texto de descripción sin simbología de formato y con el tamaño 5x5 correcto
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Calcular cuántos ceros aparecen en cada renglón de la matriz de entrada 5 x 5.</p>
            <p><strong>ENTRADAS:</strong> Matriz 5 x 5 con valores enteros, ingresada por el usuario.</p>
            <div class="matriz-container">
                <strong>Matriz de Entrada:</strong>
                ${this.matrizToHTML(matriz)}
            </div>
            <p><strong>PROCESO:</strong> Se itera sobre cada posición de la matriz, contando los valores iguales a cero.</p>
            <hr>
            <h3>SALIDA: Conteo de Ceros por Renglón</h3>
        `;
        return html;
    }

    mostrarResultados(conteoPorFila) {
        let html = '<ul class="list-results">';
        conteoPorFila.forEach((conteo, index) => {
            html += `<li>Renglón ${index + 1}: <strong>${conteo}</strong> ceros.</li>`;
        });
        html += '</ul>';
        return html;
    }

    // Utilidad: Genera la tabla HTML para la matriz
    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                html += `<td>${valor}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }
    
    // Utilidad: Muestra errores de validación
    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR DE VALIDACIÓN: ${mensaje}</p>`;
    }
}

// Exponer la clase globalmente.
window.ConteoCeros = ConteoCeros;