import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MedidaEnum, Medida } from '../model';
import { MedidaService } from '../services/medida.service';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';

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

  form: FormGroup;
  filtros = [];

  listaPesos = new Array();

  dadosPeso = new Array<number>();
  dadosTorax = new Array<number>();
  dadosPescoco = new Array<number>();
  dadosCintura = new Array<number>();
  dadosQuadril = new Array<number>();
  dadosBicepsE = new Array<number>();
  dadosBicepsD = new Array<number>();

  descricoesPeso = new Array<string>();
  descricoesTorax = new Array<string>();
  descricoesPescoco = new Array<string>();
  descricoesCintura = new Array<string>();
  descricoesQuadril = new Array<string>();
  descricoesBiceps = new Array<string>();

  subscriptionMedidas: Subscription;

  qtdDadosParaVisualizar = 99; //TODO: AJUSTAR

  constructor(private datepipe: DatePipe,
              private medidaService: MedidaService,
              private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.loadForm();
    this.loadFilters();
    this.onChangeFilter();
    this.loadAllCharts();
  }



  ngOnDestroy(): void {
    this.subscriptionMedidas.unsubscribe();
  }



  private loadAllCharts(): void {
    this.subscriptionMedidas = this.medidaService.getMedidas().subscribe(medidas => {
      medidas.forEach(m => {
        this.loadPeso(m);
        this.loadTorax(m);
        this.loadPescoco(m);
        this.loadCintura(m);
        this.loadQuadril(m);
        this.loadBiceps(m);
      });
    });
  }



  private loadForm(): void {
    this.form = this.formBuilder.group({
      filtros: [''],
      opcaoQuantidade: new FormControl('6'),
    });
  }



  loadFilters(): void {
    // async filtros
    of (this.getFiltros()).subscribe(filtros => {
     this.filtros = filtros;
     this.form.controls.filtros.patchValue(this.filtros[0].id);
   });

  }



  getFiltros() {
    return [
      { id: 0, name: 'Todos' },
      { id: MedidaEnum.PESO, name: 'Peso' },
      { id: MedidaEnum.TORAX, name: 'Tórax' },
      { id: MedidaEnum.PESCOCO, name: 'Pescoço' },
      { id: MedidaEnum.CINTURA, name: 'Cintura' },
      { id: MedidaEnum.QUADRIL, name: 'Quadril' },
      { id: MedidaEnum.BICEPS, name: 'Bíceps' },
    ];
  }



  private filtrar(id: any): void {
    this.clearCharts();

    if (MedidaEnum.PESO.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadPeso(m);
        });
      });
    } else if (MedidaEnum.TORAX.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadTorax(m);
        });
      });
    } else if (MedidaEnum.PESCOCO.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadPescoco(m);
        });
      });
    } else if (MedidaEnum.CINTURA.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadCintura(m);
        });
      });
    } else if (MedidaEnum.QUADRIL.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadQuadril(m);
        });
      });
    } else if (MedidaEnum.BICEPS.toPrecision() === id) {
      this.medidaService.getMedidas().subscribe(medidas => {
        medidas.forEach(m => {
          this.loadBiceps(m);
        });
      });
    } else {
      this.loadAllCharts();
    }
  }



  private onChangeFilter(): void {
    this.form.controls.opcaoQuantidade.valueChanges.subscribe(data => {
      this.qtdDadosParaVisualizar = data;
      this.loadFilters();
      this.clearCharts();
      this.loadAllCharts();
    });

    this.form.controls.filtros.valueChanges.subscribe(data => {
      this.filtrar(data);
    });
  }



  private clearCharts(): void {
    this.dadosPeso = new Array();
    this.dadosPescoco = new Array();
    this.dadosTorax = new Array();
    this.dadosCintura = new Array();
    this.dadosQuadril = new Array();
    this.dadosBicepsE = new Array();
    this.dadosBicepsD = new Array();

    this.descricoesPeso = new Array();
    this.descricoesPescoco = new Array();
    this.descricoesTorax = new Array();
    this.descricoesCintura = new Array();
    this.descricoesQuadril = new Array();
    this.descricoesBiceps = new Array();
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
    if(!isNull(m.peso) && this.dadosPeso.length < this.qtdDadosParaVisualizar ){
      this.dadosPeso.push(this.toNumber(m.peso));
      this.descricoesPeso.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadTorax(m: Medida): void {
    if (!isNull(m.torax) && this.dadosTorax.length < this.qtdDadosParaVisualizar ){
      this.dadosTorax.push(this.toNumber(m.torax));
      this.descricoesTorax.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadPescoco(m: Medida): void {
    if (!isNull(m.pescoco) && this.dadosPescoco.length < this.qtdDadosParaVisualizar ){
      this.dadosPescoco.push(this.toNumber(m.pescoco));
      this.descricoesPescoco.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadCintura(m: Medida): void {
    if (!isNull(m.cintura) && this.dadosCintura.length < this.qtdDadosParaVisualizar ){
      this.dadosCintura.push(this.toNumber(m.cintura));
      this.descricoesCintura.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadQuadril(m: Medida): void {
    if (!isNull(m.quadril) && this.dadosQuadril.length < this.qtdDadosParaVisualizar ){
      this.dadosQuadril.push(this.toNumber(m.quadril));
      this.descricoesQuadril.push(this.toDateFormat(m.dtCriacao));
    }
  }

  private loadBiceps(m: Medida): void {
    if (!isNull(m.bicepsE) && !isNull(m.bicepsD) && this.dadosBicepsE.length < this.qtdDadosParaVisualizar && this.dadosBicepsD.length < this.qtdDadosParaVisualizar ){
      this.dadosBicepsE.push(this.toNumber(m.bicepsE));
      this.dadosBicepsD.push(this.toNumber(m.bicepsD));
      this.descricoesBiceps.push(this.toDateFormat(m.dtCriacao));
    }
  }

}
