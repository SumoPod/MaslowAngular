import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLedgerComponent } from './item-ledger.component';

describe('ItemLedgerComponent', () => {
  let component: ItemLedgerComponent;
  let fixture: ComponentFixture<ItemLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
