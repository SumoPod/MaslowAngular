import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { ERC20_ABI } from '../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../eve-wallet-service/ABIs/IItemSeller.abi';
import { SellableItem } from './sellable-item/sellable-item.component';
import { WebSocketMessage } from '../web-socket/web-socket.model';
import { BuyableItem } from './buyable-item/buyable-item.component';
import { EphemeralInventory } from '../system-tracker/deployable-data.model';
import { CarbonaceousOreTypeId, EVETokenContractAddress, MaslowPyramidID, VelTraderContractAddress_v3, WorldAddress, getNameFromID } from '../eve-wallet-service/eve-wallet-constants';
import { EveWalletService } from '../eve-wallet-service/eve-wallet.service';
import { MaslowService } from '../eve-wallet-service/maslow.service';

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

  constructor( private maslowService: MaslowService) {
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
      this.startWSConnection( MaslowPyramidID );
    }).catch((error: any) => {
      console.error(error);
    });
  }

  startWSConnection( deployableId: string) {
    // ws connection using walletAdress and smartDeployable id
    this.ws = new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/'+ this.maslowService.wallet.activeWallet.address + '/' + deployableId);

    this.ws.onmessage = (event) => {
      this.updateWSocketData(JSON.parse(event.data));
    };
  }

  updateWSocketData(data: WebSocketMessage)
  {
    console.log('WSocket data:');
    console.log(data);
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
      console.log('Ephemeral inventory of ' + ephemeralInventory.ownerName + ' found');
      let ephemeralItems = ephemeralInventory.ephemeralInventoryItems;

      for (let i = 0; i < ephemeralItems.length; ++i)
      {
        let ephemeralItem = ephemeralItems[i];
        
        console.log('idId: ' + ephemeralItem.itemId);
        // Find the item in the inventory with the same id
        let sellableItem = this.sellableItems.find((element) => element.itemId == ephemeralItem.itemId);

        if (sellableItem)
        {
          console.log('Updating buyable item quantity' + ephemeralItem.quantity);
          sellableItem.quantity = ephemeralItem.quantity;
        }
        else
        {
          console.log('Item not found in buyable items');
        }
      }
      console.log("end of loop")
    }
    else
    {
      console.log('Ephemeral inventory not found');
    }
  }

  purchaseCarbOre() {
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
      this.purchaseItem(smartObject, carbOreId, quantity);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }

  checkAllowance(walletAddress: string, velTraderContractAddress: string) {
    this.maslowService.wallet.getEVEAllowance(VelTraderContractAddress_v3)
    .then((value: any) => {
      console.log('Allowance:', Number(value)/1e18);
    });
  }
  
  purchaseItem( smartObject: string, carbOreId: string, quantity: number)
  {
    console.log("Purchasing item");
    // // Get contract.
    // let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, WorldAddress);
  
    // // Call purchaseItem
    // contract.methods.velorumtest3__purchaseItem(smartObject, carbOreId, quantity).send({from: this.walletAddress})
    this.maslowService.puchaseItem(smartObject, carbOreId, quantity)
    .then((receipt) => {
      console.log('Purchase Receipt:', receipt);
    })
    .catch((error) => {
      console.error('Purchase Error:', error);
    });
  }
}
