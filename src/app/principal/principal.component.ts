import { Component, OnInit, EventEmitter, Output, Renderer2, ElementRef } from '@angular/core';
import { Pagina } from '../model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  paginaSelecionada = Pagina.medida_cadastro;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    
  

  setPagina(p: Pagina){
    this.paginaSelecionada = p;
  }
  

  exibirMenu = false;
  titulo = 'Progresso';

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();

  
  ngOnInit(){}

  selecionarPagina(paginaSelecionada: any): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.w3_close();
    this.setTitulo(paginaSelecionada);
    this.paginaSelecionada = paginaSelecionada;
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
