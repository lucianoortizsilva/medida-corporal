import { Component, OnInit, ElementRef, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  @Input() dados = Array<number[]>();
  @Input() descricoes = Array<string>();
  @Input() legenda = Array<string[]>();
  @Input() unidadeMedida: string;  
  grafico = [];


  constructor(private element: ElementRef, 
              private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(){
    this.create(this.unidadeMedida);
  }
  
  create(sufixo: string): void {
    const ctx = this.element.nativeElement.querySelector('.grafico');
    this.grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.descricoes,
        datasets: this.createDatasets(),
      },  
        options: {          
          title: {
            display: false,
            text: ['Titulo'],
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
                beginAtZero: false,
                fontColor: '#000',
                fontSize: 13,
                fontStyle	: 'bold',
                callback: function(label, index, labels) {            
                    return ' '  + label + ' ' + sufixo;
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
      this.changeDetectorRef.detectChanges();
  }  


  
  createDatasets(): Array<any> {
    const datasets = new Array<any>();

    if(this.dados[0] !== undefined ){
      datasets.push({
        label: this.legenda[0],
        data: this.dados[0],
        backgroundColor: '#2E64FE',
        borderColor: '#0000FF',
        borderWidth: 2,
        hoverBackgroundColor:'#58FA58',
        hoverBorderColor: '#04B45F',
        hoverBorderWidth: 3,
        barPercentage: 1.1,
        maxBarThickness: 21,   
      });
    }

    if(this.dados[1] !== undefined ){
      datasets.push({
        display: false,
        label: this.legenda[1],
        data: this.dados[1],
        backgroundColor: '#2E64FE',
        borderColor: '#0000FF',
        borderWidth: 2,
        hoverBackgroundColor:'#58FA58',
        hoverBorderColor: '#04B45F',
        hoverBorderWidth: 3,
        barPercentage: 1.1,
        maxBarThickness: 21,   
      });
    }
    return datasets;
  }

}
