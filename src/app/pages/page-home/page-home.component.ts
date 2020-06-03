import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Pagina } from 'src/app/model';
import { MedidaService } from 'src/app/services/medida.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {



  paginaSelecionada = Pagina.medida_cadastro;
  autenticado = false;
  socialUser: SocialUser;
  exibirMenu = false;

  constructor(private authService: AuthService,
              private router: Router,
              private elementRef: ElementRef,
              private renderer: Renderer2,
              private medidaService: MedidaService) {

    this.authService.authState.subscribe(data => {
      if (data === null) {
        this.router.navigate(['/login']);
      } else {
        this.medidaService.getUsuario(data.email).subscribe(usuario => {
          if (usuario === null) {
            this.router.navigate(['/login']);
          } else {
            this.socialUser = data;
            this.autenticado = true;
          }
        });
      }
    });
  }



  ngOnInit(): void {}



  setPagina(p: Pagina){
    this.paginaSelecionada = p;
  }

}
