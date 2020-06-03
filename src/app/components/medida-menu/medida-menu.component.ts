import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Pagina } from 'src/app/model';

@Component({
  selector: 'app-medida-menu',
  templateUrl: './medida-menu.component.html',
  styleUrls: ['./medida-menu.component.scss']
})
export class MedidaMenuComponent implements OnInit {

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();
  titulo = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  selecionarPagina(paginaSelecionada: any): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.setTitulo(paginaSelecionada);
  }

  setTitulo(paginaSelecionada: Pagina): void {
    switch (paginaSelecionada) {
      case Pagina.medida_cadastro: 
        this.titulo = 'Cadastrar Medida';
      break;
      case Pagina.medida_progresso: 
        this.titulo = 'Progresso';    
      break;
      default: 
        this.titulo = 'Medida Atual';
      break;
    }  
  }
}
