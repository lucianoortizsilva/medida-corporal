import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MedidaEnum, Medida } from '../../model';
import { MedidaService } from '../../services/medida.service';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { FiltroService } from 'src/app/services/filtro.service';

/**
 *
 * DOC Chart.js https://www.chartjs.org/docs/latest/
 *
 */
@Component({
  selector: 'app-medida-progresso',
  templateUrl: './medida-progresso.component.html',
  styleUrls: ['./medida-progresso.component.scss']
})
export class MedidaProgressoComponent implements OnInit, OnDestroy {

  @Input() email: string;

  private listaPesos = new Array();

  dadosPeso = new Array<number>();
  dadosTorax = new Array<number>();
  dadosPescoco = new Array<number>();
  dadosCintura = new Array<number>();
  dadosQuadril = new Array<number>();
  dadosBicepsE = new Array<number>();
  dadosBicepsD = new Array<number>();
  dadosAntebracoE = new Array<number>();
  dadosAntebracoD = new Array<number>();
  dadosCoxaE = new Array<number>();
  dadosCoxaD = new Array<number>();
  dadosPanturrilhaE = new Array<number>();
  dadosPanturrilhaD = new Array<number>();

  descricoesPeso = new Array<string>();
  descricoesTorax = new Array<string>();
  descricoesPescoco = new Array<string>();
  descricoesCintura = new Array<string>();
  descricoesQuadril = new Array<string>();
  descricoesBiceps = new Array<string>();
  descricoesAntebraco = new Array<string>();
  descricoesCoxa = new Array<string>();

  registrosEncontrados = false;
  
  private subscriptionMedidas: Subscription;
  private qtdDadosParaVisualizar = 6;

  constructor(private datepipe: DatePipe,
              private medidaService: MedidaService,
              private filtroService: FiltroService) { }



  ngOnInit(): void {
    this.loadAllCharts();

    this.filtroService.quantidadeRegistrosBehaviorSubject.subscribe(data => {
      this.qtdDadosParaVisualizar = data;
      this.clearCharts();
      this.loadAllCharts();
    });

    this.filtroService.codigoMedidaBehaviorSubject.subscribe(data => {
      this.filtrar(data);
    });

  }


  ngOnDestroy(): void {
    this.subscriptionMedidas.unsubscribe();
  }



  private loadAllCharts(): void {
    this.subscriptionMedidas = this.medidaService.getMedidas(this.email).subscribe(medidas => {
      this.registrosEncontrados = true;
      medidas.forEach(m => {
        this.loadPeso(m);
        this.loadTorax(m);
        this.loadPescoco(m);
        this.loadCintura(m);
        this.loadQuadril(m);
        this.loadBiceps(m);
        this.loadAntebraco(m);
        this.loadCoxa(m);
      });
    },
    err => {
      if (err.error.status === 404) {
        this.registrosEncontrados = false;
      }
    });
  }


  private filtrar(id: any): void {
    this.clearCharts();

    if (MedidaEnum.PESO.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadPeso(m);
        });
      });
    } else if (MedidaEnum.TORAX.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadTorax(m);
        });
      });
    } else if (MedidaEnum.PESCOCO.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadPescoco(m);
        });
      });
    } else if (MedidaEnum.CINTURA.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadCintura(m);
        });
      });
    } else if (MedidaEnum.QUADRIL.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadQuadril(m);
        });
      });
    } else if (MedidaEnum.BICEPS.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadBiceps(m);
        });
      });
    } else if (MedidaEnum.ANTEBRACO.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadAntebraco(m);
        });
      });  
    } else if (MedidaEnum.COXA.toPrecision() === id) {
      this.medidaService.getMedidas(this.email).subscribe(medidas => {
        medidas.forEach(m => {
          this.loadCoxa(m);
        });
      });    
    } else {
      this.loadAllCharts();
    }
  }



  private clearCharts(): void {
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

    this.descricoesPeso = new Array();
    this.descricoesPescoco = new Array();
    this.descricoesTorax = new Array();
    this.descricoesCintura = new Array();
    this.descricoesQuadril = new Array();
    this.descricoesBiceps = new Array();
    this.descricoesAntebraco = new Array();
    this.descricoesCoxa = new Array();
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

  private loadPeso(m: Medida): void{
    if(this.dadosPeso.length < this.qtdDadosParaVisualizar ){
      this.dadosPeso.push(this.toNumber(m.peso));
      this.descricoesPeso.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadTorax(m: Medida): void {
    if (this.dadosTorax.length < this.qtdDadosParaVisualizar ){
      this.dadosTorax.push(this.toNumber(m.torax));
      this.descricoesTorax.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadPescoco(m: Medida): void {
    if (this.dadosPescoco.length < this.qtdDadosParaVisualizar ){
      this.dadosPescoco.push(this.toNumber(m.pescoco));
      this.descricoesPescoco.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadCintura(m: Medida): void {
    if (this.dadosCintura.length < this.qtdDadosParaVisualizar ){
      this.dadosCintura.push(this.toNumber(m.cintura));
      this.descricoesCintura.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadQuadril(m: Medida): void {
    if (this.dadosQuadril.length < this.qtdDadosParaVisualizar ){
      this.dadosQuadril.push(this.toNumber(m.quadril));
      this.descricoesQuadril.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadBiceps(m: Medida): void {
    if (this.dadosBicepsE.length < this.qtdDadosParaVisualizar && this.dadosBicepsD.length < this.qtdDadosParaVisualizar ){
      this.dadosBicepsE.push(this.toNumber(m.bicepsE));
      this.dadosBicepsD.push(this.toNumber(m.bicepsD));
      this.descricoesBiceps.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadAntebraco(m: Medida): void {
    if (this.dadosAntebracoE.length < this.qtdDadosParaVisualizar && this.dadosAntebracoD.length < this.qtdDadosParaVisualizar ){
      this.dadosAntebracoE.push(this.toNumber(m.antebracoE));
      this.dadosAntebracoD.push(this.toNumber(m.antebracoD));
      this.descricoesAntebraco.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadCoxa(m: Medida): void {
    if (this.dadosCoxaE.length < this.qtdDadosParaVisualizar && this.dadosCoxaD.length < this.qtdDadosParaVisualizar ){
      this.dadosCoxaE.push(this.toNumber(m.coxaE));
      this.dadosCoxaD.push(this.toNumber(m.coxaD));
      this.descricoesCoxa.push(this.toDateFormat(m.dtCriacao));
    }
  }

}
