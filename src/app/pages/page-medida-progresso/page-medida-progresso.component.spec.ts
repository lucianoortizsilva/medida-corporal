import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMedidaProgressoComponent } from './page-medida-progresso.component';

describe('PageMedidaProgressoComponent', () => {
  let component: PageMedidaProgressoComponent;
  let fixture: ComponentFixture<PageMedidaProgressoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMedidaProgressoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMedidaProgressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
