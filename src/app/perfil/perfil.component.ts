import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MedidaService } from '../medida.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private medidaService: MedidaService, private changeDetectorRef:ChangeDetectorRef) { }

  altura = null;
  percentualGordura = null;


  
  ngOnInit(): void {
    this.medidaService.getMedidaAtual('lucianoortizsilva@gmail.com').subscribe(data => {
      this.altura = data.usuario.altura;
      this.calcularPercentualGordura(data.usuario.sexo, data.usuario.altura, data.cintura, data.pescoco, data.quadril);
    });
  }



  calcularPercentualGordura(sexo: string, altura: number, cintura: number, pescoco: number, quadril: number) {
    if ('M' === sexo) {
      this.percentualGordura = Number(((495 / (1.033 - 0.191 * Math.log10(cintura - pescoco) + 0.155 * Math.log10(168))) - 450).toFixed(2));
    } else {
      this.percentualGordura = Number(((495 / (1.296 - 0.350 * Math.log10(quadril + cintura - pescoco) + 0.221 * Math.log10(165))) - 450).toFixed(2));
    }
  }

}