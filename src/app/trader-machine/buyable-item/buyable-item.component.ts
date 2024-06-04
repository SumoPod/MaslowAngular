import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { EVETokenContractAddress, getNameFromID, MaslowPyramidID, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';
import { MaslowService } from '../../eve-wallet-service/maslow.service';
import { EveApiService } from '../../eve-wallet-service/eve-api.service';

export interface BuyableItem {
  itemId: string; // BlockChain Id
  typeId: string; // Eve Id
  name: string;
  price: number; // with all decimals
  quantity: number; // How many in player inventory to be sold.
  SSUQuantity: number; // How many in SSU inventory
  targetQuantity: number;
}

@Component({
  selector: 'app-buyable-item',
  templateUrl: './buyable-item.component.html',
  styleUrl: './buyable-item.component.css'
})
export class BuyableItemComponent {

  @Input() data: BuyableItem;
  @ViewChild('sellInput') sellInput: ElementRef;
  
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  targetQuantity: number;
  src: string;

  constructor( private maslow: MaslowService, private eveApi: EveApiService) {}

  get totalValue(): number {
    if(! this.sellInput ) return 0;
    return this.data ? this.calculatePrice(this.sellInput?.nativeElement.value): 0;
  }

  ngOnInit(): void{
    
  
      
      this.itemId = this.data.itemId;
      this.name = this.data.name;
      this.price = this.data.price;
      this.targetQuantity = this.data.targetQuantity;
      this.getImg();

  }

  doBuyItems()
  {
    // Purchase items in the abi

    this.maslow.sellItem(MaslowPyramidID, this.data.itemId, this.sellInput?.nativeElement.value);
    
  }

  validateMax(inputEvent: any, max: number)
  {
    if (inputEvent.target.value > max)
    {
      inputEvent.target.value = max;
    }
  }

  calculatePrice(quantity: number)
  {
    let cantidad = this.data.SSUQuantity
    let totalCost = 0;

    for (let qty = 0; qty < quantity; qty++) {
    let spreadPercentage = ( cantidad + 1) / this.data.targetQuantity;
    let finalPrice = this.data.price * 2 * (1 - spreadPercentage);
    
    totalCost += finalPrice

    cantidad++
  }
  return totalCost
    
  }
  getImg(){
    this.eveApi.getItem(this.data.typeId)
    .subscribe((response) => {
      this.src = response.metadata.image
    })

  }

  
}