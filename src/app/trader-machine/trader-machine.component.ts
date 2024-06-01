import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { ERC20_ABI } from '../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../eve-wallet-service/ABIs/IItemSeller.abi';
import { SellableItem } from './sellable-item/sellable-item.component';
import { WebSocketMessage } from '../eve-wallet-service/Interfaces/web-socket.model';
import { BuyableItem } from './buyable-item/buyable-item.component';
import { EphemeralInventory } from '../eve-wallet-service/Interfaces/deployable-data.model';
import { CarbonaceousOreTypeId, EVETokenContractAddress, MaslowPyramidID, VelTraderContractAddress_v3, WorldAddress, getNameFromID } from '../eve-wallet-service/eve-wallet-constants';
import { EveWalletService } from '../eve-wallet-service/eve-wallet.service';
import { MaslowService } from '../eve-wallet-service/maslow.service';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-trader-machine',
  templateUrl: './trader-machine.component.html',
  styleUrl: './trader-machine.component.css'
})
export class TraderMachineComponent implements OnInit{

  sellableItems: SellableItem[] = [];
  buyableItems: BuyableItem[] = [];
 
  ws: WebSocket;
  
  numberOfOre: number;
  errorText: any;

  constructor( private maslowService: MaslowService, private eveApi: EveApiService) {
  }

  ngOnInit(): void
  {
    this.getSellingData();
  }

  getSellingData()
  {
    // Hardcoded values because the contract doesn't support this yet.
    // Get from contract available items and prices
    this.maslowService.getPriceData(MaslowPyramidID, CarbonaceousOreTypeId)
    .then((data: any) => {
      this.sellableItems.push({
        itemId: CarbonaceousOreTypeId,
        name: getNameFromID(CarbonaceousOreTypeId),
        price: Number( data.price),
        quantity: 0 // Read from json.
      });
      // Same for buyables
      this.buyableItems.push({
        itemId: CarbonaceousOreTypeId,
        typeId: '77811',
        name: getNameFromID(CarbonaceousOreTypeId),
        price: Number( data.price), // It's the same for buy/sell.
        quantity: 0 // Read from json
      });

      // Start ws connection
      this.startWSConnection();
    }).catch((error: any) => {
      console.error(error);
    });
  }

  startWSConnection()
  {
    this.ws = this.eveApi.getUserDeployableWS(this.maslowService.wallet.activeWallet.address, MaslowPyramidID);

    this.ws.onmessage = (event) => {
      this.updateWSocketData(JSON.parse(event.data));
    };
  }

  updateWSocketData(data: WebSocketMessage)
  {
    // Access smartdeployable inventory
    let inventory = data.smartDeployable.inventory.storageItems;

    // Iterate the stored items and look for the ones in the station-buyable items to update the quantity
    for (let i = 0; i < this.buyableItems.length; ++i)
    {
      let buyableItem = this.buyableItems[i];
      // Find the item in the inventory with the same id
      let inventoryItem = inventory.find((element) => element.itemId == buyableItem.itemId);

      buyableItem.quantity = inventoryItem ? inventoryItem.quantity : 0;
    }

    // Access player ephemeral inventory
    let ephemeralInventory:EphemeralInventory = data.smartDeployable.inventory.ephemeralInventoryList.find((element) => element.ownerId == this.maslowService.wallet.activeWallet.address);

    // Loop through items.
    if (ephemeralInventory)
    {
      let ephemeralItems = ephemeralInventory.ephemeralInventoryItems;

      for (let i = 0; i < ephemeralItems.length; ++i)
      {
        let ephemeralItem = ephemeralItems[i];
        // Find the item in the inventory with the same id
        let sellableItem = this.sellableItems.find((element) => element.itemId == ephemeralItem.itemId);

        if (sellableItem)
        {
          sellableItem.quantity = ephemeralItem.quantity;
        }
      }
    }
  }

  purchaseCarbOre()
  {
    // Quantity
    let quantity = 1;
    // Price
    let price = 1;
    // Approve the contract to spend the token
    let eveNeeded = quantity * price;

    this.approveAndPurchase(eveNeeded, MaslowPyramidID, CarbonaceousOreTypeId, quantity);
  }

  approveAndPurchase(amount: number /* in EVE */, smartObject: string, carbOreId: string, quantity: number)
  {
    // // Get approve
    this.maslowService.wallet.approveEVE(VelTraderContractAddress_v3, amount * 1e18)
    .on('transactionHash', (hash) => {
      console.log('Approval Transaction Hash:', hash);
    })
    .then((receipt) => {
      console.log('Approval Receipt:', receipt.transactionHash);
      // Then buy.
      this.purchaseItem(smartObject, carbOreId, quantity);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }

  checkAllowance()
  {
    this.maslowService.wallet.getEVEAllowance(VelTraderContractAddress_v3)
    .then((value: any) => {
      console.log('Allowance:', Number(value)/1e18);
    });
  }
  
  purchaseItem( smartObject: string, carbOreId: string, quantity: number)
  {
    this.maslowService.purchaseItem(smartObject, carbOreId, quantity)
    .then((receipt) => {
      console.log('Purchase Receipt:', receipt);
    })
    .catch((error) => {
      console.error('Purchase Error:', error);
    });
  }
}
