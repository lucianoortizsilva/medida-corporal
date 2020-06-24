import { Component, OnInit, Input, ɵConsole, OnDestroy } from '@angular/core';
import { MedidaEnum, Medida, FiltroGrafico } from '../../model';
import { MedidaService } from '../../services/medida.service';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { FiltroService } from 'src/app/services/filtro.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.scss']
})
export class ProgressoComponent implements OnInit, OnDestroy {

  @Input() email: string;
  
  dadosCoxaE = new Array<number>();
  dadosCoxaD = new Array<number>();
  dadosPeso = new Array<number>();
  dadosTorax = new Array<number>();
  dadosPescoco = new Array<number>();
  dadosCintura = new Array<number>();
  dadosQuadril = new Array<number>();
  dadosBicepsE = new Array<number>();
  dadosBicepsD = new Array<number>();
  dadosAntebracoE = new Array<number>();
  dadosAntebracoD = new Array<number>();
  dadosPanturrilhaE = new Array<number>();
  dadosPanturrilhaD = new Array<number>();
  descricoes = new Array<string>();
  registrosEncontrados = false;
  
  private subscriptionFiltro: Subscription;
  
  constructor(private datepipe: DatePipe,
              private medidaService: MedidaService,
              private filtroService: FiltroService) { }

  ngOnInit(): void {
    this.subscriptionFiltro = this.filtroService.filtroGraficoBehaviorSubject.subscribe(filtroGrafico => {
      this.limparGraficos();
      this.carregarTodosGraficos(filtroGrafico);
    });
  }

  ngOnDestroy(): void {
    this.subscriptionFiltro.unsubscribe();
  }

  private carregarTodosGraficos(filtro: FiltroGrafico): void {
    this.subscriptionFiltro = this.medidaService.getMedidas(this.email).subscribe(medidas => {
      this.registrosEncontrados = true;
      medidas.forEach(m => {
          this.carregarTodasMedidas(m, filtro);
      });
      this.reverterOrdemGraficos();
    },
    (err = HttpErrorResponse) => {
      if (err.status === 404) {
        this.registrosEncontrados = false;
      }
    });
  }
  
  private reverterOrdemGraficos(){
    this.dadosCoxaE.reverse();
    this.dadosCoxaD.reverse();
    this.dadosPeso.reverse();
    this.dadosTorax.reverse();
    this.dadosPescoco.reverse();
    this.dadosCintura.reverse();
    this.dadosQuadril.reverse();
    this.dadosBicepsE.reverse();
    this.dadosBicepsD.reverse();
    this.dadosAntebracoE.reverse();
    this.dadosAntebracoD.reverse();
    this.dadosPanturrilhaE.reverse();
    this.dadosPanturrilhaD.reverse();
    this.descricoes.reverse();
  }

  private carregarTodasMedidas(m: Medida, filtro: FiltroGrafico) {
    if (this.descricoes.length < filtro.opcaoQuantidadeRegistros) {
      this.descricoes.push(this.toDateFormat(m.dtCriacao));
    }

    if (filtro.opcaoMedidaSelecionada == 0) {
      this.carregarPeso(m,filtro);
      this.carregarTorax(m,filtro);
      this.carregarPescoco(m,filtro);
      this.carregarCintura(m,filtro);
      this.carregarQuadril(m,filtro);
      this.carregarBiceps(m,filtro);
      this.carregarAntebraco(m,filtro);
      this.carregarCoxa(m,filtro);
      this.carregarPanturrilha(m,filtro);
    } else if (Number(MedidaEnum.PESO.toPrecision()) == filtro.opcaoMedidaSelecionada) {
      this.carregarPeso(m,filtro);
    } else if (Number(MedidaEnum.TORAX.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarTorax(m,filtro);
    } else if (Number(MedidaEnum.PESCOCO.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarPescoco(m,filtro);
    } else if (Number(MedidaEnum.CINTURA.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarCintura(m,filtro);
    } else if (Number(MedidaEnum.QUADRIL.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarQuadril(m,filtro);
    } else if (Number(MedidaEnum.BICEPS.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarBiceps(m,filtro);
    } else if (Number(MedidaEnum.ANTEBRACO.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarAntebraco(m,filtro);
    } else if (Number(MedidaEnum.COXA.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarCoxa(m,filtro);
    } else if (Number(MedidaEnum.PANTURRILHA.toPrecision()) == filtro.opcaoMedidaSelecionada) {
        this.carregarPanturrilha(m,filtro);
    }
  }

  private limparGraficos(): void {
    this.dadosPeso = new Array();
    this.dadosPescoco = new Array();
    this.dadosTorax = new Array();
    this.dadosCintura = new Array();
    this.dadosQuadril = new Array();
    this.dadosBicepsE = new Array();
    this.dadosBicepsD = new Array();
    this.dadosAntebracoE = new Array();
    this.dadosAntebracoD = new Array();
    this.dadosCoxaE = new Array();
    this.dadosCoxaD = new Array();
    this.dadosPanturrilhaD = new Array();
    this.dadosPanturrilhaE = new Array();
    this.descricoes = new Array();
  }

  private toDateFormat(dt: Date): string {
    return this.datepipe.transform(dt, 'dd/MM/yyyy');
  }

  private toNumber(value: any): number {
    if (!isNull(value)  && value.typeof === undefined) {
      return Number(value);
    }
    return 0.0;
  }

  private carregarPeso(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosPeso.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosPeso.push(this.toNumber(m.peso));
    }
  }

  private carregarTorax(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosTorax.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosTorax.push(this.toNumber(m.torax));
    }
  }

  private carregarPescoco(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosPescoco.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosPescoco.push(this.toNumber(m.pescoco));
    }
  }

  private carregarCintura(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosCintura.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosCintura.push(this.toNumber(m.cintura));
    }
  }

  private carregarQuadril(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosQuadril.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosQuadril.push(this.toNumber(m.quadril));
    }
  }

  private carregarBiceps(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosBicepsE.length < filtro.opcaoQuantidadeRegistros && this.dadosBicepsD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosBicepsE.push(this.toNumber(m.bicepsE));
      this.dadosBicepsD.push(this.toNumber(m.bicepsD));
    }
  }

  private carregarAntebraco(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosAntebracoE.length < filtro.opcaoQuantidadeRegistros && this.dadosAntebracoD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosAntebracoE.push(this.toNumber(m.antebracoE));
      this.dadosAntebracoD.push(this.toNumber(m.antebracoD));
    }
  }

  private carregarCoxa(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosCoxaE.length < filtro.opcaoQuantidadeRegistros && this.dadosCoxaD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosCoxaE.push(this.toNumber(m.coxaE));
      this.dadosCoxaD.push(this.toNumber(m.coxaD));
    }
  }

  private carregarPanturrilha(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosPanturrilhaE.length < filtro.opcaoQuantidadeRegistros && this.dadosPanturrilhaD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosPanturrilhaE.push(this.toNumber(m.panturrilhaE));
      this.dadosPanturrilhaD.push(this.toNumber(m.panturrilhaD));
    }
  }

}