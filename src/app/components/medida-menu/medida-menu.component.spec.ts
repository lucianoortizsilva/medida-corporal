import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaMenuComponent } from './medida-menu.component';

describe('MedidaMenuComponent', () => {
  let component: MedidaMenuComponent;
  let fixture: ComponentFixture<MedidaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
