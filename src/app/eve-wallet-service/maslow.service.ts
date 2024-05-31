import { Injectable } from '@angular/core';
import { EveWalletService } from './eve-wallet.service';
import { CarbonaceousOreTypeId, MaslowPyramidID, WorldAddress } from './eve-wallet-constants';
import { VEL_TRADER_ABI } from './ABIs/IItemSeller.abi';
import { TransactionReceipt } from 'web3-types/lib/commonjs/eth_types';

@Injectable({
  providedIn: 'root'
})
export class MaslowService {

  constructor(public wallet: EveWalletService) { }

  getPriceData( stationID: string, typeID: string ): Promise<any>
  {
    let contract = this.wallet.getContract( VEL_TRADER_ABI, WorldAddress );
    
    return contract.methods.velorumtest7__getItemPriceData(stationID,typeID).call();
  }

  puchaseItem( stationID: string, typeID: string, quantity: number ): Promise<TransactionReceipt>
  {
    let contract = this.wallet.getContract( VEL_TRADER_ABI, WorldAddress );
    
    return contract.methods.velorumtest7__purchaseItem(stationID,typeID,quantity).send({from: this.wallet.activeWallet.address});
  }
}
