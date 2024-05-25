import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemData } from './item-data.model';

@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.component.html',
  styleUrl: './item-ledger.component.css'
})
export class ItemLedgerComponent implements OnInit{

  allItems: { key: string, itemData: ItemData }[] = [];

  constructor(private http: HttpClient)
  {
    
  }

  ngOnInit(): void {
    this.http.get<{ [key: string]: ItemData }[]>('https://blockchain-gateway-test.nursery.reitnorf.com/types').subscribe((response) => {
      // this.allItems = Object.values(response);
      // console.log(response)
      this.allItems = Object.entries(response).map(([key]) => ({ key, itemData: response[key] }));
    });
  }
}
