/**
 * Clase AnalisisVentas para resolver el Ejercicio 6.
 * Analiza una matriz de ventas (Meses x Días) para encontrar extremos y totales.
 */
class AnalisisVentas {

    constructor() {
        this.MESES = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        this.DIAS = [
            "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
        ];
        
        // Matriz de 12 filas (Meses) x 7 columnas (Días de la semana)
        // Nota: Los datos originales de la práctica son ambiguos en la tabla, se usa un ejemplo
        // de matriz 12x7 con datos realistas para este tipo de análisis.
        this.MatrizVentas = [
            [10, 16, 10, 12, 24, 40, 55], // Enero (ejemplo de datos)
            [10, 11, 18, 15, 41, 78, 14], // Febrero
            [51, 35, 22, 81, 15, 12, 50], // Marzo
            [12, 71, 10, 20, 70, 40, 60], // Abril
            [28, 22, 50, 50, 50, 36, 25], // Mayo
            [40, 70, 40, 11, 20, 20, 20], // Junio
            [30, 12, 18, 10, 40, 32, 13], // Julio
            [16, 50, 3, 24, 15, 82, 40], // Agosto
            [46, 15, 46, 22, 5, 10, 11], // Septiembre (Valores ajustados para consistencia)
            [20, 25, 30, 40, 50, 60, 70], // Octubre
            [5, 10, 15, 20, 25, 30, 35], // Noviembre
            [90, 80, 70, 60, 50, 40, 30]  // Diciembre
        ];

        this.FILAS = this.MatrizVentas.length;
        this.COLUMNAS = this.MatrizVentas[0].length;
    }

    /**
     * Punto de entrada principal para ejecutar el análisis (Entrada, Proceso, Salida).
     */
    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const matriz = this.MatrizVentas;

            // 1. PROCESO: Análisis
            const menorVenta = this.encontrarVentaExtrema(matriz, 'min');
            const mayorVenta = this.encontrarVentaExtrema(matriz, 'max');
            const ventaTotal = this.calcularVentaTotal(matriz);
            const ventaPorDia = this.calcularVentaPorDia(matriz);

            // 2. SALIDA: Mostrar el análisis y el resultado
            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(menorVenta, mayorVenta, ventaTotal, ventaPorDia);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }
    
    // --- Lógica de Análisis ---

    /**
     * Busca la venta extrema (min o max) y su ubicación.
     * @param {number[][]} matriz - Matriz de ventas.
     * @param {string} tipo - 'min' o 'max'.
     * @returns {{valor: number, mes: string, dia: string}}
     */
    encontrarVentaExtrema(matriz, tipo) {
        let extrema = matriz[0][0];
        let mesIndex = 0;
        let diaIndex = 0;

        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLUMNAS; j++) {
                const valor = matriz[i][j];
                const condicion = tipo === 'min' ? valor < extrema : valor > extrema;
                
                if (condicion) {
                    extrema = valor;
                    mesIndex = i;
                    diaIndex = j;
                }
            }
        }
        
        return {
            valor: extrema,
            mes: this.MESES[mesIndex],
            dia: this.DIAS[diaIndex]
        };
    }
    
    /**
     * Calcula la suma total de todas las ventas.
     * @returns {number} Venta total.
     */
    calcularVentaTotal(matriz) {
        let total = 0;
        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLUMNAS; j++) {
                total += matriz[i][j];
            }
        }
        return total;
    }

    /**
     * Calcula la suma de las ventas por cada día de la semana (suma por columna).
     * @returns {number[]} Arreglo con la venta total por día.
     */
    calcularVentaPorDia(matriz) {
        let ventaPorDia = new Array(this.COLUMNAS).fill(0);
        
        for (let j = 0; j < this.COLUMNAS; j++) {
            let sumaDia = 0;
            for (let i = 0; i < this.FILAS; i++) {
                sumaDia += matriz[i][j];
            }
            ventaPorDia[j] = sumaDia;
        }
        return ventaPorDia;
    }

    // --- Métodos de Presentación (ANÁLISIS y SALIDA) ---

    mostrarAnalisis(matriz) {
        let html = `
            <h2>ANÁLISIS DEL PROBLEMA</h2>
            <p><strong>DESCRIPCIÓN:</strong> Analizar la matriz 12 x 7 de ventas (Meses vs Días) para encontrar la venta máxima, mínima, la venta total y la suma de ventas por día.</p>
            <p><strong>ENTRADAS:</strong> Matriz 12 x 7 con datos predefinidos (12 meses, 7 días).</p>
            <p><strong>PROCESO:</strong> Se recorre la matriz para calcular los extremos y se suma por filas y columnas para obtener los totales.</p>
            <hr>
            <h3>SALIDA: Matriz de Ventas y Resultados</h3>
            <h4>Matriz de Ventas:</h4>
            <div class="matriz-container">
                ${this.matrizToHTML(matriz)}
            </div>
            <hr>
        `;
        return html;
    }
    
    mostrarResultados(menorVenta, mayorVenta, ventaTotal, ventaPorDia) {
        let html = `
            <h4>a) Menor Venta Realizada</h4>
            <p>La menor venta fue de <strong>$${menorVenta.valor}.00</strong>, realizada en **${menorVenta.mes}** el día **${menorVenta.dia}**.</p>
            
            <h4>b) Mayor Venta Realizada</h4>
            <p>La mayor venta fue de <strong>$${mayorVenta.valor}.00</strong>, realizada en **${mayorVenta.mes}** el día **${mayorVenta.dia}**.</p>
            
            <h4>c) Venta Total</h4>
            <p>La venta total del año es: <strong>$${ventaTotal}.00</strong></p>

            <h4>d) Venta por Día (Suma por Columna)</h4>
            <ul class="list-results ventas-por-dia">
        `;
        
        // Formato: Ej. Lunes: $x.00, Martes: $x.00, etc.
        this.DIAS.forEach((dia, index) => {
            html += `<li>${dia}: <strong>$${ventaPorDia[index]}.00</strong></li>`;
        });
        
        html += '</ul>';
        return html;
    }

    // Utilidad: Genera la tabla HTML para la matriz (con encabezados)
    matrizToHTML(matriz) {
        let html = '<table class="matriz matriz-grande">';
        
        // Encabezados de Días
        html += '<thead><tr><th>Mes</th>';
        this.DIAS.forEach(dia => {
            html += `<th>${dia.substring(0, 3)}</th>`; // Mostrar solo 3 letras para ahorrar espacio
        });
        html += '</tr></thead><tbody>';

        // Filas de Ventas (Meses)
        for (let i = 0; i < this.FILAS; i++) {
            html += `<tr><td style="text-align: left;"><strong>${this.MESES[i]}</strong></td>`;
            for (let j = 0; j < this.COLUMNAS; j++) {
                html += `<td>${matriz[i][j]}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }
    
    // Utilidad: Muestra errores de validación
    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR: ${mensaje}</p>`;
    }
}

// Exponer la clase globalmente.
window.AnalisisVentas = AnalisisVentas;