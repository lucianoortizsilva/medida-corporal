import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiltroMedida } from '../model';
import { MedidaService } from '../medida.service';

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
  
  filtroControl = new FormControl();
  filtros: FiltroMedida[];
  listaPesos = new Array();
  grafico = [];
  dadosPeso = new Array<number>();
  descricoesPeso = new Array<string>();
  dadosTorax = new Array<number>();
  descricoesTorax = new Array<string>();
  
  medidas = [
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 99.3 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 98.2 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 91.7 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 91.4 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 87.0 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 2, descricao: 'Tórax', valor: 85.9 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 85.4 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 84.0 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 83.1 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 2, descricao: 'Tórax', valor: 82.8 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 82.8 },
    { dtCriacao: this.addDays(new Date(), 1), codigo: 1, descricao: 'Peso', valor: 82.2 },    
  ];

  constructor(private element: ElementRef, private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.loadFiltros();
    this.onChangeFiltroPesquisa();
    
    this.medidas.forEach(data => {      
      const codigo = data.codigo;
      switch (codigo) {        
        case 1:
          this.dadosPeso.push(data.valor);
          this.descricoesPeso.push(data.dtCriacao.toLocaleDateString());
          break;
        default:
          this.dadosTorax.push(data.valor);
          this.descricoesTorax.push(data.dtCriacao.toLocaleDateString());
          break;
      }
    });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  loadFiltros(): void {
    this.filtros = [{codigo: 0, descricao: 'Todas medidas'},{codigo: 1, descricao: 'Peso'},{codigo: 2, descricao: 'Tórax'}];
  }

  filtrar(f: FiltroMedida): void {
    console.log('filtrar por: ', f);
  }

  onChangeFiltroPesquisa(): void {
    this.filtroControl.valueChanges.subscribe(data =>{this.filtrar(data);})
  }

}