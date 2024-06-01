import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { Web3 } from 'web3';
import { EVETokenContractAddress, MaslowPyramidID, VelTraderContractAddress_v7, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';
import { MaslowService } from '../../eve-wallet-service/maslow.service';

export interface SellableItem {
  itemId: string; // BlockChain Id
  name: string;
  price: number; // with all decimals
  quantity: number; // How many in station inventory to be bought by player
}

@Component({
  selector: 'app-sellable-item',
  templateUrl: './sellable-item.component.html',
  styleUrl: './sellable-item.component.css'
})
export class SellableItemComponent {

  // readonly svelTraderContractAddress = '0x113BD5002A8b24d7113dB3E721cae943524ea43b';
  // readonly  EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';

  @Input() data: SellableItem;
  @ViewChild('buyInput') myInput: ElementRef;
  
  constructor( private maslow: MaslowService) {
  }

  get totalValue(): number {
    if(! this.myInput ) return 0;
    return this.data ? this.data.price * this.myInput?.nativeElement.value / 1e18: 0;
  }

  doSellItems()
  {
    this.maslow.wallet.approveEVE(VelTraderContractAddress_v7, this.totalValue * 1e18)
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
  }
}
