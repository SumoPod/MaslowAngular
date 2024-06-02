import { Component } from '@angular/core';
import { EveWalletService } from '../eve-wallet-service/eve-wallet.service';
import { EveWalletData } from '../eve-wallet-service/Interfaces/eve-wallet-data.interface';

@Component({
  selector: 'app-wallet-check',
  templateUrl: './wallet-check.component.html',
  styleUrl: './wallet-check.component.css'
})
export class WalletCheckComponent{
  public walletAddress: string;
  public chain: string;
  public username: string;
  public balance: number;
  public eveTokenBalance: number;

  walletData: EveWalletData;
  loading: boolean = true;

  constructor(private wallet: EveWalletService){}

  ngOnInit()
  {
    window.setTimeout(() => {
      this.walletData = this.wallet.getWalletInfo();
      console.log(this.walletData);
      this.loading = false;
    }, 2000);
  }
}