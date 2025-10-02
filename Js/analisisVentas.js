class AnalisisVentas {

    constructor() {
        this.MESES = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        this.DIAS = [
            "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
        ];
        
        this.MatrizVentas = [
            [10, 16, 10, 12, 24, 40, 55], 
            [10, 11, 18, 15, 41, 78, 14], 
            [51, 35, 22, 81, 15, 12, 50], 
            [12, 71, 10, 20, 70, 40, 60],
            [28, 22, 50, 50, 50, 36, 25], 
            [40, 70, 40, 11, 20, 20, 20], 
            [30, 12, 18, 10, 40, 32, 13], 
            [16, 50, 3, 24, 15, 82, 40], 
            [46, 15, 46, 22, 5, 10, 11], 
            [20, 25, 30, 40, 50, 60, 70], 
            [5, 10, 15, 20, 25, 30, 35], 
            [90, 80, 70, 60, 50, 40, 30]  
        ];

        this.FILAS = this.MatrizVentas.length;
        this.COLUMNAS = this.MatrizVentas[0].length;
    }

    async iniciarAnalisis() {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
        
        try {
            const matriz = this.MatrizVentas;

            const menorVenta = this.encontrarVentaExtrema(matriz, 'min');
            const mayorVenta = this.encontrarVentaExtrema(matriz, 'max');
            const ventaTotal = this.calcularVentaTotal(matriz);
            const ventaPorDia = this.calcularVentaPorDia(matriz);

            resultadosDiv.innerHTML = this.mostrarAnalisis(matriz);
            resultadosDiv.innerHTML += this.mostrarResultados(menorVenta, mayorVenta, ventaTotal, ventaPorDia);

        } catch (error) {
            this.mostrarError(error.message);
        }
    }
    
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
    
    calcularVentaTotal(matriz) {
        let total = 0;
        for (let i = 0; i < this.FILAS; i++) {
            for (let j = 0; j < this.COLUMNAS; j++) {
                total += matriz[i][j];
            }
        }
        return total;
    }

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
        
        this.DIAS.forEach((dia, index) => {
            html += `<li>${dia}: <strong>$${ventaPorDia[index]}.00</strong></li>`;
        });
        
        html += '</ul>';
        return html;
    }

    matrizToHTML(matriz) {
        let html = '<table class="matriz matriz-grande">';
        
        
        html += '<thead><tr><th>Mes</th>';
        this.DIAS.forEach(dia => {
            html += `<th>${dia.substring(0, 3)}</th>`; 
        });
        html += '</tr></thead><tbody>';

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
    
    mostrarError(mensaje) {
        document.getElementById('resultados').innerHTML = `<p class="error">ERROR: ${mensaje}</p>`;
    }
}

window.AnalisisVentas = AnalisisVentas;