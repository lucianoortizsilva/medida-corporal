import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MedidaCadastroComponent } from './components/medida-cadastro/medida-cadastro.component';
import { MedidaProgressoComponent } from './components/medida-progresso/medida-progresso.component';
import { MedidaAtualComponent } from './components/medida-atual/medida-atual.component';
import { BarraTituloComponent } from './barra-titulo/barra-titulo.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedidaService } from './services/medida.service';
import { DatePipe, APP_BASE_HREF } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PagePerfilComponent } from './pages/page-perfil/page-perfil.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { AuthService } from 'angularx-social-login';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageErro404Component } from './pages/page-erro404/page-erro404.component';
import { MedidaMenuComponent } from './components/medida-menu/medida-menu.component';
import { MedidaUsuarioComponent } from './components/medida-usuario/medida-usuario.component';

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
  { path: 'cadastro', component: MedidaCadastroComponent },
  { path: '**', component: PageErro404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    MedidaCadastroComponent,
    MedidaProgressoComponent,
    MedidaAtualComponent,
    BarraTituloComponent,
    GraficoComponent,
    PagePerfilComponent,
    PageLoginComponent,
    PageHomeComponent,
    PageErro404Component,
    MedidaMenuComponent,
    MedidaUsuarioComponent
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