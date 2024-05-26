import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';
import Web3, { Uint256 } from 'web3';
import { ERC20_ABI } from './ERC20.abi';

@Component({
  selector: 'app-wallet-check',
  templateUrl: './wallet-check.component.html',
  styleUrl: './wallet-check.component.css'
})
export class WalletCheckComponent implements OnInit{
  readonly EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';
  public web3: Web3 = null;
  public walletAddress: string;
  public chain: string;
  public username: string;
  public balance: number;
  public eveTokenBalance: number;

  constructor(private http:HttpClient)
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
      this.getCharInfo(this.walletAddress);
    }).catch((error: any) => {
      console.error('Error:', error);
    });

    (window as any).ethereum.request({ method: 'eth_chainId' }).then((chainId: string) => {
      console.log('Chain ID:', chainId);
      this.chain = parseInt(chainId,16).toString();
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

        this.getGasBalance(walletAddress);
        this.getEVETokenBalance(walletAddress);
    });
  }

  getGasBalance(walletAddress: string) {
    this.web3.eth.getBalance(walletAddress).then((value: bigint) => {
      this.balance = Number(value)/1e18;
    });
  }

  getEVETokenBalance(walletAddress: string) {
    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);

    tokenContract.methods.balanceOf(walletAddress).call().then((value: any) => {
      console.log('EVE Token Balance:', Number(value));
      this.eveTokenBalance = Number(value)/1e18;
    });
  }
}
