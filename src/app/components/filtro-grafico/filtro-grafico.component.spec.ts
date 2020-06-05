import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGraficoComponent } from './filtro-grafico.component';

describe('FiltroGraficoComponent', () => {
  let component: FiltroGraficoComponent;
  let fixture: ComponentFixture<FiltroGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
