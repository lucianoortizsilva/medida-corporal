import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FiltroMedida, Medida } from '../model';
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
  descricoesPeso = new Array<string>();
  dadosTorax = new Array<number>();
  descricoesTorax = new Array<string>();
  
  medidas = new Array<Medida>();
    
  constructor(private element: ElementRef, public datepipe: DatePipe, private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.loadFiltros();
    this.onChangeFiltroPesquisa();  
    this.loadMedidas();  
  }

  loadMedidas(){
    this.medidaService.getMedidas().subscribe( obj => {
    for (let index = 0; index < obj['medidas'].length; index++) {
      const json = obj['medidas'][index];
      let medidaJSON: any = JSON.parse(json); 
      let medida: Medida = <Medida>medidaJSON;
      this.medidas.push(medida);
    }  
    this.processar();
    }, err =>{
      console.log('Ocorreu um erro inesperado: ', err);
    });      
  };
  
  processar(): void {
    for (let medida of this.medidas) {
      const descricao = this.datepipe.transform(medida.dtCriacao, 'dd/MM/yyyy');
      medida.parametros.forEach(param =>{
        switch (param.codigo) {        
          case 1:
            this.dadosPeso.push(param.valor);
            this.descricoesPeso.push(descricao);
            break;
          default:
            this.dadosTorax.push(param.valor);
            this.descricoesTorax.push(descricao);
            break;
        }
      });
     }
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  loadFiltros(): void {
    this.filtros = [{codigo: 0, descricao: 'Todas medidas'},{codigo: 1, descricao: 'Peso'},{codigo: 2, descricao: 'Tórax'}];
  }

  filtrar(filtro: FiltroMedida): void {    
    this.limparGraficos();
    this.medidaService.getMedidasBy(filtro).subscribe(obj => {
      for (let index = 0; index < obj['medidas'].length; index++) {
        const json = obj['medidas'][index];
        let medidaJSON: any = JSON.parse(json); 
        let medida: Medida = <Medida>medidaJSON;
        this.medidas.push(medida);
      }  
      this.processar();
    });    
  }

  onChangeFiltroPesquisa(): void {
    this.filtroControl.valueChanges.subscribe(data =>{this.filtrar(data);})
  }

  limparGraficos(): void {
    this.medidas = new Array();
    this.dadosPeso = new Array();
    this.dadosTorax= new Array();
    this.descricoesPeso = new Array();
    this.descricoesTorax = new Array();
  }

}