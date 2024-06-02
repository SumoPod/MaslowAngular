import { Injectable } from '@angular/core';
import { TransactionReceipt, Web3 } from 'web3';
import { EveWalletData } from './Interfaces/eve-wallet-data.interface';
import { ERC20_ABI } from './ABIs/ERC20.abi';
import { EVETokenContractAddress, WorldChainId } from './eve-wallet-constants';
import { HttpClient } from '@angular/common/http';
import { SmartCharacterInfo } from './Interfaces/web-socket.model';

@Injectable({
  providedIn: 'root'
})
export class EveWalletService {
  web3: Web3 = null;

  walletAddresses: string[]; // All accounts in the wallet.

  activeWallet: EveWalletData = null; // The currently active wallet's info.

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

  isValid()
  {
    // Should check chain and FoF.
    let isValid = this.activeWallet?.address != null && this.activeWallet.chain == WorldChainId;
    return isValid;
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
      this.activeWallet.image = response.image;
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

  //-- Chain Operations.
  transferGas(gasToTransfer: string /*all decimals*/, toAddress: string, gasLimit: number = 210000): Promise<TransactionReceipt>
  {
    return this.web3.eth.sendTransaction({
      from: this.activeWallet.address,
      to: toAddress,
      value: gasToTransfer,
      gas: gasLimit
    })
  }

  // Should find a way for each token. Currently, only EVE.
  // Amount with all decimals.
  approveEVE( toAddress:string, amount: number)
  {
    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);

    return tokenContract.methods.approve(toAddress, amount).send(
      {from: this.activeWallet.address}
    );
  }

  transferEVE(toAddress: string, amount: number): Promise<TransactionReceipt>
  {
    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);

    return tokenContract.methods.transfer(toAddress, amount).send(
      {from: this.activeWallet.address}
    );
  }

  getEVEAllowance(spenderAddress: string)
  {
    let tokenContract = new this.web3.eth.Contract(ERC20_ABI, EVETokenContractAddress);

    return tokenContract.methods.allowance(this.activeWallet.address, spenderAddress).call();
  }

  getContract(contractABI: any, contractAddress: string)
  {
    return new this.web3.eth.Contract(contractABI, contractAddress);
  }
}