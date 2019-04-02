import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDigitValidatorComponent } from './check-digit-validator.component';

describe('CheckDigitValidatorComponent', () => {
  let component: CheckDigitValidatorComponent;
  let fixture: ComponentFixture<CheckDigitValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDigitValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDigitValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
