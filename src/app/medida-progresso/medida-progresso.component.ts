import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { getLocaleDayPeriods } from '@angular/common';

/**
 * 
 * DOC Chart.js https://www.chartjs.org/docs/latest/
 * 
 */
@Component({
  selector: 'app-medida-progresso',
  templateUrl: './medida-progresso.component.html',
  styleUrls: ['./medida-progresso.component.scss']
})
export class MedidaProgressoComponent implements OnInit {

  listaPesos = new Array();
  grafico = [];

  medidas = [
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 99.3 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 98.2 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 91.7 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 91.4 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 87.0 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 85.9 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 85.4 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 84.0 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 83.1 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 82.8 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 82.8 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 82.2 },    
  ];

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const dados = new Array();
    const descricoes = new Array();

    let i = 30;

    this.medidas.forEach(data => {
      dados.push(data.valor);
      const dtAtualizada = this.addDays(data.dtCriacao, i);
      descricoes.push(dtAtualizada.toLocaleDateString());
      i = i + 30;
    });

    const ctx = this.element.nativeElement.querySelector('.grafico');
    /*
    this.grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: descricoes,
        datasets: [          
          {
            label: 'Peso (kg)',
            data: dados,
            backgroundColor: '#2E64FE',
            borderColor: '#0000FF',
            borderWidth: 2,
            hoverBackgroundColor:'#58FA58',
            hoverBorderColor: '#04B45F',
            hoverBorderWidth: 3,
            barPercentage: 1.1,
            maxBarThickness: 21,   
          }
          ],
      },  
        options: {          
          title: {
            display: true,
            text: ['Últimas 12 medidas de peso'],
            fontSize: 15
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              fontColor: '#FE2E2E',
              fontSize: 14
            }
          },
          tooltips: {
            titleAlign: 'center',
            bodyFontSize: 14,
            footerFontSize: 18            
          },
          scales: {
            xAxes: [{
                display: true,                  
                ticks: {
                  fontColor: '#000',
                  fontSize: 13,
                  fontStyle	: 'bold', 
                },
                gridLines : {
                  display: true,
                  color: '#BDBDBD',
                }
              }],
            yAxes: [{
              display: true,               
              ticks: {
                fontColor: '#000',
                fontSize: 13,
                fontStyle	: 'bold',
                callback: function(label, index, labels){                  
                  return ' '  + label + ' kg';
                  },
                },
                gridLines : {
                  display: true,
                  color: '#BDBDBD',
                },
            }],
          },          
        }
      });
      */
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
}
