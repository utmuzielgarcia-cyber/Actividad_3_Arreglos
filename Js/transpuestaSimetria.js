class TranspuestaSimetria {

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        try {
            const N = await this.solicitarTamanio();
            const matrizOriginal = await this.llenarMatriz(N);
            
            const matrizTranspuesta = this.calcularTranspuesta(matrizOriginal, N);
            const esSimetrica = this.verificarSimetria(matrizOriginal, matrizTranspuesta, N);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matrizOriginal, N);
            resultadosDiv.innerHTML += this.mostrarResultados(matrizTranspuesta, esSimetrica);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    solicitarTamanio() {
        return new Promise((resolve, reject) => {
            let N = 0;
            while (N <= 0) {
                const entrada = prompt("Paso 1/2: Ingrese el tamaño (N) de la matriz cuadrada (N x N. Ej: 3):");
                
                if (entrada === null || entrada.trim() === "") {
                    return reject(new Error("La entrada de tamaño no puede estar vacía o fue cancelada."));
                }
                
                N = parseInt(entrada);
                if (isNaN(N) || N <= 1) {
                    alert("ERROR: Introducir sólo un número entero mayor a 1.");
                    continue;
                }
                break;
            }
            resolve(N);
        });
    }

    llenarMatriz(N) {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < N; i++) {
                const entrada = prompt(`Paso 2/2: Renglón ${i + 1} de ${N}. Ingrese ${N} números (separados por coma):`);

                if (entrada === null) return reject(new Error("Operación cancelada durante el llenado de la matriz."));
                
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseFloat(val.trim());
                                           if (isNaN(numVal)) {
                                               throw new Error("Introducir sólo números (decimales o enteros)."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== N) {
                    throw new Error(`Datos faltantes: Renglón ${i + 1} debe tener exactamente ${N} números.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    calcularTranspuesta(original, N) {
        let transpuesta = [];
        for (let i = 0; i < N; i++) {
            transpuesta[i] = [];
            for (let j = 0; j < N; j++) {
                transpuesta[i][j] = original[j][i]; 
            }
        }
        return transpuesta;
    }

    verificarSimetria(original, transpuesta, N) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (original[i][j] !== transpuesta[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    mostrarAnalisis(matriz, N) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA (TRANSPUESTA Y SIMETRÍA)</h2>
            <p><strong>DESCRIPCIÓN:</strong> Calcular la matriz transpuesta de una matriz cuadrada ${N} x ${N} y verificar si la matriz original es simétrica (Matriz Original = Matriz Transpuesta).</p>
            <p><strong>ENTRADAS:</strong> Tamaño N y ${N * N} valores de la matriz original.</p>
            <p><strong>PROCESO:</strong> Se crea la matriz transpuesta intercambiando filas por columnas. Luego, se comparan elemento por elemento ambas matrices.</p>
            <div class="matrices-container">
                <div class="matriz-display">
                    <strong>Matriz Original (${N} x ${N}):</strong>
                    ${this.matrizToHTML(matriz)}
                </div>
            </div>
            <hr>
            <h3>SALIDA: Matriz Transpuesta y Verificación</h3>
        `;
        return html;
    }

    mostrarResultados(transpuesta, esSimetrica) {
        const mensajeSimetria = esSimetrica
            ? `<p class="success-msg" style="color: var(--color-success); font-weight: bold;">¡La matriz es SIMÉTRICA! ✅ (A = A_T)</p>`
            : `<p class="error">La matriz NO es simétrica. ❌ (A ≠ A_T)</p>`;

        return `
            ${mensajeSimetria}
            <h4>Matriz Transpuesta:</h4>
            <div class="matriz-container">${this.matrizToHTML(transpuesta)}</div>
        `;
    }

    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                const displayValue = parseFloat(valor).toFixed(2).replace(/\.00$/, ''); 
                html += `<td>${displayValue}</td>`;
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

window.TranspuestaSimetria = TranspuestaSimetria;