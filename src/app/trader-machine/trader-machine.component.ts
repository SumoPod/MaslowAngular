import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { ERC20_ABI } from '../wallet-check/ERC20.abi';
import { VEL_TRADER_ABI } from './IItemSeller.abi';

@Component({
  selector: 'app-trader-machine',
  templateUrl: './trader-machine.component.html',
  styleUrl: './trader-machine.component.css'
})
export class TraderMachineComponent implements OnInit{
  readonly EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';
  readonly velTraderContractAddress:string = '0x04ABBD2F307F37367d3E05CaD0A3200790fDec9A';
  
  web3: any;
  walletAddress: string;
  
  numberOfOre: number;

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

  purchaseCarbOre() {
    // Smart Object
    let smartObject = "45228697695947564033082854924954193006092773360381611920298456273008413001782";
    // ObjetId
    let carbOreId = "9540969374646031328134197690309428632894452754236413416084198707556493884019";
    // Quantity
    let quantity = 1;
    // Price
    let price = 1;
    // Approve the contract to spend the token
    let eveNeeded = quantity * price;

    this.approveAndPurchase(eveNeeded, smartObject, carbOreId, quantity);
  }

  approveAndPurchase(amount: number /* in EVE */, smartObject: string, carbOreId: string, quantity: number)
  {
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);

    // Get approve
    EVEContract.methods.approve(this.velTraderContractAddress, amount * 1e18).send({from: this.walletAddress})
    .on('transactionHash', (hash) => {
      console.log('Approval Transaction Hash:', hash);
    })
    .then((receipt) => {
      console.log('Approval Receipt:', receipt);
      setTimeout(() => {
        this.purchaseItem(smartObject, carbOreId, quantity);
      }, 10000);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }
  
  purchaseItem( smartObject: string, carbOreId: string, quantity: number)
  {
    console.log("Purchasing item");
    // Get contract.
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.velTraderContractAddress);
  
    // Call purchaseItem
    try {
      contract.methods.velorumtest2__purchaseItem(smartObject, carbOreId, quantity).send({from: this.walletAddress})
        .on('transactionHash', (hash) => {
          console.log('Purchase Transaction Hash:', hash);
        })
        .then((receipt) => {
          console.log('Purchase Receipt:', receipt);
        })
        .catch((error) => {
          console.error('Purchase Error:', error);
        });
    } catch (error) {
      console.error('Transaction Reverted:', error);
    }

  }


  // "name": "velorumtest2__purchaseItem",
  // "inputs": [
  //   {
  //     "name": "smartObjectId",
  //     "type": "uint256",
  //     "internalType": "uint256"
  //   },
  //   {
  //     "name": "inventoryItemId",
  //     "type": "uint256",
  //     "internalType": "uint256"
  //   },
  //   {
  //     "name": "quantity",
  //     "type": "uint256",
  //     "internalType": "uint256"
  //   }
  // ],
  // "outputs": [],
}
