import { Component, OnInit, ElementRef } from '@angular/core';

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

  dadosPeso = new Array<number>();
  descricoesPeso = new Array<string>();
  
  dadosTorax = new Array<number>();
  descricoesTorax = new Array<string>();
  
  medidas = [
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 99.3 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 98.2 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 91.7 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 91.4 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 87.0 },
    { dtCriacao: new Date(), cod: 2, descricao: 'Tórax', valor: 85.9 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 85.4 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 84.0 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 83.1 },
    { dtCriacao: new Date(), cod: 2, descricao: 'Tórax', valor: 82.8 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 82.8 },
    { dtCriacao: new Date(), cod: 1, descricao: 'Peso', valor: 82.2 },    
  ];

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    let i = 30;
    this.medidas.forEach(data => {      
      const codigo = data.cod;
      const dtAtualizadaFake = this.addDays(data.dtCriacao, i);      
      switch (codigo) {        
        case 1:
          this.dadosPeso.push(data.valor);
          this.descricoesPeso.push(dtAtualizadaFake.toLocaleDateString());
          i = i + 30;
          break;
        default:
          this.dadosTorax.push(data.valor);
          this.descricoesTorax.push(dtAtualizadaFake.toLocaleDateString());
          i = i + 30;
          break;
      }
    });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

}
