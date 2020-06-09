import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemRegistroComponent } from './sem-registro.component';

describe('SemRegistroComponent', () => {
  let component: SemRegistroComponent;
  let fixture: ComponentFixture<SemRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
