import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Inventory } from '../eve-wallet-service/Interfaces/deployable-data.model';
import { SmartDeployable } from '../eve-wallet-service/Interfaces/smart-deployable.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  styleUrl: './system-tracker.component.css',
})
export class SystemTrackerComponent implements OnInit {
  readonly price:number = 1;
  public systemDeployables: SmartDeployable[] = [];
  pData = new MatTableDataSource<InfoICareAbout>([]);
  displayedColumns: string[] = ['deployableName', 'ownerName', 'solarSystemName', 'worth'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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

  ngAfterViewInit() {
    this.pData.paginator = this.paginator;
    this.pData.sort = this.sort;
  }

  requestSpecificInfo()
  {
    for(let deployable of this.systemDeployables)
      {
        this.eveApi.getSmartDeployableInfo(deployable.id)
        .subscribe((info) => {
          let worth = this.calculateInventoryValue(info.inventory);
          this.pData.data = [...this.pData.data, new InfoICareAbout(deployable.id, info.name, info.ownerName, info.solarSystem.solarSystemName, worth, info.ownerId)];
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
}
