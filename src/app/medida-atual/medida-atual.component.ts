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
    this.medidaService.getMedidaByEmail('lucianoortizsilva@gmail.com').subscribe(data => {
      console.log('by email: ', data);
    });
  }

}
