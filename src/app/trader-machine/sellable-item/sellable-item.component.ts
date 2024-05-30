import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export interface SellableItem {
  id: string;
  name: string;
  price: number; // with all decimals
  quantity: number;
}

@Component({
  selector: 'app-sellable-item',
  templateUrl: './sellable-item.component.html',
  styleUrl: './sellable-item.component.css'
})
export class SellableItemComponent {
  @Input() data: SellableItem;
  @ViewChild('buyInput') myInput: ElementRef;

  get totalValue(): number {
    return this.data ? this.data.price * this.myInput?.nativeElement.value / 1e18: 0;
  }

  validateMax(inputEvent: any, max: number)
  {
    if (inputEvent.target.value > max)
    {
      inputEvent.target.value = max;
    }
  }
}
