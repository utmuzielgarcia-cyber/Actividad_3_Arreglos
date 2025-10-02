class MatrizIdentidad {

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const size = await this.solicitarTamanio();
            
            const matriz = this.generarMatrizIdentidad(size);

            resultadosDiv.innerHTML = this.mostrarAnalisis(size);
            resultadosDiv.innerHTML += this.mostrarResultados(matriz);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    solicitarTamanio() {
        return new Promise((resolve, reject) => {
            let n = 0;
            while (n <= 0) {
                const entrada = prompt("Introduzca el tamaño (N) de la matriz cuadrada (N x N, Ej: 3 para 3x3):");
                
                if (entrada === null || entrada.trim() === "") {
                    return reject(new Error("La entrada está vacía o fue cancelada."));
                }
                
                n = parseInt(entrada);
                if (isNaN(n) || n <= 0) {
                    alert("ERROR: Introducir sólo números enteros positivos.");
                    continue;
                }
                break;
            }
            resolve(n);
        });
    }

    generarMatrizIdentidad(N) {
        let matriz = [];
        for (let i = 0; i < N; i++) {
            matriz[i] = [];
            for (let j = 0; j < N; j++) {
                if (i === j) {
                    matriz[i][j] = 1; 
                } else {
                    matriz[i][j] = 0; 
                }
            }
        }
        return matriz;
    }

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

    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                const clase = valor === 1 ? 'diagonal-uno' : '';
                html += `<td class="${clase}">${valor}</td>`;
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

window.MatrizIdentidad = MatrizIdentidad;