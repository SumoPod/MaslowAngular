import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../wallet-check/ERC20.abi';

@Component({
  selector: 'app-wallet-donations',
  templateUrl: './wallet-donations.component.html',
  styleUrl: './wallet-donations.component.css'
})
export class WalletDonationsComponent implements OnInit{

  debugText: string = '---';
  errorText: string = '---';
  finalText: string = '---';
  hashText: string = '---';
  readonly EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';

  public web3: Web3 = null;
  walletAddress: string;
  gasDonationAmount: number = 0.0001;
  eveDonationAmount: number = 0.01;

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
    });
  }

  clearDebugUI()
  {
    this.debugText = '---';
    this.errorText = '---';
    this.finalText = '---';
    this.hashText = '---';
  }

  doDonateGas() {
    this.clearDebugUI();
    let amount: string = ( this.gasDonationAmount * 1e18).toString();
    console.log('Amount:', amount);
    this.web3.eth.sendTransaction({
      from: this.walletAddress,
      to: '0x8eD42C0C5e306ccF5872A19B47eeCA95b9c0c8D0',
      value: amount,
      gas: 210000
    })
    .then(function(receipt){
      console.log('Transaction Hash:', receipt.transactionHash);
    });
  }

  doDonateEve() {
    this.clearDebugUI();
    console.log("About to donate  " + this.eveDonationAmount + " EVE tokens to my wallet");
    let donationWalletAdress = '0x8eD42C0C5e306ccF5872A19B47eeCA95b9c0c8D0';
    this.debugText = 'Donating ' + this.eveDonationAmount + ' EVE tokens to ' + donationWalletAdress;

    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);
    tokenContract.methods.transfer(donationWalletAdress, this.eveDonationAmount*1e18).send(
      {from: this.walletAddress}
    ).on('transactionHash', (hash: string) => {
      console.log('Transaction Hash:', hash);
      this.hashText = 'Transaction Hash: ' + hash;
    })
    .then((receipt: any) => {
      console.log('Transaction Hash:', receipt.transactionHash);
      this.debugText = 'Complete! Hash: ' + receipt.transactionHash;
    }).catch((error: any) => {
      console.error('Error:', error);
      this.errorText = 'Error: ' + error.error.message;
    }).finally(() => {
      console.log('Donation complete');
      this.finalText = 'Donation complete';
    });
  }

  // doDonate_raw() {
  //   let amount = (0.01 * 1e18).toString(16);

  //   (window as any).ethereum.request({
  //     method: 'eth_sendTransaction',
  //     params: [
  //       {
  //         // Balifeq's wallet address
  //         to: '0xA30CB273ef44EBfbfc228FA7EEc8DFE2439E8900',
  //         from: this.walletAddress,
  //         value: amount
  //       }
  //     ]
  //   }).then((txHash: string) => {
  //     console.log('Transaction Hash:', txHash);
  //   }).catch((error: any) => {
  //     console.error('Error:', error);
  //   });
  // }
}
