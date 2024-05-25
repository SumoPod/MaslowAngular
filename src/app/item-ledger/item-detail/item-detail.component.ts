import { Component, Input } from '@angular/core';
import { ItemData } from '../item-data.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  @Input() data: { key: string, itemData: ItemData };

  text:string;
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.text = this.data.key + " " + this.data.itemData.name;
    // let keys = Object.keys(this.data)
    // console.log( this.data.key )
    // this.http.get<ItemData[]>('https://blockchain-gateway-test.nursery.reitnorf.com/types/'+this.data.id).subscribe((response) => {
    //   this.data = Object.values(response);
    // });
  }
}
