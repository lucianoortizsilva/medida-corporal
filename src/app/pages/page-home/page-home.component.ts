import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Pagina } from 'src/app/model';
import { MedidaService } from 'src/app/services/medida.service';
import { FiltroService } from 'src/app/services/filtro.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {


  paginaSelecionada = Pagina.medida_progresso;
  autenticado = false;
  socialUser: SocialUser;
  exibirMenu = false;

  isMobile = false;
  isTablet = false;
  isDesktop = false;

  private mobileMaxSizeWidth = 425;
  private tabletMaxSizeWidth = 768;

  constructor(private authService: AuthService,
              private router: Router,
              private medidaService: MedidaService,
              private filtroService: FiltroService) {

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

    this.loadScreenSize();
  }



  ngOnInit(): void {}



  setPagina(p: Pagina){
    this.paginaSelecionada = p;
  }


  @HostListener('window:resize')
  loadScreenSize() {
    const scrWidth = window.innerWidth;
    if (scrWidth <= this.mobileMaxSizeWidth) {
        this.isMobile = true;
        this.isTablet = false;
        this.isDesktop = false;
      } else if (scrWidth <= this.tabletMaxSizeWidth) {
        this.isMobile = false;
        this.isTablet = true;
        this.isDesktop = false;
      } else {
        this.isMobile = false;
        this.isTablet = false;
        this.isDesktop = true;
      }
      this.filtroService.setResponsive({isMobile: this.isMobile, isTablet: this.isTablet, isDesktop: this.isDesktop});
    }

}
