import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDonationsComponent } from './wallet-donations.component';

describe('WalletDonationsComponent', () => {
  let component: WalletDonationsComponent;
  let fixture: ComponentFixture<WalletDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
