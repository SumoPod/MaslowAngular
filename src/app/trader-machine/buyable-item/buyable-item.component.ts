import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { EVETokenContractAddress, MaslowPyramidID, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';
import { MaslowService } from '../../eve-wallet-service/maslow.service';

export interface BuyableItem {
  itemId: string; // BlockChain Id
  typeId: string; // Eve Id.
  name: string;
  price: number; // with all decimals
  quantity: number; // How many in player inventory to be sold.
}

@Component({
  selector: 'app-buyable-item',
  templateUrl: './buyable-item.component.html',
  styleUrl: './buyable-item.component.css'
})
export class BuyableItemComponent {

  @Input() data: BuyableItem;
  @ViewChild('sellInput') sellInput: ElementRef;
  
  constructor( private maslow: MaslowService) {
  }

  get totalValue(): number {
    if(! this.sellInput ) return 0;
    return this.data ? this.data.price * this.sellInput?.nativeElement.value / 1e18: 0;
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
}