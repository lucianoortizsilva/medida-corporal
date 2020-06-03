import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaProgressoComponent } from './medida-progresso.component';

describe('MedidaProgressoComponent', () => {
  let component: MedidaProgressoComponent;
  let fixture: ComponentFixture<MedidaProgressoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaProgressoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaProgressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
