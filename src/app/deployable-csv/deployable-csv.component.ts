import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DetailedDeployableInfo, Inventory } from '../system-tracker/deployable-data.model';
import { map } from 'rxjs';
import { SmartDeployable } from '../eve-wallet-service/Interfaces/smart-deployable.model';
import { InfoICareAbout } from '../system-tracker/system-tracker.component';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-deployable-csv',
  templateUrl: './deployable-csv.component.html',
  styleUrl: './deployable-csv.component.css'
})
export class DeployableCsvComponent {


  readonly price:number = 1;
  public systemDeployables: SmartDeployable[] = [];

  public pData: InfoICareAbout[] = [];
  csv: string = "Name,Owner,System,Worth\n";
  jsonData: { name: string; owner: string, system: string, worth: number; }[] = [];
  constructor(private eveApi: EveApiService) {

   }

  ngOnInit()
  {
    this.eveApi.getSmartDeployables()
      .pipe(
        map((deployables) => deployables.filter((deployable) => deployable.isOnline))
      )
      .subscribe((deployables) => {
        this.systemDeployables = deployables;
        this.requestSpecificInfo();
      });
  }

  requestSpecificInfo() {
    for(let deployable of this.systemDeployables)
      {
        this.eveApi.getSmartDeployableInfo(deployable.id)
        .pipe(
          map(info => {
            let worth = this.calculateInventoryValue(info.inventory);
            let data = new InfoICareAbout(deployable.id, info.name, info.ownerName, info.solarSystem.solarSystemName, worth, info.ownerId);
            let csvRow = info.name + "," + info.ownerName + "," + info.solarSystem.solarSystemName + "," + worth + "\n";
            let jsonRow = { name: info.name, owner: info.ownerName, system: info.solarSystem.solarSystemName, worth: worth };
            return { data, csvRow, jsonRow };
          })
        )
        .subscribe(({ data, csvRow, jsonRow }) => {
          this.pData.push(data);
          this.csv += csvRow;
          this.jsonData.push(jsonRow);
        });
    }
  }

  calculateInventoryValue(inventory: Inventory)
  {
      return inventory.storageItems.reduce((acc, item) => {
        return acc + (item.quantity * this.price);
      }, 0);
  }
}