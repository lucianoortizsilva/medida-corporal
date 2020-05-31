import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { MedidaService } from '../@services/medida.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Medida } from '../model';

@Component({
  selector: 'app-medida-atual',
  templateUrl: './medida-atual.component.html',
  styleUrls: ['./medida-atual.component.scss']
})
export class MedidaAtualComponent implements OnInit {
  
  formulario: FormGroup;



  constructor(private elementRef: ElementRef,
              private rendered2: Renderer2,
              private medidaService: MedidaService,
              private formBuilder: FormBuilder,
              private datepipe: DatePipe) { }



  ngOnInit(): void {
    this.inicializarFormulario_();
    this.medidaService.getMedidaAtual('lucianoortizsilva@gmail.com').subscribe(
      medida => {
        this.inicializarFormulario(medida);
    },
      err => {
        console.log('erro encontrado: ', err);
    });
  }



  inicializarFormulario(medida: Medida): void {
    this.formulario = this.formBuilder.group({
      dtCriacao: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
      peso: [medida.peso],
      pescoco: [medida.pescoco],
      torax: [medida.torax],
      cintura: [medida.cintura],
      quadril: [medida.quadril],
      bicepsE: [medida.bicepsE],
      bicepsD: [medida.bicepsD],
      antebracoE: [medida.antebracoE],
      antebracoD: [medida.antebracoD],
      coxaE: [medida.coxaE],
      coxaD: [medida.coxaD],
      panturrilhaE: [medida.panturrilhaE],
      panturrilhaD: [medida.panturrilhaD],
      usuario: [ {email : medida.usuario.email}]
    });
  }

  inicializarFormulario_(): void {
    this.formulario = this.formBuilder.group({
      dtCriacao: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
      peso: [null],
      pescoco: [null],
      torax: [null],
      cintura: [null],
      quadril: [null],
      bicepsE: [null],
      bicepsD: [null],
      antebracoE: [null],
      antebracoD: [null],
      coxaE: [null],
      coxaD: [null],
      panturrilhaE: [null],
      panturrilhaD: [null],
      usuario: [null],
    });
  }

}
