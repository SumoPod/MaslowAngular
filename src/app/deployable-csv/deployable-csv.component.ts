import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DetailedDeployableInfo, Inventory } from '../system-tracker/deployable-data.model';
import { map } from 'rxjs';
import { SmartDeployable } from '../system-tracker/smart-deployable.model';
import { InfoICareAbout } from '../system-tracker/system-tracker.component';

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
  constructor(private http: HttpClient) {

   }

  ngOnInit() {
    this.http
          .get<SmartDeployable[]>(
            'https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables',
          )
          .pipe(
            map((deployables) => deployables.filter((deployable) => deployable.isOnline))
          )
          .subscribe((deployables) => {
            this.systemDeployables = deployables;
            this.requestSpecificInfo();
          });
  }

  requestSpecificInfo() {
    for(let deployable of this.systemDeployables) {
      this.http
        .get<DetailedDeployableInfo>(
          'https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables/'+deployable.id,
        )
        .subscribe((info) => {
          let worth = this.calculateInventoryValue(info.inventory);
          this.pData.push(new InfoICareAbout(deployable.id, info.name, info.ownerName, info.solarSystem.solarSystemName, worth, info.ownerId));
          this.csv += info.name + "," + info.ownerName + "," + info.solarSystem.solarSystemName + "," + worth + "\n";
          // Add to json object
          this.jsonData.push({ name: info.name, owner: info.ownerName, system: info.solarSystem.solarSystemName, worth: worth });
        });
    }
  }

  calculateInventoryValue(inventory: Inventory) {
      return inventory.storageItems.reduce((acc, item) => {
        return acc + (item.quantity * this.price);
      }, 0);
  }
}