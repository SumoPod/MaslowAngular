import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { Web3 } from 'web3';
import { EVETokenContractAddress, MaslowPyramidID, VelTraderContractAddress_v23, VelTraderContractAddress_v7, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';
import { MaslowService } from '../../eve-wallet-service/maslow.service';

export interface SellableItem {
  itemId: string; // BlockChain Id
  typeId: string; // Eve Online Id
  name: string;
  price: number; // with all decimals
  quantity: number; // How many in station inventory to be bought by player
  SSUQuantity: number; //How many in station inventory
  targetQuantity: number;
}

@Component({
  selector: 'app-sellable-item',
  templateUrl: './sellable-item.component.html',
  styleUrl: './sellable-item.component.css'
})
export class SellableItemComponent {
  @Input() data: SellableItem;
  @ViewChild('buyInput') myInput: ElementRef;
  
  constructor( private maslow: MaslowService) {
  }

  get totalValue(): number {
    if(! this.myInput ) return 0;
    return this.data ? this.calculatePrice(this.myInput?.nativeElement.value): 0;
  }

  doSellItems()
  {
    this.maslow.wallet.approveEVE(VelTraderContractAddress_v23, this.totalValue * 1e18)
    .then(() => {
      this.maslow.purchaseItem(MaslowPyramidID, this.data.itemId, this.myInput?.nativeElement.value);
    });
  }
  
  validateMax(inputEvent: any, max: number)
  {
    if (inputEvent.target.value > max)
    {
      inputEvent.target.value = max;
    }
    this.calculatePrice(inputEvent.target.value);
  }

  calculatePrice(quantity: number)
  {
    let cantidad = this.data.quantity
    let totalCost = 0;

    for (let qty = 0; qty < quantity; qty++) {
    let spreadPercentage = ( cantidad) / this.data.targetQuantity;
    let finalPrice = this.data.price * 2 * (1 - spreadPercentage);
    
    totalCost += finalPrice

    cantidad--
  }

  return totalCost
    
  }
}
