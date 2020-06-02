import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { MedidaService } from '../@services/medida.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medida-cadastro',
  templateUrl: './medida-cadastro.component.html',
  styleUrls: ['./medida-cadastro.component.scss']
})
export class MedidaCadastroComponent implements OnInit {

  formulario: FormGroup;



  constructor(private elementRef: ElementRef,
              private rendered2: Renderer2,
              private medidaService: MedidaService,
              private formBuilder: FormBuilder,
              private datepipe: DatePipe) { }



  ngOnInit() {
    this.inicializarFormulario();
  }



  onSubmit(): void {
    if (this.formulario.valid) {
      const body = JSON.stringify(this.formulario.value);
      this.medidaService.save(body).subscribe( (data: HttpResponseBase) => {
        this.removeStyleValidacoes();
        this.inicializarFormulario();
      }, (err: HttpErrorResponse) => {
        /**
         * TODO: Adicionar mensagem de erro p\ usuário
         */
        console.log('Ocorreu um erro no servidor: ', err);
      });
    } else {
      this.addStyleValidacoes();
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



  addStyleValidacoes(): void {
    const elementForm = this.elementRef.nativeElement.querySelector('.needs-validation');
    this.rendered2.addClass(elementForm, 'was-validated');      
  }



  removeStyleValidacoes(): void {
    const elementForm = this.elementRef.nativeElement.querySelector('.needs-validation');
    this.rendered2.removeClass(elementForm, 'was-validated'); 
  }

}
