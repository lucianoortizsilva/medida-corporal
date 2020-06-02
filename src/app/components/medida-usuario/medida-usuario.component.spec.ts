import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaUsuarioComponent } from './medida-usuario.component';

describe('MedidaUsuarioComponent', () => {
  let component: MedidaUsuarioComponent;
  let fixture: ComponentFixture<MedidaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
