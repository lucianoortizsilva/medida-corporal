import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErro500Component } from './page-erro500.component';

describe('PageErro500Component', () => {
  let component: PageErro500Component;
  let fixture: ComponentFixture<PageErro500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageErro500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErro500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
