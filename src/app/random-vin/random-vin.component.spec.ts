import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomVinComponent } from './random-vin.component';

describe('RandomVinComponent', () => {
  let component: RandomVinComponent;
  let fixture: ComponentFixture<RandomVinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomVinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomVinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
