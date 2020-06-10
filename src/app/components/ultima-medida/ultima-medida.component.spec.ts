import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimaMedidaComponent } from './ultima-medida.component';

describe('UltimaMedidaComponent', () => {
  let component: UltimaMedidaComponent;
  let fixture: ComponentFixture<UltimaMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimaMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimaMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
