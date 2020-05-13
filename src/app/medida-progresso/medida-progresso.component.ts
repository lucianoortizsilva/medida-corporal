import { Component, OnInit, ElementRef } from '@angular/core';
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
  
  medidas = [];
    
  constructor(private element: ElementRef, public datepipe: DatePipe, private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.loadFiltros();
    this.onChangeFiltroPesquisa();  
    this.loadMedidas();  
  }
    
  loadMedidas(){
    this.medidaService.getMedidas().subscribe( response => {

      console.log('pega essaaaaaaa: ', response);
      /*
     for (let m of response['medidas']) {
        this.medidas.push(m);
      }
      this.processar();
    }, err =>{
      console.log('Ocorreu um erro inesperado: ', err);
    });      
    */
    
    });
  }

  processar(): void {
    this.medidas.forEach(m => {   
      console.log(m.dtCriacao);
      const codigo = m.codigo;
      const descricao = this.datepipe.transform(m.dtCriacao, 'dd/MM/yyyy');
      switch (codigo) {        
        case 1:
          this.dadosPeso.push(m.valor);
          this.descricoesPeso.push(descricao);
          break;
        default:
          this.dadosTorax.push(m.valor);
          this.descricoesTorax.push(descricao);
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