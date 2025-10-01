/**
 * Clase MatrizIdentidad para resolver el Ejercicio 4.
 * Genera una matriz cuadrada N x N con 1's en la diagonal principal y 0's en el resto.
 */
class MatrizIdentidad {

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            // 1. ENTRADA: Solicitar el tamaño N
            const size = await this.solicitarTamanio();
            
            // 2. PROCESO: Generar la matriz
            const matriz = this.generarMatrizIdentidad(size);

            // 3. SALIDA: Mostrar el análisis y el resultado
            resultadosDiv.innerHTML = this.mostrarAnalisis(size);
            resultadosDiv.innerHTML += this.mostrarResultados(matriz);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    /**
     * Solicita al usuario el tamaño N para la matriz cuadrada N x N.
     * @returns {Promise<number>} El tamaño N validado.
     */
    solicitarTamanio() {
        return new Promise((resolve, reject) => {
            let n = 0;
            while (n <= 0) {
                // Simulación de entrada de datos claros (requisito)
                const entrada = prompt("Introduzca el tamaño (N) de la matriz cuadrada (N x N, Ej: 3 para 3x3):");
                
                if (entrada === null || entrada.trim() === "") {
                    return reject(new Error("La entrada está vacía o fue cancelada."));
                }
                
                // Validación: numérico y entero positivo
                n = parseInt(entrada);
                if (isNaN(n) || n <= 0) {
                    alert("ERROR: Introducir sólo números enteros positivos."); // Mensaje de excepción
                    continue;
                }
                break;
            }
            resolve(n);
        });
    }

    /**
     * Genera la matriz de identidad N x N.
     * @param {number} N - El tamaño de la matriz.
     * @returns {number[][]} La matriz de identidad.
     */
    generarMatrizIdentidad(N) {
        let matriz = [];
        for (let i = 0; i < N; i++) {
            matriz[i] = [];
            for (let j = 0; j < N; j++) {
                // Lógica clave: Si la fila (i) es igual a la columna (j), es la diagonal principal (1)
                if (i === j) {
                    matriz[i][j] = 1; // Diagonal principal con 1's
                } else {
                    matriz[i][j] = 0; // Demás posiciones con 0's
                }
            }
        }
        return matriz;
    }

    // --- Métodos de Presentación (ANÁLISIS y SALIDA) ---

    mostrarAnalisis(size) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Desarrollar una aplicación para llenar una matriz cuadrada con 1's en la diagonal principal y 0's en las demás posiciones.</p>
            <p><strong>ENTRADAS:</strong> El tamaño N de la matriz cuadrada, solicitado al usuario. (N = ${size} en esta ejecución)</p>
            <p><strong>PROCESO:</strong> Se crea una matriz ${size}x${size}. Se recorre cada posición [i, j]. Si i = j, se asigna 1; de lo contrario, se asigna 0.</p>
            <hr>
            <h3>SALIDA: Matriz Identidad Generada</h3>
        `;
        return html;
    }

    mostrarResultados(matriz) {
        return `<div class="matriz-container">${this.matrizToHTML(matriz)}</div>`;
    }

    // Utilidad: Genera la tabla HTML para la matriz
    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                // Resalta visualmente el 1's para enfatizar la diagonal
                const clase = valor === 1 ? 'diagonal-uno' : '';
                html += `<td class="${clase}">${valor}</td>`;
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
window.MatrizIdentidad = MatrizIdentidad;