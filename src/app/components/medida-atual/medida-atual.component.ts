import { Component, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Medida } from '../../model';

@Component({
  selector: 'app-medida-atual',
  templateUrl: './medida-atual.component.html',
  styleUrls: ['./medida-atual.component.scss']
})
export class MedidaAtualComponent implements OnInit {
  
  @Input() email: string;

  formulario: FormGroup;
  elements = null;
  headElements = ['Medida', 'Valor'];

  constructor(private medidaService: MedidaService,
              private formBuilder: FormBuilder,
              private datepipe: DatePipe) { }



  ngOnInit(): void {
    this.medidaService.getMedidaAtual(this.email).subscribe(
      medida => {
        this.inicializarTabela(medida);
    },
      err => {
        console.log('erro encontrado: ', err);
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
