import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
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
import { FiltroGraficoComponent } from './components/filtro-grafico/filtro-grafico.component';
import { FiltroService } from './services/filtro.service';
import { environment } from 'src/environments/environment';
import { SemDadosComponent } from './components/sem-dados/sem-dados.component';
import { UltimaMedidaComponent } from './components/ultima-medida/ultima-medida.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_PROVIDER_ID)
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
  { path: '', component: PageLoginComponent },
  { path: 'perfil', component: PagePerfilComponent },
  { path: 'home', component: PageHomeComponent },
  { path: '**', component: PageErro404Component },
  { path: '', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    BarraTituloComponent,
    GraficoComponent,
    PagePerfilComponent,
    PageLoginComponent,
    PageHomeComponent,
    PageErro404Component,
    FiltroGraficoComponent,
    SemDadosComponent,
    UltimaMedidaComponent,
    ProgressoComponent,
    CadastroComponent,
    UsuarioComponent,
    MenuComponent,
    SpinnerComponent,
    NotificacaoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    MDBBootstrapModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),
    RouterModule.forRoot(routes),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MedidaService,
    FiltroService, 
    DatePipe,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }