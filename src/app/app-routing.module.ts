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

const appRoutes: Routes = [
  { path: 'sysTracker', component: SystemTrackerComponent },
  { path: 'depJson/:id', component: DeployableJsonComponent },
  { path: 'charJson/:id', component: UserJsonComponent },
  { path: 'ws/:charId/:deployableId', component: WebSocketComponent },
  { path: 'items', component: ItemLedgerComponent },
  { path: 'ranking', component: UserRankingComponent },
  { path: 'wallet', component: WalletCheckComponent },
  { path: 'donate', component: WalletDonationsComponent },
  { path: 'vending', component: VendingMachineComponent },
  { path: 'rankingCsv', component: RankingCsvComponent },
  { path: 'deployCsv', component: DeployableCsvComponent },
  { path: '**', component: HomeComponent }
  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', component: RecipeStartComponent },
  //     { path: 'new', component: RecipeEditComponent },
  //     {
  //       path: ':id',
  //       component: RecipeDetailComponent,
  //       resolve: [RecipesResolverService]
  //     },
  //     {
  //       path: ':id/edit',
  //       component: RecipeEditComponent,
  //       resolve: [RecipesResolverService]
  //     }
  //   ]
  // },
  // { path: 'shopping-list', component: ShoppingListComponent },
  // { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
