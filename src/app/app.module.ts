import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemTrackerComponent } from './system-tracker/system-tracker.component';
import { DeployableJsonComponent } from './deployable-json/deployable-json.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketComponent } from './web-socket/web-socket.component';
import { ItemLedgerComponent } from './item-ledger/item-ledger.component';
import { ItemDetailComponent } from './item-ledger/item-detail/item-detail.component';
import { UserRankingComponent } from './user-ranking/user-ranking.component';
import { WalletCheckComponent } from './wallet-check/wallet-check.component';
import { WalletDonationsComponent } from './wallet-donations/wallet-donations.component';
import { FormsModule } from '@angular/forms';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    SystemTrackerComponent,
    DeployableJsonComponent,
    UserJsonComponent,
    HomeComponent,
    WebSocketComponent,
    ItemLedgerComponent,
    ItemDetailComponent,
    UserRankingComponent,
    WalletCheckComponent,
    WalletDonationsComponent,
    VendingMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
