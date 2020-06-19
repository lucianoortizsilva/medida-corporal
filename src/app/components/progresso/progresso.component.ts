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
  
  descricoesCoxa = new Array<string>();
  descricoesPeso = new Array<string>();
  descricoesTorax = new Array<string>();
  descricoesBiceps = new Array<string>();
  descricoesPescoco = new Array<string>();
  descricoesCintura = new Array<string>();
  descricoesQuadril = new Array<string>();
  descricoesAntebraco = new Array<string>();
  descricoesPanturrilha = new Array<string>();
  
  registrosEncontrados = false;
  
  private subscriptionFiltro: Subscription;
  
  constructor(private datepipe: DatePipe,
              private medidaService: MedidaService,
              private filtroService: FiltroService) { }

  ngOnInit(): void {
    this.subscriptionFiltro = this.filtroService.filtroGraficoBehaviorSubject.subscribe(filtroGrafico => {
      this.limparGraficos();
      this.loadAllCharts(filtroGrafico);
    });
  }

  ngOnDestroy(): void {
    this.subscriptionFiltro.unsubscribe();
  }

  private loadAllCharts(filtro: FiltroGrafico): void {
    
    this.subscriptionFiltro = this.medidaService.getMedidas(this.email).subscribe(medidas => {
      this.registrosEncontrados = true;
      
      var mesCriacaoAtual = null;
      var mesCriacaoAnterior = null;
      var medidaAnterior = null;
      
      medidas.forEach(m => {
        mesCriacaoAtual = new Date(m.dtCriacao).getMonth();
        if (filtro.opcaoPeriodoLancamento == 0) {
          this.carregarTodasMedidas(m, filtro);
        } else if (filtro.opcaoPeriodoLancamento == 1) {
            if (mesCriacaoAnterior == null) {
              this.carregarTodasMedidas(m, filtro);
              mesCriacaoAnterior = mesCriacaoAtual;
            } else if (mesCriacaoAtual != mesCriacaoAnterior) {
                this.carregarTodasMedidas(m, filtro);
                mesCriacaoAnterior = mesCriacaoAtual;
            }
        } else if (filtro.opcaoPeriodoLancamento == 2) {
            if (mesCriacaoAnterior != null && mesCriacaoAnterior != mesCriacaoAtual) {
              this.carregarTodasMedidas(medidaAnterior, filtro);
            }  
            medidaAnterior = m;
            mesCriacaoAnterior = mesCriacaoAtual;
        } 
      });
      if (filtro.opcaoPeriodoLancamento == 2) {
        this.carregarTodasMedidas(medidaAnterior, filtro);
      }
    },
    (err = HttpErrorResponse) => {
      if (err.status === 404) {
        this.registrosEncontrados = false;
      }
    });
  }
  
  private carregarTodasMedidas(m: Medida, filtro: FiltroGrafico) {
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

    this.descricoesPeso = new Array();
    this.descricoesPescoco = new Array();
    this.descricoesTorax = new Array();
    this.descricoesCintura = new Array();
    this.descricoesQuadril = new Array();
    this.descricoesBiceps = new Array();
    this.descricoesAntebraco = new Array();
    this.descricoesCoxa = new Array();
    this.descricoesPanturrilha = new Array();
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
      this.descricoesPeso.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarTorax(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosTorax.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosTorax.push(this.toNumber(m.torax));
      this.descricoesTorax.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarPescoco(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosPescoco.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosPescoco.push(this.toNumber(m.pescoco));
      this.descricoesPescoco.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarCintura(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosCintura.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosCintura.push(this.toNumber(m.cintura));
      this.descricoesCintura.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarQuadril(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosQuadril.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosQuadril.push(this.toNumber(m.quadril));
      this.descricoesQuadril.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarBiceps(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosBicepsE.length < filtro.opcaoQuantidadeRegistros && this.dadosBicepsD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosBicepsE.push(this.toNumber(m.bicepsE));
      this.dadosBicepsD.push(this.toNumber(m.bicepsD));
      this.descricoesBiceps.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarAntebraco(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosAntebracoE.length < filtro.opcaoQuantidadeRegistros && this.dadosAntebracoD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosAntebracoE.push(this.toNumber(m.antebracoE));
      this.dadosAntebracoD.push(this.toNumber(m.antebracoD));
      this.descricoesAntebraco.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarCoxa(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosCoxaE.length < filtro.opcaoQuantidadeRegistros && this.dadosCoxaD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosCoxaE.push(this.toNumber(m.coxaE));
      this.dadosCoxaD.push(this.toNumber(m.coxaD));
      this.descricoesCoxa.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private carregarPanturrilha(m: Medida, filtro: FiltroGrafico): void{
    if (this.dadosPanturrilhaE.length < filtro.opcaoQuantidadeRegistros && this.dadosPanturrilhaD.length < filtro.opcaoQuantidadeRegistros) {
      this.dadosPanturrilhaE.push(this.toNumber(m.panturrilhaE));
      this.dadosPanturrilhaD.push(this.toNumber(m.panturrilhaD));
      this.descricoesPanturrilha.push(this.toDateFormat(m.dtCriacao));
    }
  }

}
