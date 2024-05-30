import { Component, Input } from '@angular/core';

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

  validateMax(inputEvent: any, max: number)
  {
    if (inputEvent.target.value > max)
    {
      inputEvent.target.value = max;
    }
  }
}
