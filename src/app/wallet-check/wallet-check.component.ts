import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';

@Component({
  selector: 'app-wallet-check',
  templateUrl: './wallet-check.component.html',
  styleUrl: './wallet-check.component.css'
})
export class WalletCheckComponent implements OnInit{

  public walletAddress: string;
  public username: string;
  constructor(private http:HttpClient) { }

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
      this.getCharInfo(this.walletAddress);
    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }

  getCharInfo(walletAddress: string) {
      this.http.get<SmartCharacterInfo>(
        'https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + this.walletAddress,
      ).subscribe((response) => {
        // Handle the response here
        this.username = response.name;
    });
  }
}
