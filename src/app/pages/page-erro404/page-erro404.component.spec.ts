import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErro404Component } from './page-erro404.component';

describe('PageErro404Component', () => {
  let component: PageErro404Component;
  let fixture: ComponentFixture<PageErro404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageErro404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErro404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
