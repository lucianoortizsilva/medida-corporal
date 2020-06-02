import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer2, ɵConsole } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { Pagina } from 'src/app/model';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  @Output() paginaSelecionadaEventEmitter = new EventEmitter<Pagina>();

  autenticado = false;
  paginaSelecionada = Pagina.medida_atual;
  socialUser: SocialUser;
  exibirMenu = false;
  titulo = '';

  constructor(private authService: AuthService, private router: Router, private elementRef: ElementRef, private renderer: Renderer2) { 
    this.authService.authState.subscribe(data => {
      if (data === null) {
        this.router.navigate(['/login']);
      } else {
        this.socialUser = data;
        this.autenticado = true;
      }
    });  
  }

  ngOnInit(): void {}


  setPagina(p: Pagina){
    this.paginaSelecionada = p;
  }

  selecionarPagina(paginaSelecionada: any): void {
    this.paginaSelecionadaEventEmitter.emit(paginaSelecionada);
    this.w3_close();
    this.setTitulo(paginaSelecionada);
    this.paginaSelecionada = paginaSelecionada;
  }

  setTitulo(paginaSelecionada: Pagina): void {
    switch (paginaSelecionada) {
      case Pagina.medida_cadastro: 
        this.titulo = 'Cadastrar Medida';
      break;
      case Pagina.medida_progresso: 
        this.titulo = 'Progresso';    
      break;
      default: 
        this.titulo = 'Medida Atual';
      break;
    }  
  }

  w3_open(): void {
    const mySidebar = this.elementRef.nativeElement.querySelector('#menu-conteudo');
    const myOverlay = this.elementRef.nativeElement.querySelector('#menu-sombra-fundo');
    this.renderer.setStyle(mySidebar, 'display', 'block');
    this.renderer.setStyle(myOverlay, 'display', 'block');
  }

  w3_close(): void{
    const mySidebar = this.elementRef.nativeElement.querySelector('#menu-conteudo');
    const myOverlay = this.elementRef.nativeElement.querySelector('#menu-sombra-fundo');
    this.renderer.setStyle(mySidebar, 'display', 'none');
    this.renderer.setStyle(myOverlay, 'display', 'none');
  }


}