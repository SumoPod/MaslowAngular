import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemTrackerComponent } from './system-tracker/system-tracker.component';
import { DeployableJsonComponent } from './deployable-json/deployable-json.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'sysTracker', component: SystemTrackerComponent },
  { path: 'depJson/:id', component: DeployableJsonComponent },
  { path: 'charJson/:id', component: UserJsonComponent },
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
