/**
 * Clase OperacionesMatrices para resolver el Ejercicio 3.
 * Realiza Suma, Resta, Producto simple y División simple de dos matrices 2x2.
 */
class OperacionesMatrices {

    constructor() {
        this.MATRIZ_SIZE = 2; // El tamaño es fijo: 2x2
    }

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            // 1. ENTRADAS: Solicitud de las dos matrices 2x2
            const matriz1 = await this.solicitarMatriz(1);
            const matriz2 = await this.solicitarMatriz(2);

            // 2. PROCESO: Realizar las operaciones
            const suma = this.sumarMatrices(matriz1, matriz2);
            const resta = this.restarMatrices(matriz1, matriz2);
            const producto = this.productoSimple(matriz1, matriz2);
            const division = this.divisionSimple(matriz1, matriz2);

            // 3. SALIDA: Mostrar el análisis y los resultados
            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz1, matriz2);
            resultadosDiv.innerHTML += this.mostrarResultados(suma, resta, producto, division);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    /**
     * Solicita al usuario los 4 valores de una matriz 2x2 (renglón por renglón).
     * @param {number} num - El número de la matriz a solicitar (1 o 2).
     * @returns {Promise<number[][]>} La matriz 2x2 llena.
     */
    solicitarMatriz(num) {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < this.MATRIZ_SIZE; i++) {
                const entrada = prompt(`Matriz ${num}, Renglón ${i + 1}: Ingrese los 2 números (separados por coma. Ej: 10, 5):`);

                if (entrada === null) {
                    return reject(new Error(`Operación cancelada por el usuario al ingresar Matriz ${num}.`));
                }

                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseFloat(val.trim());
                                           if (isNaN(numVal)) {
                                                // Manejo de excepción para entrada no numérica (admite decimales)
                                                throw new Error("Introducir sólo números decimales o enteros."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.MATRIZ_SIZE) {
                    // Manejo de excepción para datos faltantes
                    throw new Error(`Datos faltantes: Matriz ${num}, Renglón ${i + 1} debe tener exactamente ${this.MATRIZ_SIZE} números.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    /**
     * Realiza una operación binaria elemento por elemento.
     */
    operacionElemento(mat1, mat2, operacion) {
        let resultado = [];
        for (let i = 0; i < this.MATRIZ_SIZE; i++) {
            resultado[i] = [];
            for (let j = 0; j < this.MATRIZ_SIZE; j++) {
                resultado[i][j] = operacion(mat1[i][j], mat2[i][j]);
            }
        }
        return resultado;
    }

    // Funciones de operación específicas
    sumarMatrices(mat1, mat2) {
        return this.operacionElemento(mat1, mat2, (a, b) => a + b);
    }

    restarMatrices(mat1, mat2) {
        return this.operacionElemento(mat1, mat2, (a, b) => a - b);
    }

    productoSimple(mat1, mat2) {
        return this.operacionElemento(mat1, mat2, (a, b) => a * b);
    }

    divisionSimple(mat1, mat2) {
        return this.operacionElemento(mat1, mat2, (a, b) => {
            if (b === 0) {
                // Manejo de excepción: División por cero (requisito)
                return "Div/0"; 
            }
            // Devolver hasta dos decimales para la salida clara
            return parseFloat((a / b).toFixed(2));
        });
    }

    // --- Métodos de Presentación (ANÁLISIS y SALIDA) ---

    mostrarAnalisis(mat1, mat2) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> El programa calcula la suma, resta, producto simple y división simple de dos matrices 2 x 2.</p>
            <p><strong>ENTRADAS:</strong> Dos matrices 2 x 2, con valores numéricos decimales o enteros.</p>
            <p><strong>PROCESO:</strong> Se realizan cuatro operaciones elemento por elemento.</p>
            <div class="matrices-container">
                <div class="matriz-display">
                    <strong>Matriz 1:</strong>
                    ${this.matrizToHTML(mat1)}
                </div>
                <div class="matriz-display">
                    <strong>Matriz 2:</strong>
                    ${this.matrizToHTML(mat2)}
                </div>
            </div>
            <hr>
            <h3>SALIDA: Resultados de las Operaciones</h3>
        `;
        return html;
    }

    mostrarResultados(suma, resta, producto, division) {
        const resultadosGrid = [
            { titulo: 'La Suma es:', matriz: suma },
            { titulo: 'La Resta es:', matriz: resta },
            { titulo: 'El Producto es:', matriz: producto },
            { titulo: 'La División es:', matriz: division }
        ];

        let html = '<div class="resultados-grid">';
        resultadosGrid.forEach(res => {
            html += `
                <div>
                    <h4>${res.titulo}</h4>
                    ${this.matrizToHTML(res.matriz)}
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    // Utilidad: Genera la tabla HTML para la matriz
    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                // Usamos toLocaleString para números con decimales, evitando el error de formato
                const displayValue = (typeof valor === 'number' && !Number.isInteger(valor)) ? valor.toFixed(2) : valor;
                const clase = valor === 'Div/0' ? 'error-cell' : '';
                html += `<td class="${clase}"> ${displayValue} </td>`;
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
window.OperacionesMatrices = OperacionesMatrices;