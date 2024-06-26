import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Web3 from 'web3';
import { ERC20_ABI } from '../../eve-wallet-service/ABIs/ERC20.abi';
import { VEL_TRADER_ABI } from '../../eve-wallet-service/ABIs/IItemSeller.abi';
import { EVETokenContractAddress, getNameFromID, MaslowPyramidID, VelTraderContractAddress_v42, WorldAddress } from '../../eve-wallet-service/eve-wallet-constants';
import { MaslowService } from '../../eve-wallet-service/maslow.service';
import { EveApiService } from '../../eve-wallet-service/eve-api.service';

export interface BuyableItem {
  itemId: string; // BlockChain Id
  typeId: string; // Eve Id
  name: string;
  price: number; // with all decimals
  quantity: number; // How many in player inventory to be sold.
  SSUQuantity: number; // How many in SSU inventory
  targetQuantity: number;
}

@Component({
  selector: 'app-buyable-item',
  templateUrl: './buyable-item.component.html',
  styleUrl: './buyable-item.component.css'
})
export class BuyableItemComponent {
  brightQuantumColor = 'hsla(26, 85%, 58%, 1)';

  @Input() data: BuyableItem;
  @ViewChild('valueInput') valueInput: ElementRef;

  itemId: string;
  name: string;
  price: number;
  quantity: number;
  targetQuantity: number;
  src: string;

  constructor( private maslow: MaslowService, private eveApi: EveApiService) {}

  readonly FIXED_FEE = 1e17;

  get totalValueBuy(): number {
    if(! this.valueInput ) return 0;
    return this.data ? this.calculatePriceBuy(this.valueInput?.nativeElement.value): 0;
  }

  get totalValueSell(): number {

    if(! this.valueInput ) return 0;
    return this.data ? this.calculatePriceSell(this.valueInput?.nativeElement.value): 0;
  }

  ngOnInit(): void{
      this.getImg();
  }

  doSellItems()
  {
    // Purchase items in the abi
    this.maslow.sellItem(MaslowPyramidID, this.data.itemId, this.valueInput?.nativeElement.value);
  }

  doBuyItems()
  {
    this.maslow.wallet.approveEVE(VelTraderContractAddress_v42, this.totalValueBuy)
    .then(() => {
      this.maslow.purchaseItem(MaslowPyramidID, this.data.itemId, this.valueInput?.nativeElement.value);
    });
  }
  
  validateMax(inputEvent: any)
  {
    let max = Math.max(this.data.quantity,this.data.SSUQuantity);
    if (inputEvent.target.value > max)
    {
      inputEvent.target.value = max;
    }
  }

  calculatePriceBuy(quantity: number)
  {
    let cantidad = this.data.SSUQuantity
    let totalCost = 0;

    for (let qty = 0; qty < quantity; ++qty)
    {
      let spreadPercentage = cantidad / this.data.targetQuantity;
      let finalPrice = this.data.price * 2 * (1 - spreadPercentage);

      totalCost += finalPrice;
      --cantidad;
    }
    totalCost += this.FIXED_FEE;

    return totalCost
  }

  calculatePriceSell(quantity: number)
  {
    let cantidad = this.data.SSUQuantity
    let totalCost = 0;

    for (let qty = 0; qty < quantity; ++qty)
    {
      let spreadPercentage = (cantidad + 1) / this.data.targetQuantity;
      let finalPrice = this.data.price * 2 * (1 - spreadPercentage);

      totalCost += finalPrice;
      ++cantidad;
    }

    totalCost += this.FIXED_FEE;

    return totalCost
  }

  getImg()
  {
    this.eveApi.getItem(this.data.typeId)
    .subscribe((response) => {
      this.src = response.metadata.image
    })
  }
}