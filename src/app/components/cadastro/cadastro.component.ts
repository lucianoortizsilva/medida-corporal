import { Component, OnInit, Input } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Medida, Usuario } from 'src/app/model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;
  @Input() email: string;


  constructor(private medidaService: MedidaService,
              private formBuilder: FormBuilder,
              private datepipe: DatePipe) { }



  ngOnInit() {
    this.inicializarFormulario();
  }



  onSubmit(): void {
    if (this.formulario.valid) {
      const medida = this.createMedida(this.formulario);
      const body = JSON.stringify(medida);
      this.medidaService.saveMedida(body).subscribe( (data: HttpResponseBase) => {
        this.medidaService.setUltimaMedida(medida);
        this.inicializarFormulario();
      }, (err: HttpErrorResponse) => {
        if (err.status === 409) {
            console.log(err);
        }
      });
    } else {
      /**
         * TODO: Adicionar mensagem de erro p\ usuário
      */
    }
  }



  inicializarFormulario(): void {
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
      usuario: [{email : 'lucianoortizasilva@gmail.com'}]
    });
  }



  createMedida(form: FormGroup): Medida{
    const medida = new Medida();
    medida.dtCriacao = form.value.dtCriacao;
    medida.peso = form.value.peso;
    medida.pescoco = form.value.pescoco.toString().length > 2 ? form.value.pescoco / 10 : form.value.pescoco;
    medida.torax = form.value.torax;
    medida.cintura = form.value.cintura;
    medida.quadril = form.value.quadril;
    medida.bicepsE = form.value.bicepsE.toString().length > 2 ? form.value.bicepsE / 10 : form.value.bicepsE;
    medida.bicepsD = form.value.bicepsD.toString().length > 2 ? form.value.bicepsD / 10 : form.value.bicepsD;
    medida.antebracoE = form.value.antebracoE.toString().length > 2 ? form.value.antebracoE / 10 : form.value.antebracoE;
    medida.antebracoD = form.value.antebracoD.toString().length > 2 ? form.value.antebracoD / 10 : form.value.antebracoD;
    medida.coxaE = form.value.coxaE.toString().length > 2 ? form.value.coxaE / 10 : form.value.coxaE;
    medida.coxaD = form.value.coxaD.toString().length > 2 ? form.value.coxaD / 10 : form.value.coxaD;
    medida.panturrilhaE = form.value.panturrilhaE.toString().length > 2 ? form.value.panturrilhaE / 10 : form.value.panturrilhaE;
    medida.panturrilhaD = form.value.panturrilhaD.toString().length > 2 ? form.value.panturrilhaD / 10 : form.value.panturrilhaD;
    medida.usuario = new Usuario();
    medida.usuario.email = this.email;
    return medida;
  }


}
