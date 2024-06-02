import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemData } from '../eve-wallet-service/Interfaces/item-data.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.component.html',
  styleUrl: './item-ledger.component.css'
})
export class ItemLedgerComponent implements OnInit {
  allItems: { key: string, itemData: ItemData }[] = [];

  constructor(private http: HttpClient, private eveApi: EveApiService) {

  }

  ngOnInit(): void {
    this.eveApi.getAllItems()
      .subscribe((response) => {
        // Write it into a proper json object where we know the keys.
        this.allItems = Object.entries(response).map(([key]) => ({ key, itemData: response[key] }));
    });
  }
}
