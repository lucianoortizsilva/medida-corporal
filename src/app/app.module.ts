import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PrincipalComponent } from './principal/principal.component';
import { MedidaCadastroComponent } from './medida-cadastro/medida-cadastro.component';
import { MedidaProgressoComponent } from './medida-progresso/medida-progresso.component';
import { MedidaAtualComponent } from './medida-atual/medida-atual.component';
import { BarraTituloComponent } from './barra-titulo/barra-titulo.component';
import { GraficoComponent } from './grafico/grafico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
