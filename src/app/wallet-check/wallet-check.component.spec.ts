import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCheckComponent } from './wallet-check.component';

describe('WalletCheckComponent', () => {
  let component: WalletCheckComponent;
  let fixture: ComponentFixture<WalletCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
