import { Component, OnInit, ElementRef, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { FiltroService } from 'src/app/services/filtro.service';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  @Input() dados = Array<number[]>();
  @Input() descricoes = Array<string>();
  @Input() legenda = Array<string[]>();
  @Input() backgroundColors = Array<string[]>();
  @Input() borderColors = Array<string[]>();
  @Input() unidadeMedida: string;

  isMobile = false;
  isTablet = false;
  isDesktop = false;
  grafico = [];


  constructor(private element: ElementRef,
              private changeDetectorRef:ChangeDetectorRef,
              private filtroService: FiltroService) { }

  ngOnInit(){
    this.filtroService.responsiveBehaviorSubject.subscribe(data => {
      this.isMobile = data.isMobile;
      this.isTablet = data.isTablet;
      this.isDesktop = data.isDesktop;
      if(data != null && (this.isDesktop || this.isTablet || this.isMobile)){
        this.create(this.unidadeMedida);
      }
    });
  }
  
  create(sufixo: string): void {
    const css = this.isMobile ? '.graficoMobile' : '.grafico';
    const ctx = this.element.nativeElement.querySelector(css);
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
              fontColor: '#000',
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
                maxTicksLimit: 6,
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
        display: true,
        label: this.legenda[0],
        data: this.dados[0],
        backgroundColor: this.backgroundColors[0],
        borderColor: this.borderColors[0],
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
        display: true,
        label: this.legenda[1],
        data: this.dados[1],
        backgroundColor: this.backgroundColors[1],
        borderColor: this.borderColors[1],
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
