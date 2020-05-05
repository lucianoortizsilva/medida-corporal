import { Component, OnInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../model';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  exibirMenu = false;

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(){}

  public onclickMenu(): void {
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
  }

}