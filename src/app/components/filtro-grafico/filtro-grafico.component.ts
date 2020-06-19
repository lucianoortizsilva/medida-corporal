import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { MedidaEnum, FiltroGrafico } from 'src/app/model';
import { FiltroService } from 'src/app/services/filtro.service';

@Component({
  selector: 'app-filtro-grafico',
  templateUrl: './filtro-grafico.component.html',
  styleUrls: ['./filtro-grafico.component.scss']
})
export class FiltroGraficoComponent implements OnInit {

  opcaoMedidas = [];
  formulario: FormGroup;
  filtro = new FiltroGrafico();

  constructor(private formBuilder: FormBuilder,
              private filtroService: FiltroService) { }
  
  ngOnInit(): void {
    this.inicializarFormulario();
    this.inicializarOnChangeFiltros();
  }

  private inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      opcaoMedidas: new FormControl('0'),
      opcaoQuantidadeRegistros: new FormControl('6'),
      opcaoPeriodoLancamento: new FormControl('0')
    });
    this.inicializarComboMedidas();

    this.filtro.opcaoQuantidadeRegistros = 6;
    this.filtro.opcaoMedidaSelecionada = 0;
    this.filtro.opcaoPeriodoLancamento = 0;
    this.filtroService.setFiltroGrafico(this.filtro);
  }

  private inicializarComboMedidas(): void {
    this.opcaoMedidas = this.getFiltros();
  }

  private limparMedidaSelecionada():void{
    this.formulario.controls.opcaoMedidas.patchValue(this.opcaoMedidas[0].id);
  }

  private getFiltros() {
    return [
      { id: 0, name: 'Todos' },
      { id: MedidaEnum.ANTEBRACO, name: 'Antebraço' },
      { id: MedidaEnum.BICEPS, name: 'Bíceps' },
      { id: MedidaEnum.CINTURA, name: 'Cintura' },
      { id: MedidaEnum.COXA, name: 'Coxa' },
      { id: MedidaEnum.PANTURRILHA, name: 'Panturrilha' },
      { id: MedidaEnum.PESCOCO, name: 'Pescoço' },
      { id: MedidaEnum.PESO, name: 'Peso' },
      { id: MedidaEnum.QUADRIL, name: 'Quadril' },
      { id: MedidaEnum.TORAX, name: 'Tórax' },
    ];
  }

  private inicializarOnChangeFiltros(): void {
    this.formulario.controls.opcaoQuantidadeRegistros.valueChanges.subscribe(data => {
      this.filtro.opcaoQuantidadeRegistros = data;
      this.filtro.opcaoMedidaSelecionada = 0;
      this.limparMedidaSelecionada();
    });

    this.formulario.controls.opcaoPeriodoLancamento.valueChanges.subscribe(data => {
      this.filtro.opcaoPeriodoLancamento = data;
      this.filtro.opcaoMedidaSelecionada = 0;
      this.limparMedidaSelecionada();
    });

    this.formulario.controls.opcaoMedidas.valueChanges.subscribe(data => {
      this.filtro.opcaoMedidaSelecionada = data;
      this.filtroService.setFiltroGrafico(this.filtro);
    });
  }

}
