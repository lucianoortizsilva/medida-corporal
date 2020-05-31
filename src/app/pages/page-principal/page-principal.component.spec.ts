import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrincipalComponent } from './page-principal.component';

describe('PagePrincipalComponent', () => {
  let component: PagePrincipalComponent;
  let fixture: ComponentFixture<PagePrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
