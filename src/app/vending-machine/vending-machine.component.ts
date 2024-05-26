import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { VENDING_MACHINE_ABI } from './VendingMachine.abi';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrl: './vending-machine.component.css'
})
export class VendingMachineComponent implements OnInit{

  readonly VendingMachine_Address = "0x8dc9cab3e97da6df615a8a24cc07baf110d63071";

  public web3: Web3 = null;
  walletAddress: string = null;

  constructor()
  {
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
      this.walletAddress = null;
    });
  }

  doVending()
  {
    console.log('Vending...');
    if(this.walletAddress != null)
    {
      let vendingContract = new this.web3.eth.Contract(VENDING_MACHINE_ABI, this.VendingMachine_Address);

      let smartObjectId = "70860015881416286250264768493881199026372532447349543657468792188196383309615";
      let commonOreTypeId = "54949089622078329307676094148632864879426651785510047822079265544250486580483";
      vendingContract.methods.test2__executeVendingMachine( smartObjectId,1,commonOreTypeId).send(
        {
          from: this.walletAddress,
        }
      ).then((receipt: any) => {
        console.log('Receipt:', receipt);
        console.log('Hash:', receipt.transactionHash);
      }).catch((error: any) => {
        console.error('Error: ' + error.error.message);
      }).finally(() => {
        console.log('Vending complete');
      });
    }
  }

  doConfig()
  {
    console.log('Config...');
    
    let vendingContract = new this.web3.eth.Contract(VENDING_MACHINE_ABI, this.VendingMachine_Address);

    let smartObjectId = "70860015881416286250264768493881199026372532447349543657468792188196383309615";
    // Common ore
    let itemIn = "54949089622078329307676094148632864879426651785510047822079265544250486580483";
    // Carbonaceous Ore
    // let itemOut = "9540969374646031328134197690309428632894452754236413416084198707556493884019";
    // Water Ice
    let itemOut = "4849213586578758516979693453515271935121030808792700292547098743263487050031";
    let quantityIn = 1;
    let quantityOut = 1;

    vendingContract.methods.test2__setVendingMachineRatio( smartObjectId, itemIn, itemOut, quantityIn, quantityOut).send(
      {
        from: this.walletAddress,
      }
    ).then((receipt: any) => {
      console.log('Receipt:', receipt);
      console.log('Hash:', receipt.transactionHash);
    }).catch((error: any) => {
      console.error('Error: ' + error.error.message);
    }).finally(() => {
      console.log('Config complete');
    });

    // {
    //   "name": "smartObjectId",
    //   "type": "uint256",
    //   "internalType": "uint256"
    // },
    // {
    //   "name": "inventoryItemIdIn",
    //   "type": "uint256",
    //   "internalType": "uint256"
    // },
    // {
    //   "name": "inventoryItemIdOut",
    //   "type": "uint256",
    //   "internalType": "uint256"
    // },
    // {
    //   "name": "quantityIn",
    //   "type": "uint256",
    //   "internalType": "uint256"
    // },
    // {
    //   "name": "quantityOut",
    //   "type": "uint256",
    //   "internalType": "uint256"
    // }
  }
}
