import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaAtualComponent } from './medida-atual.component';

describe('MedidaAtualComponent', () => {
  let component: MedidaAtualComponent;
  let fixture: ComponentFixture<MedidaAtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaAtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
