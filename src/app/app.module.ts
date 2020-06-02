import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PrincipalComponent } from './principal/principal.component';
import { MedidaCadastroComponent } from './medida-cadastro/medida-cadastro.component';
import { MedidaProgressoComponent } from './medida-progresso/medida-progresso.component';
import { MedidaAtualComponent } from './medida-atual/medida-atual.component';
import { BarraTituloComponent } from './barra-titulo/barra-titulo.component';
import { GraficoComponent } from './grafico/grafico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedidaService } from './@services/medida.service';
import { DatePipe, APP_BASE_HREF } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PerfilComponent } from './perfil/perfil.component';
import { PagePerfilComponent } from './pages/page-perfil/page-perfil.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { AuthService } from 'angularx-social-login';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageErro500Component } from './pages/page-erro500/page-erro500.component';
import { PageErro404Component } from './pages/page-erro404/page-erro404.component';

/**
 * key: z-sw-98ubU28FrNHsFjKf46-
 */
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('')
  }
]);

export function provideConfig() {
  return config;
}

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

const routes: Routes = [
  { path: 'login', component: PageLoginComponent },
  { path: 'perfil', component: PagePerfilComponent },
  { path: 'home', component: PageHomeComponent },
  { path: '**', component: PageErro404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    PrincipalComponent,
    MedidaCadastroComponent,
    MedidaProgressoComponent,
    MedidaAtualComponent,
    BarraTituloComponent,
    GraficoComponent,
    PerfilComponent,
    PagePerfilComponent,
    PageLoginComponent,
    PageHomeComponent,
    PageErro500Component,
    PageErro404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MDBBootstrapModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),//https://www.npmjs.com/package/ngx-mask
    RouterModule.forRoot(routes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MedidaService, 
    DatePipe,
    AuthService,
    {provide: APP_BASE_HREF, useValue: '/medida-corporal'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }