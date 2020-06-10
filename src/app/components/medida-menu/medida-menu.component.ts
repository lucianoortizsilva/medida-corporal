import { Component, OnInit, EventEmitter, Output, ElementRef, Renderer2 } from '@angular/core';
import { Pagina } from 'src/app/model';

@Component({
  selector: 'app-medida-menu',
  templateUrl: './medida-menu.component.html',
  styleUrls: ['./medida-menu.component.scss']
})
export class MedidaMenuComponent implements OnInit {

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();
  titulo = '';
  
  constructor(private elementRef: ElementRef, private rendered2: Renderer2) { }

  ngOnInit(): void {
    this.loadStyleButton();
  }



  selecionarPagina(paginaSelecionada: any, id: string): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.setTitulo(paginaSelecionada);    
    this.setStyleButton(id);
  }



  loadStyleButton(): void{
    const btnElement = this.elementRef.nativeElement.querySelector('#btnProgresso');
    this.rendered2.addClass(btnElement, 'btn-selecionado');
  };



  setStyleButton(id: string): void {
    const btnNovoElement = this.elementRef.nativeElement.querySelector('#btnNovo');
    const btnProgressoElement = this.elementRef.nativeElement.querySelector('#btnProgresso');
    const btnAtualElement = this.elementRef.nativeElement.querySelector('#btnAtual');
    if ('#btnNovo' === id) {
      this.rendered2.removeClass(btnProgressoElement, 'btn-selecionado');
      this.rendered2.removeClass(btnAtualElement, 'btn-selecionado');
      this.rendered2.addClass(btnNovoElement, 'btn-selecionado');
    } else if ('#btnProgresso' === id) {
      this.rendered2.removeClass(btnNovoElement, 'btn-selecionado');
      this.rendered2.removeClass(btnAtualElement, 'btn-selecionado');
      this.rendered2.addClass(btnProgressoElement, 'btn-selecionado');
    } else {
      this.rendered2.removeClass(btnProgressoElement, 'btn-selecionado');
      this.rendered2.removeClass(btnNovoElement, 'btn-selecionado');
      this.rendered2.addClass(btnAtualElement, 'btn-selecionado');
    }    
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
