import { TestBed } from '@angular/core/testing';

import { EveApiService } from './eve-api.service';

describe('EveApiService', () => {
  let service: EveApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EveApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
