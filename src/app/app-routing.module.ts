import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemTrackerComponent } from './system-tracker/system-tracker.component';
import { DeployableJsonComponent } from './deployable-json/deployable-json.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { HomeComponent } from './home/home.component';
import { WebSocketComponent } from './web-socket/web-socket.component';
import { ItemLedgerComponent } from './item-ledger/item-ledger.component';
import { UserRankingComponent } from './user-ranking/user-ranking.component';
import { WalletCheckComponent } from './wallet-check/wallet-check.component';
import { WalletDonationsComponent } from './wallet-donations/wallet-donations.component';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { RankingCsvComponent } from './ranking-csv/ranking-csv.component';
import { DeployableCsvComponent } from './deployable-csv/deployable-csv.component';
import { TraderMachineComponent } from './trader-machine/trader-machine.component';
import { ValidWalletGuard } from './guards/valid-wallet.guard';

const appRoutes: Routes = [
  { path: 'sysTracker', component: SystemTrackerComponent },
  { path: 'depJson/:id', component: DeployableJsonComponent },
  { path: 'charJson/:id', component: UserJsonComponent },
  { path: 'ws/:charId/:deployableId', component: WebSocketComponent },
  { path: 'items', component: ItemLedgerComponent },
  { path: 'ranking', component: UserRankingComponent },
  { path: 'wallet', component: WalletCheckComponent, canActivate: [ValidWalletGuard] },
  { path: 'donate', component: WalletDonationsComponent, canActivate: [ValidWalletGuard]},
  { path: 'vending', component: VendingMachineComponent, canActivate: [ValidWalletGuard] },
  { path: 'rankingCsv', component: RankingCsvComponent },
  { path: 'deployCsv', component: DeployableCsvComponent },
  { path: 'trade', component: TraderMachineComponent, canActivate: [ValidWalletGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
