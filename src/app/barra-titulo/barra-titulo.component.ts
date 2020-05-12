import { Component, OnInit, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { Pagina } from '../model';

@Component({
  selector: 'app-barra-titulo',
  templateUrl: './barra-titulo.component.html',
  styleUrls: ['./barra-titulo.component.scss']
})
export class BarraTituloComponent implements OnChanges {

  @Input() pagina: Pagina;
  titulo: string;

  constructor(private elementRef: ElementRef, private rendered2: Renderer2) { 
    console.log();
  }

  ngOnChanges(): void {
    this.setTituloAndIcone();
  }
  
  setTituloAndIcone(): void {
    const element = this.elementRef.nativeElement.querySelector('#iconeTituloID');
    this.rendered2.removeAttribute(element, 'class');
    if (Pagina.medida_atual === this.pagina) {
      this.titulo = 'Medida Atual';
      this.rendered2.addClass(element, 'fas');
      this.rendered2.addClass(element, 'fa-weight');
    } else if (Pagina.medida_progresso === this.pagina) {
      this.titulo = 'Progresso';
      this.rendered2.addClass(element, 'fas');
      this.rendered2.addClass(element, 'fa-chart-line');
    } else{
      this.titulo = 'Novo';
      this.rendered2.addClass(element, 'fa');
      this.rendered2.addClass(element, 'fa-plus');
    }
  }

}