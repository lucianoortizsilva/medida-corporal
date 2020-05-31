import { Component, OnInit, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
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

  selecionarPagina(paginaSelecionada: any): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.w3_close();
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

  w3_open(): void {
    const mySidebar = this.elementRef.nativeElement.querySelector('#menu-conteudo');
    const myOverlay = this.elementRef.nativeElement.querySelector('#menu-sombra-fundo');
    this.renderer.setStyle(mySidebar, 'display', 'block');
    this.renderer.setStyle(myOverlay, 'display', 'block');
  }

  w3_close(): void{
    const mySidebar = this.elementRef.nativeElement.querySelector('#menu-conteudo');
    const myOverlay = this.elementRef.nativeElement.querySelector('#menu-sombra-fundo');
    this.renderer.setStyle(mySidebar, 'display', 'none');
    this.renderer.setStyle(myOverlay, 'display', 'none');
  }

}

