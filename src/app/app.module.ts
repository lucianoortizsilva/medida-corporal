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
import { DatePipe } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PerfilComponent } from './perfil/perfil.component';
import { PageMedidaAtualComponent } from './pages/page-medida-atual/page-medida-atual.component';
import { PageMedidaProgressoComponent } from './pages/page-medida-progresso/page-medida-progresso.component';
import { PageMedidaNovoComponent } from './pages/page-medida-novo/page-medida-novo.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PagePerfilComponent } from './pages/page-perfil/page-perfil.component';
import { PagePrincipalComponent } from './pages/page-principal/page-principal.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

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
    PageMedidaAtualComponent,
    PageMedidaProgressoComponent,
    PageMedidaNovoComponent,
    PageLoginComponent,
    PagePerfilComponent,
    PagePrincipalComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),//https://www.npmjs.com/package/ngx-mask
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MedidaService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
