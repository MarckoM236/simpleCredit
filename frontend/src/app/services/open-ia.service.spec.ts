import { TestBed } from '@angular/core/testing';

import { OpenIAService } from './open-ia.service';

describe('OpenIAService', () => {
  let service: OpenIAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenIAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
