import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaCadastroComponent } from './medida-cadastro.component';

describe('MedidaCadastroComponent', () => {
  let component: MedidaCadastroComponent;
  let fixture: ComponentFixture<MedidaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
