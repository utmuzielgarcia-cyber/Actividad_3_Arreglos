/**
 * Clase SumaPromedio para resolver el Ejercicio 5.
 * CORREGIDO: Solicita los 50 números de la matriz al usuario.
 * Calcula suma/promedio por fila (A, B) y columna (C, D).
 */
class SumaPromedio {

    constructor() {
        this.FILAS = 5;
        this.COLUMNAS = 10;
    }

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            // 1. ENTRADA: Solicitar los 50 números al usuario
            const matriz = await this.solicitarMatriz();
            
            // 2. PROCESO: Calcular sumas y promedios por fila y columna
            const { sumasFilas, promediosFilas, sumasColumnas, promediosColumnas } = this.calcularResultados(matriz);

            // 3. SALIDA: Mostrar el análisis y el resultado
            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(
                matriz,
                sumasFilas,
                promediosFilas,
                sumasColumnas,
                promediosColumnas
            );

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    /**
     * Solicita al usuario los valores para una matriz 5x10, fila por fila.
     * @returns {Promise<number[][]>} La matriz 5x10 llena con números (admite decimales).
     */
    solicitarMatriz() {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < this.FILAS; i++) {
                const entrada = prompt(`Renglón ${i + 1} de ${this.FILAS}: Ingrese los ${this.COLUMNAS} números (separados por coma):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada por el usuario."));
                }
                
                // Procesar y validar la entrada (usando parseFloat para admitir decimales)
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseFloat(val.trim());
                                           if (isNaN(numVal)) {
                                                // Manejo de excepción para entrada no numérica
                                                throw new Error("Introducir sólo números (decimales o enteros) para la matriz."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.COLUMNAS) {
                    // Manejo de excepción para datos faltantes
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${this.COLUMNAS} números para el Renglón ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    /**
     * Realiza todos los cálculos requeridos por la práctica.
     */
    calcularResultados(matriz) {
        let sumasFilas = [];
        let promediosFilas = [];
        let sumasColumnas = new Array(this.COLUMNAS).fill(0);
        let promediosColumnas = [];

        // --- Cálculos por FILA (Arreglos A y B) ---
        for (let i = 0; i < this.FILAS; i++) {
            let sumaFila = 0;
            for (let j = 0; j < this.COLUMNAS; j++) {
                sumaFila += matriz[i][j];
                // Acumular la suma para las columnas (Arreglo C)
                sumasColumnas[j] += matriz[i][j];
            }
            // Almacenar en arreglos A y B
            sumasFilas.push(parseFloat(sumaFila.toFixed(2))); // Arreglo A
            promediosFilas.push(parseFloat((sumaFila / this.COLUMNAS).toFixed(2))); // Arreglo B
        }

        // --- Cálculos por COLUMNA (Arreglos C y D) ---
        for (let j = 0; j < this.COLUMNAS; j++) {
            // Almacenar en arreglo D
            promediosColumnas.push(parseFloat((sumasColumnas[j] / this.FILAS).toFixed(2))); // Arreglo D
        }
        
        return { 
            sumasFilas: sumasFilas,     
            promediosFilas: promediosFilas,   
            sumasColumnas: sumasColumnas,   
            promediosColumnas: promediosColumnas 
        };
    }

    // --- Métodos de Presentación (ANÁLISIS y SALIDA) ---

    mostrarAnalisis(matriz) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Calcular la suma y el promedio por cada fila y columna de la matriz 5 x 10 ingresada.</p>
            <p><strong>ENTRADAS:</strong> Matriz 5 x 10 con 50 valores numéricos (decimales o enteros) ingresados por el usuario.</p>
            <p><strong>PROCESO:</strong> Se calcula la suma de cada fila (Arreglo A) y su promedio (Arreglo B). Luego, se calcula la suma de cada columna (Arreglo C) y su promedio (Arreglo D).</p>
            <hr>
            <h3>SALIDA: Matriz y Arreglos de Resultados</h3>
            <h4>Matriz de Entrada (5x10):</h4>
            <div class="matriz-container">
                ${this.matrizToHTML(matriz)}
            </div>
            <hr>
        `;
        return html;
    }

    mostrarResultados(matriz, A, B, C, D) {
        const htmlFilas = this.arreglosToHTML("Filas", this.FILAS, ["Suma (A)", A], ["Promedio (B)", B]);
        const htmlColumnas = this.arreglosToHTML("Columnas", this.COLUMNAS, ["Suma (C)", C], ["Promedio (D)", D]);

        return `
            <h4>Resultados por Fila (Arreglos A y B):</h4>
            ${htmlFilas}
            <h4>Resultados por Columna (Arreglos C y D):</h4>
            ${htmlColumnas}
        `;
    }
    
    // Genera la estructura HTML para mostrar los arreglos A, B, C, D
    arreglosToHTML(tipo, count, arr1, arr2) {
        let html = '<table class="matriz tabla-resultados">';
        
        // Encabezado
        html += `<thead><tr><th># ${tipo}</th><th>${arr1[0]}</th><th>${arr2[0]}</th></tr></thead>`;
        
        // Cuerpo (Iterar por fila o columna)
        html += '<tbody>';
        for(let i = 0; i < count; i++) {
            html += `
                <tr>
                    <td>${tipo === 'Filas' ? `Fila ${i + 1}` : `Columna ${i + 1}`}</td>
                    <td>${arr1[1][i]}</td>
                    <td>${arr2[1][i]}</td>
                </tr>
            `;
        }
        html += '</tbody></table>';
        return `<div class="matriz-container" style="display: block;">${html}</div>`;
    }


    // Utilidad: Genera la tabla HTML para la matriz (debe ser la misma que en Ej. 1)
    matrizToHTML(matriz) {
        let html = '<table class="matriz matriz-grande">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                // Formateamos para mostrar solo dos decimales en la matriz grande
                const displayValue = parseFloat(valor).toFixed(1); 
                html += `<td>${displayValue}</td>`;
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
window.SumaPromedio = SumaPromedio;