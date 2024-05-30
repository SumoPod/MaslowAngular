import { TestBed } from '@angular/core/testing';

import { EveWalletService } from './eve-wallet.service';

describe('EveWalletService', () => {
  let service: EveWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EveWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
