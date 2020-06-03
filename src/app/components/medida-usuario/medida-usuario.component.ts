import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/model';
import { MedidaService } from 'src/app/services/medida.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medida-usuario',
  templateUrl: './medida-usuario.component.html',
  styleUrls: ['./medida-usuario.component.scss']
})
export class MedidaUsuarioComponent implements OnInit {

  @Input() nome: string;
  @Input() urlFoto: any;
  @Input() email: string;

  percentualGordura: number;
  usuario: Usuario;
  imc: number;
  infoIMC = '---';
  infoGordura = '---';

  constructor(private medidaService: MedidaService) {}



  ngOnInit(): void {
    this.medidaService.getUsuario(this.email).subscribe(usuario => {
      this.usuario = usuario;
    });

    this.medidaService.getMedidaAtual(this.email).subscribe(medida => {
      this.medidaService.setUltimaMedida(medida);
    });

    this.medidaService.ultimaMedidaBehaviorSubject.subscribe(medida => {
      if (medida === null) {
        this.infoGordura = 'Aguardando 1ª medida';
        this.infoIMC = 'Aguardando 1ª medida';
      } else {
        this.calcularIMC(medida.peso, this.usuario.altura);
        this.calcularPercentualGordura(this.usuario.sexo, this.usuario.altura, medida.cintura, medida.pescoco, medida.quadril);
      }
    });
  }



  private calcularPercentualGordura(sexo: string, altura: number, cintura: number, pescoco: number, quadril: number) {
    if ('M' === sexo) {
      this.percentualGordura = Number(((495 / (1.033 - 0.191 * Math.log10(cintura - pescoco) + 0.155 * Math.log10(168))) - 450).toFixed(2));
    } else {
      this.percentualGordura = Number(((495 / (1.296 - 0.350 * Math.log10(quadril + cintura - pescoco) + 0.221 * Math.log10(165))) - 450).toFixed(2));
    }
    this.infoGordura = 'Conforme Marinha EUA';
  }



  private  calcularIMC(peso: number, altura: number): void{
    this.imc = Number((peso / (altura * altura)).toFixed(2));
    if (this.imc < 18.5) {
      this.infoIMC = 'Magro';
    } else if (this.imc < 24.9){
      this.infoIMC = 'Normal';
    } else if (this.imc < 29.9){
      this.infoIMC = 'Sobrepeso';
    } else if (this.imc < 39.9){
      this.infoIMC = 'Obeso';
    }else{
      this.infoIMC = 'Obeso Grave';
    }
  }



}
