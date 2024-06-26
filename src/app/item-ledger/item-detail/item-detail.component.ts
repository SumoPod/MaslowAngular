import { Component, Input } from '@angular/core';
import { ItemData } from '../../eve-wallet-service/Interfaces/item-data.model';
import { EveApiService } from '../../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  @Input() data: { key: string, itemData: ItemData, chainId: number };

  topText:string;
  text:string;
  imgSrc:string;
  chainId:number;

  constructor( private eveApi: EveApiService) { }

  ngOnInit(): void
  {
    this.topText = this.data.key;
    this.text = this.data.itemData.name;
    this.chainId = this.data.itemData.chainId;

    this.eveApi.getItem( this.data.key )
    .subscribe((response) => {
      this.imgSrc = response.metadata.image;
    });
  }
}
