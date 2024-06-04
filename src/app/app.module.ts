import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemTrackerComponent } from './system-tracker/system-tracker.component';
import { DeployableJsonComponent } from './deployable-json/deployable-json.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
/** Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
/** App components */
import { WebSocketComponent } from './web-socket/web-socket.component';
import { ItemLedgerComponent } from './item-ledger/item-ledger.component';
import { ItemDetailComponent } from './item-ledger/item-detail/item-detail.component';
import { UserRankingComponent } from './user-ranking/user-ranking.component';
import { WalletCheckComponent } from './wallet-check/wallet-check.component';
import { WalletDonationsComponent } from './wallet-donations/wallet-donations.component';
import { FormsModule } from '@angular/forms';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { RankingCsvComponent } from './ranking-csv/ranking-csv.component';
import { DeployableCsvComponent } from './deployable-csv/deployable-csv.component';
import { TraderMachineComponent } from './trader-machine/trader-machine.component';
import { SellableItemComponent } from './trader-machine/sellable-item/sellable-item.component';
import { BuyableItemComponent } from './trader-machine/buyable-item/buyable-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';

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
    VendingMachineComponent,
    RankingCsvComponent,
    DeployableCsvComponent,
    TraderMachineComponent,
    SellableItemComponent,
    BuyableItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatSort,
    MatSortModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
