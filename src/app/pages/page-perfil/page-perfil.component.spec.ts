import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePerfilComponent } from './page-perfil.component';

describe('PagePerfilComponent', () => {
  let component: PagePerfilComponent;
  let fixture: ComponentFixture<PagePerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
