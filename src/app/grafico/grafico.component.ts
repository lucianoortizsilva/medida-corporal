import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit, OnChanges {

  @Input() dados = Array<number>();
  @Input() descricoes = Array<string>();
  @Input() legenda: string;
  @Input() unidadeMedida: string;  
  static labelSufixo = '';  
  grafico = [];


  constructor(private element: ElementRef) { }

  ngOnInit(){
    this.create();
  }
  
  ngOnChanges(){
    this.setLabelSufixo();
  }

  create(): void{
    const ctx = this.element.nativeElement.querySelector('.grafico');
    this.grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.descricoes,
        datasets: [          
          {
            label: this.legenda,
            data: this.dados,
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
                beginAtZero: true,
                fontColor: '#000',
                fontSize: 13,
                fontStyle	: 'bold',
                callback: function(label, index, labels) {                   
                    return ' '  + label + ' ' + GraficoComponent.getLabelSufixo();
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
  }  



  setLabelSufixo(): void {
    GraficoComponent.labelSufixo = this.unidadeMedida;    
  }



  static getLabelSufixo(): string {
    return this.labelSufixo;
  }

}
