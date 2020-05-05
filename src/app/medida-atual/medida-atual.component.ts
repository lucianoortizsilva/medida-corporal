import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medida-atual',
  templateUrl: './medida-atual.component.html',
  styleUrls: ['./medida-atual.component.scss']
})
export class MedidaAtualComponent implements OnInit {

  medidaAtual = { 
    dtCriacao: new Date(),
    parametros: [
      { descricao: 'Peso', valor: 82.2},
      { descricao: 'Tórax', valor: 108.3},
      { descricao: 'Bíceps Esquerdo', valor: 41.5},
      { descricao: 'Bíceps Direito', valor: 42.0},
      { descricao: 'Coxa Esquerda', valor: 62.3},
      { descricao: 'Coxa Direita', valor: 63.0},
      { descricao: 'Glúteo', valor: 104.2}
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
