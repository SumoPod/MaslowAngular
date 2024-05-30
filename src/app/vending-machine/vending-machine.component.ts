import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { VEL_VENDING_MACHINE_ABI } from './VelVendingMachine.abi';
import { CarbonaceousOreTypeId, CommonOreTypeId, MaslowPyramidID, WorldAddress } from '../eve-wallet-service/eve-wallet-constants';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrl: './vending-machine.component.css'
})
export class VendingMachineComponent implements OnInit{

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
      let vendingContract = new this.web3.eth.Contract(VEL_VENDING_MACHINE_ABI, WorldAddress);

      vendingContract.methods.velorumtest__executeVendingMachine( MaslowPyramidID,1,CommonOreTypeId).send(
        {
          from: this.walletAddress,
          gas: "3000000", // Replace this with the gas limit you want to set
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
    let vendingContract = new this.web3.eth.Contract(VEL_VENDING_MACHINE_ABI, WorldAddress);

    let quantityIn = 1;
    let quantityOut = 1;

    vendingContract.methods.velorumtest__setVendingMachineRatio( MaslowPyramidID, CommonOreTypeId, CarbonaceousOreTypeId, quantityIn, quantityOut).send(
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
  }
}
