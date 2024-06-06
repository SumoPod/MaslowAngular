import { Injectable } from '@angular/core';
import { EveWalletService } from './eve-wallet.service';
import { CarbonaceousOreTypeId, MaslowPyramidID, WorldAddress } from './eve-wallet-constants';
import { VEL_TRADER_ABI } from './ABIs/IItemSeller.abi';
import { TransactionReceipt } from 'web3-types/lib/commonjs/eth_types';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaslowService {

  velTraderContract = null;

  constructor(public wallet: EveWalletService) { }

  getPriceData( stationID: string, typeID: string ): Promise<any>
  {
    return this.getVelContract().methods.velorumtest42__getItemPriceData(stationID,typeID).call();
  }

  purchaseItem( stationID: string, typeID: string, quantity: number ): Promise<TransactionReceipt>
  {
    return this.getVelContract().methods.velorumtest42__purchaseItem(stationID,typeID,quantity).send({from: this.wallet.activeWallet.address});
  }

  sellItem( stationID: string, typeID: string, quantity: number): Promise<TransactionReceipt>
  {
    return this.getVelContract().methods.velorumtest42__sellItem(stationID,typeID,quantity).send({from: this.wallet.activeWallet.address});
  }
  getAllItems(){
    return this.getVelContract().methods.velorumtest42__getAllItems().call()
  }

  // Contracts getters.
  getVelContract()
  {
    return !!this.velTraderContract ? this.velTraderContract : this.wallet.getContract( VEL_TRADER_ABI, WorldAddress );
  }

  //Liquidity

  getAllInvestments()
  {
    return this.getVelContract().methods.velorumtest42__getAllInvestments();
  }
  invest()
  {
    return this.getVelContract().methods.velorumtest42__invest();
  }
  collectRewards()
  {
    return this.getVelContract().methods.velorumtest42__collectRewards();
  }
  giveBackInvestment()
  {
    return this.getVelContract().methods.velorumtest42__giveBackInvestment();
  }
  
}

