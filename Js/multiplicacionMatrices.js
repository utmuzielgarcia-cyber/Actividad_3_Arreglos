/**
 * Clase MultiplicacionMatrices para resolver el Ejercicio 8 (Adicional de Alto Nivel).
 * Implementa el producto de matrices (Producto Matricial).
 */
class MultiplicacionMatrices {

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        try {
            // 1. ENTRADA: Solicitar dimensiones y matrices
            const { N, M, P } = await this.solicitarDimensiones();
            const matrizA = await this.llenarMatriz('A', N, M);
            const matrizB = await this.llenarMatriz('B', M, P);
            
            // 2. PROCESO: Multiplicación
            const matrizResultado = this.multiplicarMatrices(matrizA, matrizB, N, M, P);

            // 3. SALIDA: Mostrar el análisis y el resultado
            resultadosDiv.innerHTML = this.mostrarAnalisis(matrizA, matrizB, N, M, P);
            resultadosDiv.innerHTML += this.mostrarResultados(matrizResultado);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    // --- Métodos de Entrada y Validación ---

    /**
     * Solicita las dimensiones N, M, P, asegurando que la Matriz A (NxM) pueda multiplicarse por la Matriz B (MxP).
     */
    solicitarDimensiones() {
        return new Promise((resolve, reject) => {
            let N, M, P;
            let entradaValida = false;

            while (!entradaValida) {
                const entrada = prompt("Paso 1/3: Ingrese las dimensiones de las matrices (Filas A, Columnas A/Filas B, Columnas B) separadas por coma. Ej: 2, 3, 2 (Matriz A: 2x3, Matriz B: 3x2):");

                if (entrada === null) return reject(new Error("Operación cancelada por el usuario."));
                
                const dims = entrada.split(/[\s,]+/).map(d => parseInt(d.trim())).filter(d => !isNaN(d) && d > 0);
                
                if (dims.length !== 3) {
                    alert("ERROR: Debe ingresar exactamente 3 números enteros positivos (N, M, P).");
                    continue;
                }
                
                N = dims[0]; // Filas de A
                M = dims[1]; // Columnas de A y Filas de B (deben ser iguales)
                P = dims[2]; // Columnas de B

                if (N > 0 && M > 0 && P > 0) {
                    entradaValida = true;
                } else {
                    alert("ERROR: Todas las dimensiones deben ser números enteros positivos.");
                }
            }
            resolve({ N, M, P });
        });
    }

    /**
     * Solicita al usuario los valores para una matriz específica.
     */
    llenarMatriz(nombre, filas, columnas) {
        return new Promise((resolve, reject) => {
            let matriz = [];
            for (let i = 0; i < filas; i++) {
                const entrada = prompt(`Paso 2/3 o 3/3: Matriz ${nombre} (Renglón ${i + 1} de ${filas}). Ingrese ${columnas} números (separados por coma):`);

                if (entrada === null) return reject(new Error(`Operación cancelada al ingresar Matriz ${nombre}.`));
                
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseFloat(val.trim());
                                           if (isNaN(numVal)) {
                                                // Admite decimales para un ejercicio de alto nivel
                                                throw new Error("Introducir sólo números (decimales o enteros)."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== columnas) {
                    throw new Error(`Datos faltantes: Matriz ${nombre} (Renglón ${i + 1}) debe tener exactamente ${columnas} números.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    // --- Lógica del Producto Matricial ---

    /**
     * Realiza la multiplicación de la Matriz A (NxM) por la Matriz B (MxP).
     */
    multiplicarMatrices(matrizA, matrizB, N, M, P) {
        // La matriz resultante será N x P
        let matrizResultado = [];

        for (let i = 0; i < N; i++) { // Recorre Filas de A
            matrizResultado[i] = [];
            for (let j = 0; j < P; j++) { // Recorre Columnas de B
                let sumaProducto = 0;
                for (let k = 0; k < M; k++) { // Recorre Columnas de A / Filas de B
                    // La lógica central del producto matricial: (Fila A) x (Columna B)
                    sumaProducto += matrizA[i][k] * matrizB[k][j];
                }
                // Almacenar el resultado redondeado
                matrizResultado[i][j] = parseFloat(sumaProducto.toFixed(2));
            }
        }
        return matrizResultado;
    }

    // --- Métodos de Presentación ---

    mostrarAnalisis(matrizA, matrizB, N, M, P) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA (PRODUCTO MATRICIAL)</h2>
            <p><strong>DESCRIPCIÓN:</strong> Calcular el producto matricial de A (${N} x ${M}) por B (${M} x ${P}). El resultado será una matriz ${N} x ${P}.</p>
            <p><strong>ENTRADAS:</strong> Dimensiones y ${N * M + M * P} valores de las matrices A y B.</p>
            <p><strong>PROCESO:</strong> Se calcula cada elemento de la matriz resultante multiplicando los elementos de las filas de A por los elementos de las columnas de B, y sumando esos productos (Suma Producto).</p>
            <div class="matrices-container">
                <div class="matriz-display">
                    <strong>Matriz A (${N} x ${M}):</strong>
                    ${this.matrizToHTML(matrizA)}
                </div>
                <div class="matriz-display">
                    <strong>Matriz B (${M} x ${P}):</strong>
                    ${this.matrizToHTML(matrizB)}
                </div>
            </div>
            <hr>
            <h3>SALIDA: Matriz Producto (A x B)</h3>
        `;
        return html;
    }

    mostrarResultados(matriz) {
        return `
            <h4>Matriz Resultante (${matriz.length} x ${matriz[0].length}):</h4>
            <div class="matriz-container">${this.matrizToHTML(matriz)}</div>
        `;
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

    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR DE VALIDACIÓN/LÓGICA: ${mensaje}</p>`;
    }
}

// Exponer la clase globalmente.
window.MultiplicacionMatrices = MultiplicacionMatrices;