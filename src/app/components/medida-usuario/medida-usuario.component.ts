import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/model';
import { MedidaService } from 'src/app/services/medida.service';

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
  descricaoIMC: string;
  usuario: Usuario;
  imc: number;


  constructor(private medidaService: MedidaService) { 
  }
  
  
  
  ngOnInit(): void {
    this.medidaService.getUsuario(this.email).subscribe(usuario => {
      this.usuario = usuario;
      this.medidaService.getMedidaAtual(this.email).subscribe(medida => {
        this.calcularIMC(medida.peso, this.usuario.altura);
        this.calcularPercentualGordura(this.usuario.sexo, this.usuario.altura, medida.cintura, medida.pescoco, medida.quadril);
      });
    });
  }


  
  private calcularPercentualGordura(sexo: string, altura: number, cintura: number, pescoco: number, quadril: number) {
    if ('M' === sexo) {
      this.percentualGordura = Number(((495 / (1.033 - 0.191 * Math.log10(cintura - pescoco) + 0.155 * Math.log10(168))) - 450).toFixed(2));
    } else {
      this.percentualGordura = Number(((495 / (1.296 - 0.350 * Math.log10(quadril + cintura - pescoco) + 0.221 * Math.log10(165))) - 450).toFixed(2));
    }
  }



  private  calcularIMC(peso: number, altura: number): void{
    this.imc = Number((peso / (altura * altura)).toFixed(2));
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
