class OperacionesMatrices {

    constructor() {
        this.MATRIZ_SIZE = 2;
    }

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const matriz1 = await this.solicitarMatriz(1);
            const matriz2 = await this.solicitarMatriz(2);

            const suma = this.sumarMatrices(matriz1, matriz2);
            const resta = this.restarMatrices(matriz1, matriz2);
            const producto = this.productoSimple(matriz1, matriz2);
            const division = this.divisionSimple(matriz1, matriz2);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz1, matriz2);
            resultadosDiv.innerHTML += this.mostrarResultados(suma, resta, producto, division);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

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
                                               throw new Error("Introducir sólo números decimales o enteros."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.MATRIZ_SIZE) {
                    throw new Error(`Datos faltantes: Matriz ${num}, Renglón ${i + 1} debe tener exactamente ${this.MATRIZ_SIZE} números.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

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
                return "Div/0"; 
            }
            return parseFloat((a / b).toFixed(2));
        });
    }

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

    matrizToHTML(matriz) {
        let html = '<table class="matriz">';
        for (const fila of matriz) {
            html += '<tr>';
            for (const valor of fila) {
                const displayValue = (typeof valor === 'number' && !Number.isInteger(valor)) ? valor.toFixed(2) : valor;
                const clase = valor === 'Div/0' ? 'error-cell' : '';
                html += `<td class="${clase}"> ${displayValue} </td>`;
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

window.OperacionesMatrices = OperacionesMatrices;