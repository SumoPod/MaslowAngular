import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyableItemComponent } from './buyable-item.component';

describe('BuyableItemComponent', () => {
  let component: BuyableItemComponent;
  let fixture: ComponentFixture<BuyableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
