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

  elements = null;
  headElements = ['Medida', 'Valor'];
  registrosEncontrados = false;

  constructor(private medidaService: MedidaService,
              private datepipe: DatePipe) {}



  ngOnInit(): void {
    this.medidaService.getMedidaAtual(this.email).subscribe(
      medida => {
        this.inicializarTabela(medida);
        this.registrosEncontrados = true;
    },
      err => {
        if (err.status === 404) {
          this.registrosEncontrados = false;
        }
    });
  }



  inicializarTabela(medida: Medida): void {
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


}