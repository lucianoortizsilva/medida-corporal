import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMedidaAtualComponent } from './page-medida-atual.component';

describe('PageMedidaAtualComponent', () => {
  let component: PageMedidaAtualComponent;
  let fixture: ComponentFixture<PageMedidaAtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMedidaAtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMedidaAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
