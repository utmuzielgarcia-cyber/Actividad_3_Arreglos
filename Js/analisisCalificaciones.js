class AnalisisCalificaciones {

    constructor() {
        this.FILAS = 9;
        this.COLUMNAS = 4;
        this.PROMEDIOS_APROBATORIOS = 7.0;
    }

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const matriz = await this.solicitarMatriz();

            const { promediosAlumno, totalParcialesReprobados } = this.calcularPromediosYReprobados(matriz);
            const { promedioMasAlto, promedioMasBajo } = this.encontrarExtremos(promediosAlumno);
            const distribucionFinal = this.calcularDistribucion(promediosAlumno);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(
                promediosAlumno,
                promedioMasAlto,
                promedioMasBajo,
                totalParcialesReprobados,
                distribucionFinal
            );

        } catch (error) {
            this.mostrarError(error.message);
        }
    }

    solicitarMatriz() {
        return new Promise((resolve, reject) => {
            let matriz = [];
            
            for (let i = 0; i < this.FILAS; i++) {
                const entrada = prompt(`Alumno ${i + 1} de ${this.FILAS}: Ingrese las ${this.COLUMNAS} calificaciones (separadas por coma. Ej: 8.5, 7.0, 6.5, 9.0):`);

                if (entrada === null) {
                    return reject(new Error("Operación cancelada por el usuario."));
                }
                
                const numeros = entrada.split(/[\s,]+/)
                                       .map(val => {
                                           const numVal = parseFloat(val.trim());
                                           if (isNaN(numVal) || numVal < 0 || numVal > 10) {
                                               throw new Error("Introducir sólo números (decimales o enteros) entre 0 y 10."); 
                                           }
                                           return numVal;
                                       });

                if (numeros.length !== this.COLUMNAS) {
                    throw new Error(`Datos faltantes: Debe ingresar exactamente ${this.COLUMNAS} calificaciones para el Alumno ${i + 1}.`);
                }
                
                matriz.push(numeros);
            }
            resolve(matriz);
        });
    }

    calcularPromediosYReprobados(matriz) {
        let promediosAlumno = [];
        let totalParcialesReprobados = 0;

        for (let i = 0; i < this.FILAS; i++) {
            let sumaFila = 0;
            for (let j = 0; j < this.COLUMNAS; j++) {
                const calificacion = matriz[i][j];
                sumaFila += calificacion;
                
                if (calificacion < 7.0) {
                    totalParcialesReprobados++;
                }
            }
            promediosAlumno.push(parseFloat((sumaFila / this.COLUMNAS).toFixed(2)));
        }
        
        return { promediosAlumno, totalParcialesReprobados };
    }
    
    encontrarExtremos(promedios) {
        if (promedios.length === 0) return { promedioMasAlto: 0, promedioMasBajo: 0 };
        
        return {
            promedioMasAlto: Math.max(...promedios),
            promedioMasBajo: Math.min(...promedios)
        };
    }

    calcularDistribucion(promedios) {
        const distribucion = {
            '0.0-4.9': 0,
            '5.0-5.9': 0,
            '6.0-6.9': 0,
            '7.0-7.9': 0,
            '8.0-8.9': 0,
            '9.0-10.0': 0
        };

        promedios.forEach(promedio => {
            if (promedio >= 0.0 && promedio <= 4.9) {
                distribucion['0.0-4.9']++;
            } else if (promedio >= 5.0 && promedio <= 5.9) {
                distribucion['5.0-5.9']++;
            } else if (promedio >= 6.0 && promedio <= 6.9) {
                distribucion['6.0-6.9']++;
            } else if (promedio >= 7.0 && promedio <= 7.9) {
                distribucion['7.0-7.9']++;
            } else if (promedio >= 8.0 && promedio <= 8.9) {
                distribucion['8.0-8.9']++;
            } else if (promedio >= 9.0 && promedio <= 10.0) {
                distribucion['9.0-10.0']++;
            }
        });
        
        return distribucion;
    }

    mostrarAnalisis(matriz) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Analizar la matriz de calificaciones (9 Alumnos x 4 Parciales) ingresada por el usuario para obtener promedios, extremos y la distribución final de notas.</p>
            <p><strong>ENTRADAS:</strong> Matriz 9 x 4 (36 valores) de calificaciones (0 a 10), ingresada por el usuario.</p>
            <div class="matriz-container">
                <strong>Matriz de Calificaciones Ingresada (9x4):</strong>
                ${this.matrizToHTML(matriz)}
            </div>
            <p><strong>PROCESO:</strong> Se calculan los promedios por fila y se comparan individualmente contra los rangos de distribución.</p>
            <hr>
            <h3>SALIDA: Resultados y Distribución</h3>
        `;
        return html;
    }
    
    mostrarResultados(promediosAlumno, promedioMasAlto, promedioMasBajo, totalParcialesReprobados, distribucionFinal) {
        let html = `
            <h4>a) Promedio de Cada Alumno</h4>
            <ul class="list-results">
                ${promediosAlumno.map((p, i) => 
                    `<li>Alumno ${i + 1}: <strong>${p.toFixed(2)}</strong></li>`
                ).join('')}
            </ul>

            <h4>b) y c) Promedios Extremos</h4>
            <ul class="list-results">
                <li>Promedio más Alto: <strong>${promedioMasAlto.toFixed(2)}</strong></li>
                <li>Promedio más Bajo: <strong>${promedioMasBajo.toFixed(2)}</strong></li>
            </ul>
            
            <h4>d) Parciales Reprobados (Menores a 7.0)</h4>
            <p>Total de parciales reprobados: <strong>${totalParcialesReprobados}</strong></p>

            <h4>e) Distribución de Calificaciones Finales</h4>
            <table class="matriz tabla-resultados" style="max-width: 400px; margin: 20px auto;">
                <thead><tr><th>Rango de Nota</th><th>Alumnos</th></tr></thead>
                <tbody>
                    ${Object.entries(distribucionFinal).map(([rango, cantidad]) => 
                        `<tr><td>${rango}</td><td>${cantidad} Alumnos</td></tr>`
                    ).join('')}
                </tbody>
            </table>
        `;
        return html;
    }

    
    matrizToHTML(matriz) {
        let html = '<table class="matriz matriz-grande">';
        
        
        html += '<thead><tr><th>Alumno</th><th>Parcial 1</th><th>Parcial 2</th><th>Parcial 3</th><th>Parcial 4</th></tr></thead><tbody>';

        for (let i = 0; i < this.FILAS; i++) {
            html += `<tr><td style="text-align: left;"><strong>${i + 1}</strong></td>`;
            for (let j = 0; j < this.COLUMNAS; j++) {
                html += `<td>${matriz[i][j].toFixed(1)}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }
    
    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR: ${mensaje}</p>`;
    }
}

window.AnalisisCalificaciones = AnalisisCalificaciones;