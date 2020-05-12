import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-medida-cadastro',
  templateUrl: './medida-cadastro.component.html',
  styleUrls: ['./medida-cadastro.component.scss']
})
export class MedidaCadastroComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef, private rendered2: Renderer2) { }
  
  save(): void{
    //const element = this.elementRef.nativeElement.querySelector('#formCadastroID');
    //this.rendered2.addClass(element, 'was-validated');
    console.log('Save ok');
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