import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VinDisplayComponent } from './vin-display.component';

describe('VinDisplayComponent', () => {
  let component: VinDisplayComponent;
  let fixture: ComponentFixture<VinDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VinDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VinDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
