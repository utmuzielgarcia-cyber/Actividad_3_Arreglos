class ConteoCeros {

    constructor() {
        this.FILAS = 5;
        this.COLUMNAS = 5;
    }

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const matriz = await this.solicitarMatriz();

            const conteo = this.contarCeros(matriz);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(conteo);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    solicitarMatriz() {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < this.FILAS; i++) {
                const entrada = prompt(`Ingrese los ${this.COLUMNAS} números para el Renglón ${i + 1} (Ej: 0, 2, 5, 7, 6):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada por el usuario."));
                }
                
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseInt(val.trim());
                                           if (isNaN(numVal)) {
                                               throw new Error("Introducir sólo números enteros para la matriz."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.COLUMNAS) {
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${this.COLUMNAS} números para el Renglón ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

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

    mostrarAnalisis(matriz) {
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

window.ConteoCeros = ConteoCeros;