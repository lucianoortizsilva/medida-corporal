import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { MedidaEnum } from 'src/app/model';
import { FiltroService } from 'src/app/services/filtro.service';

@Component({
  selector: 'app-filtro-grafico',
  templateUrl: './filtro-grafico.component.html',
  styleUrls: ['./filtro-grafico.component.scss']
})
export class FiltroGraficoComponent implements OnInit {

  filtros = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private filtroService: FiltroService) { }



  ngOnInit(): void {
    this.loadForm();
    this.loadFilters();
    this.onChangeFilter();
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
      { id: MedidaEnum.ANTEBRACO, name: 'Antebraço' },
      { id: MedidaEnum.COXA, name: 'Coxa' },
      { id: MedidaEnum.PANTURRILHA, name: 'Panturrilha' },
    ];
  }



  private onChangeFilter(): void {
    this.form.controls.opcaoQuantidade.valueChanges.subscribe(data => {
      this.filtroService.setQuantidadeRegistrosParaVisualizar(data);
      this.loadFilters();
    });

    this.form.controls.filtros.valueChanges.subscribe(data => {
      this.filtroService.setMedidaParaVisualizar(data);
    });
  }

}
