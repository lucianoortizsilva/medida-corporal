import { Component, OnInit } from '@angular/core';
import { Pagina } from '../model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  paginaSelecionada = Pagina.medida_atual;

  constructor() { }
  
  ngOnInit(): void {}

  setPagina(p: Pagina){
    this.paginaSelecionada = p;
  }
  

}
