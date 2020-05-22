import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiltroMedida, MedidaEnum } from '../model';
import { MedidaService } from '../medida.service';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
import { Subscription } from 'rxjs';


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
export class MedidaProgressoComponent implements OnInit, OnDestroy {
  
  filtroControl = new FormControl();
  filtros: FiltroMedida[];
  listaPesos = new Array();
  
  dadosPeso = new Array<number>();  
  dadosTorax = new Array<number>();
  dadosPescoco = new Array<number>();
  descricoes = new Array<string>();
    
  subscriptionMedidas: Subscription;
  
  constructor(private datepipe: DatePipe,
              private medidaService: MedidaService) { }



  ngOnInit(): void {
    this.loadFilters();
    this.onChangeFilter();  
    this.loadAllCharts();
  }
  


  ngOnDestroy(): void {
    this.subscriptionMedidas.unsubscribe();
  }



  private loadAllCharts(): void {
    this.subscriptionMedidas = this.medidaService.getMedidas().subscribe(medidas => {
      medidas.forEach(m => {
        this.dadosPeso.push(this.toNumber(m.peso));
        this.dadosTorax.push(this.toNumber(m.torax));
        this.dadosPescoco.push(this.toNumber(m.pescoco));
        this.descricoes.push(this.toDateFormat(m.dtCriacao));
      })
    });
  }



  private loadFilters(): void {
    this.filtros = [
      {codigo: null, descricao: 'Todas medidas'},
      {codigo: MedidaEnum.PESO, descricao: 'Peso'},
      {codigo: MedidaEnum.TORAX, descricao: 'Tórax'},
      {codigo: MedidaEnum.PESCOCO, descricao: 'Pescoço'}
    ];
  }



  private filtrar(filtro: FiltroMedida): void {        
    this.clearCharts();
    switch (filtro.codigo) {

      case MedidaEnum.PESO:
        this.medidaService.getMedidas().subscribe(medidas => {
          medidas.forEach(m => {
            this.dadosPeso.push(m.peso);
            this.descricoes.push(this.toDateFormat(m.dtCriacao));
          });
        });
        break;
      case MedidaEnum.TORAX:
        this.medidaService.getMedidas().subscribe(medidas => {
          medidas.forEach(m => {
            this.dadosTorax.push(m.torax);
            this.descricoes.push(this.toDateFormat(m.dtCriacao));
          });
        });
          break;          
      case MedidaEnum.PESCOCO:
        this.medidaService.getMedidas().subscribe(medidas => {
          medidas.forEach(m => {
            this.dadosPescoco.push(m.pescoco);
            this.descricoes.push(this.toDateFormat(m.dtCriacao));
          });
        });
          break;              
      default:
        this.loadAllCharts();
        break;
    
    }
  }



  private onChangeFilter(): void {
    this.filtroControl.valueChanges.subscribe(data =>{this.filtrar(data);})
  }



  private clearCharts(): void {
    this.dadosPeso = new Array();
    this.dadosTorax= new Array();
    this.dadosPescoco= new Array();
    this.descricoes = new Array();
  }



  private toDateFormat(dt: Date): string {
    return this.datepipe.transform(dt, 'dd/MM/yyyy');      ;
  }



  private toNumber(value: any): number {
    if (!isNull(value)  && value.typeof === undefined) {
      return Number(value);  
    }
    return 0.0;
  }
}