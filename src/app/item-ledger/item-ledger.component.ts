import { Component, OnInit } from '@angular/core';
import { ItemData } from '../eve-wallet-service/Interfaces/item-data.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';
import * as items from '../items.json';

@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.component.html',
  styleUrl: './item-ledger.component.css'
})
export class ItemLedgerComponent implements OnInit {
  allItems: { key: string, itemData: ItemData }[] = [];

  chainItems: {
    typeId: number;
    itemId: string;
    quantity: number;
    name: string;
    image: string;
  }[]

  constructor(private eveApi: EveApiService) {
    // console.log(items.inventory.storageItems);
    this.chainItems = items.inventory.storageItems;
  }

  ngOnInit(): void {
    this.eveApi.getAllItems()
      .subscribe((response) => {
        // Write it into a proper json object where we know the keys.
        this.allItems = Object.entries(response).map(([key]) => ({
          key,
          itemData: response[key],
          chainId: this.getChainId(key)
        }));
    });
  }

  getChainId(key: string): string {
    const item = this.chainItems.find((item) => String(item.typeId) === key);
    console.log(key, item, this.chainItems);
    // return item.toString();
    return item?.itemId || '';
  }

}
