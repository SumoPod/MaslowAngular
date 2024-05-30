import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ERC20_ABI } from '../../wallet-check/ERC20.abi';
import { VEL_TRADER_ABI } from '../IItemSeller.abi';
import { Web3 } from 'web3';
import { EVETokenContractAddress, MaslowPyramidID, VelTraderContractAddress_v7, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';

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

  readonly svelTraderContractAddress = '0x113BD5002A8b24d7113dB3E721cae943524ea43b';
  readonly  EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';


  @Input() data: SellableItem;
  @ViewChild('buyInput') myInput: ElementRef;
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


  getWallets()
  {
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

  doSellItems()
  {
    // Purchase items in the abi
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);
    console.log("Approving")
    // Get approve
    EVEContract.methods.approve(VelTraderContractAddress_v7, this.totalValue * 1e18 ).send({from: this.walletAddress})
    .on('transactionHash', (hash) => {
      console.log('Approval Transaction Hash:', hash);
    })
    .then((receipt) => {
        this.purchaseItem(MaslowPyramidID, this.data.itemId, this.myInput?.nativeElement.value);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }

  purchaseItem(smartObject: any, carbOreId: any, quantity: any)
  {
    console.log("Purchasing item");
    // Get contract.
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, WorldAddress);
  
    // Call purchaseItem
    // Player purchases from station
    contract.methods.velorumtest7__purchaseItem(smartObject, carbOreId, quantity).send({from: this.walletAddress})
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
