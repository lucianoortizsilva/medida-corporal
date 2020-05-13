import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MedidaService } from '../medida.service';

@Component({
  selector: 'app-medida-cadastro',
  templateUrl: './medida-cadastro.component.html',
  styleUrls: ['./medida-cadastro.component.scss']
})
export class MedidaCadastroComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef, 
               private rendered2: Renderer2,
               private medidaService: MedidaService) { }
  
  save(): void{
    const medida = {
      dtCriacao: 	new Date(),
      parametros: [
          { codigo: 1, 
            descricao: 'Peso', 
            valor: 99.3 
          },
          { codigo: 2, 
            descricao: 'Tórax', 
            valor: 108.2 
          }		
      ]
  };

  //this.medidaService.save();

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