import { TestBed } from '@angular/core/testing';

import { NhtsaService } from './nhtsa.service';

describe('NhtsaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhtsaService = TestBed.get(NhtsaService);
    expect(service).toBeTruthy();
  });
});
