import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiltroMedida, Medida, MedidaEnum } from '../model';
import { MedidaService } from '../medida.service';
import { DatePipe } from '@angular/common';


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
  dadosTorax = new Array<number>();
  descricoesPeso = new Array<string>();
  descricoesTorax = new Array<string>();
    
  constructor(private element: ElementRef, private datepipe: DatePipe, private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.loadFiltros();
    this.onChangeFiltroPesquisa();  
    //this.loadAllGraficos();
  }
  
  private loadAllGraficos(): void {
    this.loadGraficoPesos();
    this.loadGraficosTorax();
  }

  private loadGraficoPesos(): void {
    this.medidaService.getMedidasByID(MedidaEnum.PESO).subscribe(medidas => {
      medidas.forEach(m => {
        const descricao = this.formatarDate(m.dtCriacao);
        //this.dadosPeso.push(m.valor);
        this.descricoesPeso.push(descricao);
      })
    });
  }

  private loadGraficosTorax(): void {
    this.medidaService.getMedidasByID(MedidaEnum.TORAX).subscribe(medidas => {
      medidas.forEach(m => {
        const descricao = this.formatarDate(m.dtCriacao);
        //this.dadosTorax.push(m.valor);
        this.descricoesTorax.push(descricao);
      })
    });
  }

  private loadFiltros(): void {
    this.filtros = [
      {codigo: null, descricao: 'Todas medidas'},
      {codigo: MedidaEnum.PESO, descricao: 'Peso'},
      {codigo: MedidaEnum.TORAX, descricao: 'Tórax'}
    ];
  }

  private filtrar(filtro: FiltroMedida): void {    
    this.limparGraficos();
    switch (filtro.codigo) {
      case MedidaEnum.PESO:
        this.loadGraficoPesos();
        break;
      case MedidaEnum.TORAX:
          this.loadGraficosTorax();
          break;          
      default:
          this.loadGraficoPesos();
          this.loadGraficosTorax();
        break;
    }
  }

  private onChangeFiltroPesquisa(): void {
    this.filtroControl.valueChanges.subscribe(data =>{this.filtrar(data);})
  }

  private limparGraficos(): void {
    this.dadosPeso = new Array();
    this.dadosTorax= new Array();
    this.descricoesPeso = new Array();
    this.descricoesTorax = new Array();
  }

  private formatarDate(dt: Date): string {
    return this.datepipe.transform(dt, 'dd/MM/yyyy');      ;
  }

}