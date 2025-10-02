class CuadradoMagico {

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const N = await this.solicitarTamanio();
            const matriz = await this.llenarMatriz(N);
            
            const { esMagico, constanteMagica } = this.verificarCuadradoMagico(matriz, N);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz, N);
            resultadosDiv.innerHTML += this.mostrarResultados(esMagico, constanteMagica);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    solicitarTamanio() {
        return new Promise((resolve, reject) => {
            let N = 0;
            while (N <= 0) {
                const entrada = prompt("Paso 1/2: Introduzca el tamaño (N) del Cuadrado Mágico (N x N. Ej: 3):");
                
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
                const entrada = prompt(`Paso 2/2: Ingrese los ${N} números para el Renglón ${i + 1} (separados por coma. Ej: 4, 9, 2):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada durante el llenado de la matriz."));
                }
                
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseInt(val.trim());
                                           if (isNaN(numVal)) {
                                               throw new Error("Introducir sólo números enteros."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== N) {
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${N} números para el Renglón ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    verificarCuadradoMagico(matriz, N) {
        let esMagico = true;
        let constanteMagica = 0;
        
        if (N > 0) {
            constanteMagica = matriz[0].reduce((sum, val) => sum + val, 0);
        }

        for (let i = 1; i < N; i++) {
            if (matriz[i].reduce((sum, val) => sum + val, 0) !== constanteMagica) {
                esMagico = false;
                break;
            }
        }
        if (!esMagico) return { esMagico: false, constanteMagica: constanteMagica };

        for (let j = 0; j < N; j++) {
            let sumaColumna = 0;
            for (let i = 0; i < N; i++) {
                sumaColumna += matriz[i][j];
            }
            if (sumaColumna !== constanteMagica) {
                esMagico = false;
                break;
            }
        }
        if (!esMagico) return { esMagico: false, constanteMagica: constanteMagica };

        let sumaDiagPrincipal = 0;
        for (let i = 0; i < N; i++) {
            sumaDiagPrincipal += matriz[i][i];
        }
        if (sumaDiagPrincipal !== constanteMagica) {
            esMagico = false;
        }
        if (!esMagico) return { esMagico: false, constanteMagica: constanteMagica };

        let sumaDiagSecundaria = 0;
        for (let i = 0; i < N; i++) {
            sumaDiagSecundaria += matriz[i][N - 1 - i];
        }
        if (sumaDiagSecundaria !== constanteMagica) {
            esMagico = false;
        }

        return { esMagico, constanteMagica };
    }

    mostrarAnalisis(matriz, N) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> El programa verifica si la matriz N x N ingresada cumple con la condición de ser un Cuadrado Mágico.</p>
            <p><strong>ENTRADAS:</strong> Tamaño N (para una matriz ${N} x ${N}) y los ${N * N} valores enteros de la matriz.</p>
            <div class="matriz-container">
                <strong>Matriz de Entrada:</strong>
                ${this.matrizToHTML(matriz)}
            </div>
            <p><strong>PROCESO:</strong> Se calcula la suma de la primera fila (Constante Mágica). Luego, se comparan las sumas de todas las demás filas, columnas, la Diagonal Principal y la Diagonal Secundaria con esta constante.</p>
            <hr>
            <h3>SALIDA: Resultado de la Verificación</h3>
        `;
        return html;
    }

    mostrarResultados(esMagico, constanteMagica) {
        if (esMagico) {
            return `
                <p class="success-msg" style="color: var(--color-success); font-weight: bold;">¡La matriz es un CUADRADO MÁGICO! ✅</p>
                <p>La <strong>Constante Mágica</strong> es: <strong>${constanteMagica}</strong></p>
            `;
        } else {
            return `
                <p class="error">La matriz NO es un Cuadrado Mágico. ❌</p>
                <p>Suma esperada (Constante Mágica): <strong>${constanteMagica}</strong> (Las otras sumas no coinciden).</p>
            `;
        }
    }

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
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR DE VALIDACIÓN: ${mensaje}</p>`;
    }
}

window.CuadradoMagico = CuadradoMagico;