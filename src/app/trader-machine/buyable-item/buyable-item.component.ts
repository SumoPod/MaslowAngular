import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../../wallet-check/ERC20.abi';
import { VEL_TRADER_ABI } from '../IItemSeller.abi';
import { SellableItem } from '../sellable-item/sellable-item.component';

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
  smartObject = '45228697695947564033082854924954193006092773360381611920298456273008413001782';
  readonly worldAddress = '0x8dc9cab3e97da6df615a8a24cc07baf110d63071';
  readonly velTraderContractAddress = '0x113BD5002A8b24d7113dB3E721cae943524ea43b';
  readonly  EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';


  @Input() data: BuyableItem;
  @ViewChild('sellInput') myInput: ElementRef;
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
    if(! this.myInput ) return 0;
    return this.data ? this.data.price * this.myInput?.nativeElement.value / 1e18: 0;
  }

  doBuyItems()
  {
    // Purchase items in the abi
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);
    console.log("Approving")
    // Get approve
    EVEContract.methods.approve(this.velTraderContractAddress, this.totalValue * 1e18 ).send({from: this.walletAddress})
    .on('transactionHash', (hash) => {
      console.log('Approval Transaction Hash:', hash);
    })
    .then((receipt) => {
        this.buyItem(this.smartObject, this.data.itemId, this.myInput?.nativeElement.value);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }

  buyItem(smartObject: any, carbOreId: any, quantity: any)
  {
    console.log("Purchasing item");
    // Get contract.
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
  
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