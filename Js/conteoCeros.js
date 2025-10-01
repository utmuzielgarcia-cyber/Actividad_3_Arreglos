/**
 * Clase ConteoCeros para resolver el Ejercicio 1: Conteo de Ceros en Arreglo.
 * MODIFICADO: Ahora solicita una matriz 5x5 al usuario y valida la entrada.
 */
class ConteoCeros {

    constructor() {
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
     * El usuario debe ingresar 25 números, fila por fila.
     * @returns {Promise<number[][]>} La matriz 5x5 llena con números.
     */
    solicitarMatriz() {
        return new Promise((resolve, reject) => {
            let matriz = [];

            for (let i = 0; i < this.FILAS; i++) {
                const entrada = prompt(`Ingrese los ${this.COLUMNAS} números para el Renglón ${i + 1} (separados por coma):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada por el usuario."));
                }
                
                // Procesar y validar la entrada
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseInt(val.trim());
                                           if (isNaN(numVal)) {
                                                // Manejo de excepción: Entrada no numérica (requisito)
                                                throw new Error("Introducir sólo números enteros para la matriz."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.COLUMNAS) {
                    // Manejo de excepción: Datos faltantes (requisito)
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${this.COLUMNAS} números para el Renglón ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    /**
     * Realiza el conteo de ceros por cada renglón.
     * @param {number[][]} matriz - La matriz proporcionada por el usuario.
     * @returns {number[]} Un array con el número de ceros por cada fila.
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
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Calcular cuántos ceros aparecen en cada renglón de la matriz de entrada $5 \\times 5$.</p>
            <p><strong>ENTRADAS:</strong> Matriz $5 \\times 5$ con valores enteros, ingresada por el usuario.</p>
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
    
    // Utilidad: Muestra errores de validación en la sección de resultados
    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR DE VALIDACIÓN: ${mensaje}</p>`;
    }
}

// Exponer la clase globalmente.
window.ConteoCeros = ConteoCeros;