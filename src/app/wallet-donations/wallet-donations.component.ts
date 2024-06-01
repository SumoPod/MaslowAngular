import { Component, OnInit } from '@angular/core';
import { EveWalletService } from '../eve-wallet-service/eve-wallet.service';
import { EveWalletData } from '../eve-wallet-service/Interfaces/eve-wallet-data.interface';
import { TransactionReceipt } from 'web3-types/lib/commonjs/eth_types';

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

  walletData: EveWalletData;
  gasDonationAmount: number = 0.0001;
  eveDonationAmount: number = 0.01;

  constructor(private wallet: EveWalletService)
  { 
  } 

  ngOnInit(): void
  {
    this.walletData = this.wallet.getWalletInfo();  
  }

  clearDebugUI()
  {
    this.debugText = '---';
    this.errorText = '---';
    this.finalText = '---';
    this.hashText = '---';
  }

  doDonateGas()
  {
    this.clearDebugUI();
    let SumoWallet = "0x51Dc9419BdC4fD0220e496149CAe464c597E9f35";
    let amount: string = ( this.gasDonationAmount * 1e18).toString();
    this.wallet.transferGas(amount, SumoWallet)
    .then((receipt: TransactionReceipt) => {
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

  doDonateEve()
  {
    this.clearDebugUI();
    
    console.log("About to donate  " + this.eveDonationAmount + " EVE tokens to my wallet");
    let donationWalletAdress = '0x51Dc9419BdC4fD0220e496149CAe464c597E9f35';
    this.debugText = 'Donating ' + this.eveDonationAmount + ' EVE tokens to ' + donationWalletAdress;

    this.wallet.transferEVE(donationWalletAdress, this.eveDonationAmount*1e18)
    .then((receipt: TransactionReceipt) => {
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
}
