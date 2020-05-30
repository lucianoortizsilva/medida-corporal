import { Component, OnInit } from '@angular/core';
import { MedidaService } from '../medida.service';

@Component({
  selector: 'app-medida-atual',
  templateUrl: './medida-atual.component.html',
  styleUrls: ['./medida-atual.component.scss']
})
export class MedidaAtualComponent implements OnInit {

  constructor(private medidaService: MedidaService) { }

  ngOnInit(): void {
    this.medidaService.getMedidaAtual('luciano.ortiz@gmail.com').subscribe(
      response => {
        console.log('response: ', response);
    },
      err => {
        console.log('erro encontrado: ', err);
    });
  }
}
