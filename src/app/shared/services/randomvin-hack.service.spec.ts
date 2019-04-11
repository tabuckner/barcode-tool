import { TestBed } from '@angular/core/testing';

import { RandomvinHackService } from './randomvin-hack.service';

describe('RandomvinHackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomvinHackService = TestBed.get(RandomvinHackService);
    expect(service).toBeTruthy();
  });
});
