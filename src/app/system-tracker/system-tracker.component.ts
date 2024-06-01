import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DetailedDeployableInfo, Inventory } from '../eve-wallet-service/Interfaces/deployable-data.model';
import { SmartDeployable } from '../eve-wallet-service/Interfaces/smart-deployable.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

export class InfoICareAbout {
  public id: string;
  public deployableName: string;
  public ownerName: string;
  public solarSystemName: string;
  public worth: number;
  public ownerId: string;

  constructor(id: string, deployableName: string, ownerName: string, solarSystemName: string, worth: number, ownerId: string) {
    this.id = id;
    this.deployableName = deployableName != "" ? deployableName : "<<Empty Name>>";
    this.ownerName = ownerName;
    this.solarSystemName = solarSystemName;
    this.worth = worth;
    this.ownerId = ownerId;
  }
}

@Component({
  selector: 'app-system-tracker',
  templateUrl: './system-tracker.component.html',
  styleUrl: './system-tracker.component.css'
})
export class SystemTrackerComponent implements OnInit {
  readonly price:number = 1;
  public systemDeployables: SmartDeployable[] = [];
  public pData: InfoICareAbout[] = [];

  constructor(private eveApi: EveApiService) {}

  ngOnInit() {
    this.eveApi.getSmartDeployables()
      .pipe(
        map((deployables) => deployables.filter((deployable) => deployable.isOnline))
      )
      .subscribe((deployables) => {
        this.systemDeployables = deployables;
        this.requestSpecificInfo();
      });
  }

  requestSpecificInfo()
  {
    for(let deployable of this.systemDeployables)
      {
        this.eveApi.getSmartDeployableInfo(deployable.id)
        .subscribe((info) => {
          let worth = this.calculateInventoryValue(info.inventory);
          this.pData.push(new InfoICareAbout(deployable.id, info.name, info.ownerName, info.solarSystem.solarSystemName, worth, info.ownerId));
          this.sortDeployables();
        });
    }
  }

  calculateInventoryValue(inventory: Inventory)
  {
    // Each item is worth 1 because there's no way to know prices.
    return inventory.storageItems.reduce((acc, item) => {
      return acc + (item.quantity * this.price);
    }, 0);
  }

  sortDeployables()
  {
    // Sort pdata by worth
    this.pData.sort((a, b) => {
      if (a.deployableName.startsWith("Maslow"))
      {
        return -1; // "Maslow" comes first
      }
      else if (b.deployableName.startsWith("Maslow"))
      {
        return 1; // "Maslow" comes first
      }
      else
      {
        return b.worth - a.worth; // sort by worth
      }
    });
  }
}
