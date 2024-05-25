import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemTrackerComponent } from './system-tracker/system-tracker.component';
import { DeployableJsonComponent } from './deployable-json/deployable-json.component';
import { UserJsonComponent } from './user-json/user-json.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SystemTrackerComponent,
    DeployableJsonComponent,
    UserJsonComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
