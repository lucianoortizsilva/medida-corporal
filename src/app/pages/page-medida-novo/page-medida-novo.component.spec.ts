import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMedidaNovoComponent } from './page-medida-novo.component';

describe('PageMedidaNovoComponent', () => {
  let component: PageMedidaNovoComponent;
  let fixture: ComponentFixture<PageMedidaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMedidaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMedidaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
