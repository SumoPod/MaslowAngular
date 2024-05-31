import { TestBed } from '@angular/core/testing';

import { MaslowService } from './maslow.service';

describe('MaslowService', () => {
  let service: MaslowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaslowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
