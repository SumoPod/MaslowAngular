import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellableItemComponent } from './sellable-item.component';

describe('SellableItemComponent', () => {
  let component: SellableItemComponent;
  let fixture: ComponentFixture<SellableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
