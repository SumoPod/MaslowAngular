import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { EVETokenContractAddress, MaslowPyramidID, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';

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
  web3: any;
  walletAddress: any;
  
  constructor() {
    if (typeof (window as any).ethereum !== 'undefined')
      {
        this.web3 = new Web3((window as any).ethereum);
      }
  }

  ngOnInit(): void {
    if ((window as any).ethereum) {
      console.log('EIP-1193 compatible wallet detected');
      this.getWallets();
    } else {
      console.log('EIP-1193 compatible wallet not found');
    }
  }

  getWallets() {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
      console.log('Wallets:', accounts);
      this.walletAddress = accounts[0];

    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }

  get totalValue(): number {
    if(! this.sellInput ) return 0;
    return this.data ? this.data.price * this.sellInput?.nativeElement.value / 1e18: 0;
  }

  doBuyItems()
  {
    // Purchase items in the abi
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);
    console.log("Approving")

    this.buyItem(MaslowPyramidID, this.data.itemId, this.sellInput?.nativeElement.value);
  }

  buyItem(smartObject: any, carbOreId: any, quantity: any)
  {
    console.log("Purchasing item");
    // Get contract.
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, WorldAddress);
  
    // Call purchaseItem
    contract.methods.velorumtest7__sellItem(smartObject, carbOreId, quantity).send({from: this.walletAddress})
    .on('transactionHash', (hash) => {
      console.log('Purchase Transaction Hash:', hash);
    })
    .then((receipt) => {
      console.log('Purchase Receipt:', receipt);
    })
    .catch((error) => {
      console.error('Purchase Error:', error);
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