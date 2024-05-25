import { Component, Input } from '@angular/core';
import { ItemData, ItemDetailedData } from '../item-data.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  @Input() data: { key: string, itemData: ItemData };

  topText:string;
  text:string;
  imgSrc:string;

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.topText = this.data.key;
    this.text = this.data.itemData.name;

    this.imgSrc = this.data.itemData.image;
    // let keys = Object.keys(this.data)
    // console.log( this.data.key )
    this.http.get<ItemDetailedData>('https://blockchain-gateway-test.nursery.reitnorf.com/types/'+this.data.key).subscribe((response) => {
      this.imgSrc = response.metadata.image;
      console.log("Src: " + this.imgSrc)
    });
  }
}
