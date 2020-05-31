import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MedidaService } from '../@services/medida.service';
import { Medida } from '../model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private medidaService: MedidaService, private changeDetectorRef:ChangeDetectorRef) { }
  imc = null;
  altura = null;
  descricaoIMC = 'Calculando...';
  percentualGordura = null;


  
  ngOnInit(): void {
    this.medidaService.getMedidaAtual('lucianoortizsilva@gmail.com').subscribe(data => {
      this.setAltura(data);
      this.calcularIMC(data.peso, data.usuario.altura);
      this.calcularPercentualGordura(data.usuario.sexo, data.usuario.altura, data.cintura, data.pescoco, data.quadril);
    });
  }



  private calcularPercentualGordura(sexo: string, altura: number, cintura: number, pescoco: number, quadril: number) {
    if ('M' === sexo) {
      this.percentualGordura = Number(((495 / (1.033 - 0.191 * Math.log10(cintura - pescoco) + 0.155 * Math.log10(168))) - 450).toFixed(2));
    } else {
      this.percentualGordura = Number(((495 / (1.296 - 0.350 * Math.log10(quadril + cintura - pescoco) + 0.221 * Math.log10(165))) - 450).toFixed(2));
    }
  }



  private setAltura(m: Medida): void {
    this.altura = m.usuario.altura;
  }



  private  calcularIMC(peso: number, altura: number): void{
    this.imc = Number(peso / (altura * altura)).toFixed(2);
    if (this.imc < 18.5) {
      this.descricaoIMC = 'Magro';
    } else if(this.imc < 24.9){
      this.descricaoIMC = 'Normal';
    } else if(this.imc < 29.9){
      this.descricaoIMC = 'Sobrepeso';
    } else if(this.imc < 39.9){
      this.descricaoIMC = 'Obeso';
    }else{
      this.descricaoIMC = 'Obeso Grave';
    }
  }

}