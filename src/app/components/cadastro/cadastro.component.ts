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

  @Input() email: string;

  formulario: FormGroup;
  mensagem: string;
  tipoMensagem: string;


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
        this.mensagemSucesso();
      }, (err: HttpErrorResponse) => {
        this.mensagem = err.error.message;
        this.tipoMensagem = 'danger';
      });
    } else {
      this.mensagemCampoObrigatorio();
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
    medida.peso = this.convertValue(form.value.peso);
    medida.pescoco = this.convertValue(form.value.pescoco);
    medida.torax = this.convertValue(form.value.torax);
    medida.cintura = this.convertValue(form.value.cintura);
    medida.quadril = this.convertValue(form.value.quadril);
    medida.bicepsE = this.convertValue(form.value.bicepsE);
    medida.bicepsD = this.convertValue(form.value.bicepsD);
    medida.antebracoE = this.convertValue(form.value.antebracoE);
    medida.antebracoD = this.convertValue(form.value.antebracoD);
    medida.coxaE = this.convertValue(form.value.coxaE);
    medida.coxaD = this.convertValue(form.value.coxaD);
    medida.panturrilhaE = this.convertValue(form.value.panturrilhaE);
    medida.panturrilhaD = this.convertValue(form.value.panturrilhaD);
    medida.usuario = new Usuario();
    medida.usuario.email = this.email;
    return medida;
  }

  convertValue(value: number): number {
    if (value.toString().length >= 3) {
      return value / 10;
    } else {
      return value;
    }
  }

  private mensagemCampoObrigatorio(): void {
    this.mensagem = "Preencha todos campos!";
    this.tipoMensagem = 'danger';
  }

  private mensagemSucesso(): void {
    this.mensagem = "Cadastro Ok!";
    this.tipoMensagem = 'success';
  }

  fecharNotificacao(value: any){
    if (value) {
      this.mensagem = null;
      this.tipoMensagem = null;
    }
  }

}
