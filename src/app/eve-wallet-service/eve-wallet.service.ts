import { Injectable, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { EveWalletData } from './eve-wallet-data.interface';
import { ERC20_ABI } from './ABIs/ERC20.abi';
import { EVETokenContractAddress } from './eve-wallet-constants';
import { HttpClient } from '@angular/common/http';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';

@Injectable({
  providedIn: 'root'
})
export class EveWalletService {
  web3: Web3 = null;

  walletAddresses: string[]; // All accounts in the wallet.

  activeWallet: EveWalletData; // The currently active wallet's info.

  constructor( private http: HttpClient)
  {
    if (typeof (window as any).ethereum !== 'undefined')
    {
      this.web3 = new Web3((window as any).ethereum);
      this.getWallets();
      this.dumpWalletInfo();
    }
  }

  dumpWalletInfo()
  {
    console.log(this.activeWallet);
  }

  getWalletInfo()
  {
    // Return a copy of the active wallet data.
    return {...this.activeWallet};
  }

  getWallets()
  {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
      console.log('Wallets:', accounts);
      this.walletAddresses = accounts;
      console.log('Active Wallet:', this.activeWallet);
      this.changeActiveWallet(accounts[0]);
    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }
  
  changeActiveWallet(walletAddress: string)
  {
    // Clear data from previous wallet.
    this.activeWallet = new EveWalletData();
    this.activeWallet.address = walletAddress;

    // Then get new wallet data.
    this.getUpdateWalletInfo();
  }
  
  getUpdateWalletInfo()
  {
    this.getChainId();
    this.getGasBalance();
    this.getEVETokenBalance();
    this.getUserName();
  }

  getUserName()
  {
    // Get username from the backend.
    this.http.get<SmartCharacterInfo>(
      'https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + this.activeWallet.address,
    ).subscribe((response) => {
      // Handle the response here
      this.activeWallet.username = response.name;
    });
  }

  getEVETokenBalance()
  {
    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);

    tokenContract.methods.balanceOf(this.activeWallet.address).call().then((value: any) => {
      console.log('EVE Token Balance:', Number(value));
      this.activeWallet.eveTokenBalance = Number(value);
    });
  }

  getGasBalance()
  {
    this.web3.eth.getBalance(this.activeWallet.address).then((value: bigint) => {
      this.activeWallet.gasBalance = Number(value);
    });  
  }
  
  getChainId()
  {
    (window as any).ethereum.request({ method: 'eth_chainId' }).then((chainId: string) => {
      console.log('Chain ID:', chainId);
      this.activeWallet.chain = parseInt(chainId,16).toString();
    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }
}
