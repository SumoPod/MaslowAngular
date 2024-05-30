import { Component, OnInit } from '@angular/core';
import { Web3 } from 'web3';
import { ERC20_ABI } from '../wallet-check/ERC20.abi';
import { VEL_TRADER_ABI } from './IItemSeller.abi';
import { SellableItem } from './sellable-item/sellable-item.component';
import { WebSocketMessage } from '../web-socket/web-socket.model';
import { BuyableItem } from './buyable-item/buyable-item.component';
import { EphemeralInventory } from '../system-tracker/deployable-data.model';

@Component({
  selector: 'app-trader-machine',
  templateUrl: './trader-machine.component.html',
  styleUrl: './trader-machine.component.css'
})
export class TraderMachineComponent implements OnInit{

  sellableItems: SellableItem[] = [];
  buyableItems: BuyableItem[] = [];

  readonly  EVETokenContractAddress = '0xec79573FAC3b9C103819beBBD00143dfD67059DA';
  readonly velTraderContractAddress = '0xC52C1B857266e6479B412AB6B1C270d0173e13d8';
  readonly worldAddress = '0x8dc9cab3e97da6df615a8a24cc07baf110d63071';
  
  web3: any;
  ws: WebSocket;
  walletAddress: string;
  
  numberOfOre: number;
  errorText: any;

  constructor() {
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
    this.listenToEvents();
  }

  getWallets() {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
      console.log('Wallets:', accounts);
      this.walletAddress = accounts[0];

      this.getSellingData();

    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }

  getSellingData()
  {
    // Hardcoded values because the contract doesn't support this yet.
    let carbOreId = '9540969374646031328134197690309428632894452754236413416084198707556493884019';
    // MAslow pyramid id
    let smartObject = '45228697695947564033082854924954193006092773360381611920298456273008413001782';


    // Get from contract available items and prices
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
    contract.methods.velorumtest7__getItemPriceData(smartObject,carbOreId).call()
    .then((data: any) => {
      this.sellableItems.push({
        itemId: carbOreId,
        name: this.getNameFromID(carbOreId),
        price: Number( data.price),
        quantity: 0 // Read from json.
      });
      // Same for buyables
      this.buyableItems.push({
        itemId: carbOreId,
        typeId: '77811',
        name: this.getNameFromID(carbOreId),
        price: Number( data.price), // It's the same for buy/sell.
        quantity: 0 // Read from json
      });

      // Start ws connection
      this.startWSConnection( smartObject );
    }).catch((error: any) => {
      console.error(error);
    });
  }

  startWSConnection( deployableId: string) {
    // ws connection using walletAdress and smartDeployable id
    this.ws = new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/'+ this.walletAddress + '/' + deployableId);

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
    let ephemeralInventory:EphemeralInventory = data.smartDeployable.inventory.ephemeralInventoryList.find((element) => element.ownerId == this.walletAddress);

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

  getNameFromID(id: string): string
  {
    switch (id)
    {
      case '9540969374646031328134197690309428632894452754236413416084198707556493884019':
        return 'Carb Ore';
      case '45228697695947564033082854924954193006092773360381611920298456273008413001782':
        return 'Maslow Pyramid';
      case '0xec79573FAC3b9C103819beBBD00143dfD67059DA':
        return 'EVE Token';
      default:
        return 'Unknown';
    }
  }

  purchaseCarbOre() {
    // Smart Object
    let smartObject = '45228697695947564033082854924954193006092773360381611920298456273008413001782';
    // ObjetId
    let carbOreId = '9540969374646031328134197690309428632894452754236413416084198707556493884019';
    // Quantity
    let quantity = 1;
    // Price
    let price = 1;
    // Approve the contract to spend the token
    let eveNeeded = quantity * price;

    this.approveAndPurchase(eveNeeded, smartObject, carbOreId, quantity);
  }

  approveAndPurchase(amount: number /* in EVE */, smartObject: string, carbOreId: string, quantity: number)
  {
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);

    // Get approve
    EVEContract.methods.approve(this.velTraderContractAddress, 2 * amount * 1e18).send({from: this.walletAddress})
    .on('transactionHash', (hash) => {
      console.log('Approval Transaction Hash:', hash);
    })
    .then((receipt) => {
      console.log('Approval Receipt:', receipt);
        this.checkAllowance(this.walletAddress, this.velTraderContractAddress);
      setTimeout(() => {
        this.purchaseItem(smartObject, carbOreId, quantity);
      }, 2000);
    })
    .catch((error) => {
      console.error('Approval Error:', error);
    });
  }

  checkAllowance(walletAddress: string, velTraderContractAddress: string) {
    let EVEContract = new this.web3.eth.Contract(ERC20_ABI, this.EVETokenContractAddress);
    EVEContract.methods.allowance(walletAddress, velTraderContractAddress).call().then((value: any) => {
      console.log('Allowance:', Number(value)/1e18);
    });
  }
  
  purchaseItem( smartObject: string, carbOreId: string, quantity: number)
  {
    console.log("Purchasing item");
    // Get contract.
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
  
    // Call purchaseItem
    contract.methods.velorumtest3__purchaseItem(smartObject, carbOreId, quantity).send({from: this.walletAddress})
      .on('transactionHash', (hash) => {
        console.log('Purchase Transaction Hash:', hash);
      })
      .then((receipt) => {
        console.log('Purchase Receipt:', receipt);
      })
      .catch((error) => {
        console.error('Purchase Error:', error);
      });
  }

  getPrice()
  {
    // Maslows Pyramid
    let smartObjectId = `45228697695947564033082854924954193006092773360381611920298456273008413001782`;
    // Carb Ore
    let inventoryItemId = `9540969374646031328134197690309428632894452754236413416084198707556493884019`;    

    // Call get price
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
    contract.methods.velorumtest3__getItemPriceData(smartObjectId, inventoryItemId).call()
    .then((data) => {
      console.log('Get item data:');
      console.log(data);
      this.errorText = "Priced at " + data.price + " EVE tokens.";
    })
    .catch((error) => {
      console.error(error);
      // this.errorText = error.message;
    });
  }

  getAddress()
  {
    let EVEcontract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
    // call get adress
    EVEcontract.methods.velorumtest3__getContractAddress().call()
    .then((data: string) => {
      console.log('Get address:');
      console.log(data);
    })
  }

  listenToEvents()
  {
    let contract = new this.web3.eth.Contract(VEL_TRADER_ABI, this.worldAddress);
    let subs = contract.events.allEvents();
    subs.on('data', (event: any) => {
      console.log('Event data:')
      console.log(event);
    });
    subs.on('error', (error: any) => {
      console.error('Event Error:')
      console.error(error);
    });
  }
}
