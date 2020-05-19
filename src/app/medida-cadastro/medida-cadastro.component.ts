import { Component, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { MedidaService } from '../medida.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-medida-cadastro',
  templateUrl: './medida-cadastro.component.html',
  styleUrls: ['./medida-cadastro.component.scss']
})
export class MedidaCadastroComponent implements OnInit, AfterViewInit {

  formulario: FormGroup;

  constructor(private elementRef: ElementRef, 
               private rendered2: Renderer2,
               private medidaService: MedidaService,
               private formBuilder: FormBuilder) { }
  
  ngOnInit(){
    this.formulario = this.formBuilder.group({
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
      panturrilhaD: [null]
    });

  }

  onSubmit(): void{
    console.log(JSON.stringify(this.formulario.value));
  }
 
  ngAfterViewInit(): void {
    this.inicializarEventosDeValidacaoDoFormulario();
  }

  /**
   * 
   * https://getbootstrap.com/docs/4.1/components/forms/
   * 
   */
  inicializarEventosDeValidacaoDoFormulario(): void {
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }
}