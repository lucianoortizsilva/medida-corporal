import { Component, OnInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../model';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  exibirMenu = false;
  titulo = 'Progresso';

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(){}

  redimensionarMenu(): void {
    const element = this.elementRef.nativeElement.querySelector('.hamburguer-icone');
    this.exibirMenu = !this.exibirMenu;
    if (this.exibirMenu) {
      this.renderer.addClass(element, 'open');
    } else {
      this.renderer.removeClass(element, 'open');
    }
  }

  selecionarPagina(paginaSelecionada: any): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.redimensionarMenu();
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