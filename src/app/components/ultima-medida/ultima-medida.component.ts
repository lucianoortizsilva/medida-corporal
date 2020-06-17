import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { DatePipe } from '@angular/common';
import { Medida } from '../../model';

@Component({
  selector: 'app-ultima-medida',
  templateUrl: './ultima-medida.component.html',
  styleUrls: ['./ultima-medida.component.scss']
})
export class UltimaMedidaComponent implements OnInit {

  @Input() email: string;

  id: string;
  elements = null;
  headElements = null;
  registrosEncontrados = false;
  mensagem: string;
  tipoMensagem: string;

  constructor(private medidaService: MedidaService,
              private datepipe: DatePipe) {}



  ngOnInit(): void {
    this.loadUltimaMedida();
  }

  inicializarTabela(medida: Medida): void {
    this.headElements = ['Medida', 'Valor'];
    this.elements = [
      {dado: 'Data', valor: this.datepipe.transform(medida.dtCriacao, 'dd/MM/yyyy') },
      {dado: 'Peso', valor: medida.peso },
      {dado: 'Pescoço', valor: medida.pescoco },
      {dado: 'Tórax', valor: medida.torax },
      {dado: 'Cintura', valor: medida.cintura },
      {dado: 'Quadril', valor: medida.quadril },
      {dado: 'Bíceps Esquerdo', valor: medida.bicepsE },
      {dado: 'Bíceps Direito', valor: medida.bicepsD },
      {dado: 'Antebraço Esquerdo', valor: medida.antebracoE },
      {dado: 'Antebraço Direito', valor: medida.antebracoD },
      {dado: 'Coxa Esquerda', valor: medida.coxaE },
      {dado: 'Coxa Direita', valor: medida.coxaD },
      {dado: 'Panturrilha Esquerda', valor: medida.panturrilhaE },
      {dado: 'Panturrilha Direita', valor: medida.panturrilhaD },
    ];
  }
  
  deletar(): void{
    this.medidaService.deletarMedida(this.id).subscribe(data => {
      this.headElements = null;
      this.elements = null;
      this.mensagem = data['message'];
      this.tipoMensagem = 'success';
      this.registrosEncontrados = false;
      this.medidaService.setUltimaMedida(null);
      this.loadUltimaMedida();      
    });
  }

  fecharNotificacao(value: any){
    if (value) {
      this.mensagem = null;
      this.tipoMensagem = null;
    }
  }

  loadUltimaMedida(): void {
    this.medidaService.getMedidaAtual(this.email).subscribe(
      medida => {
        this.id = medida._id;
        this.inicializarTabela(medida);
        this.registrosEncontrados = true;
        this.medidaService.setUltimaMedida(medida);
    },
      err => {
        if(err.error.status === 500){
          this.mensagem = err.error.message;
          this.tipoMensagem = 'danger';
          this.registrosEncontrados = false;
        }
    });
  }
  
}