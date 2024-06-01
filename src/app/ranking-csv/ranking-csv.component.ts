import { Component, OnInit } from '@angular/core';
import { User, ShownData } from '../user-ranking/user-ranking.component';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ranking-csv',
  templateUrl: './ranking-csv.component.html',
  styleUrl: './ranking-csv.component.css'
})
export class RankingCsvComponent  implements OnInit{
  allUsers: User[] = [];

  csv: string = "Name,Worth\n";

  dataTimeouts: any[] = [];
  sortTimeout: any;

  ranking: { name: string; worth: string; }[] = [];

  constructor( private eveApi: EveApiService)
  {
  }

  ngOnInit(): void {
    this.eveApi.getSmartCharacters()
    .subscribe((users) => {
      let i = 0;
      let batchSize = 25;

      while (i < users.length)
      {
        let batch = users.slice(i, i + batchSize);
        this.dataTimeouts.push( setTimeout(() => {
            batch.forEach(element => {
              this.getUserData(element);
            });
          }, (i / batchSize) * 200)
        );
        i += batchSize;
      }
    });
  }

  ngOnDestroy()
  {
    this.dataTimeouts.forEach(clearTimeout);
    clearInterval(this.sortTimeout);
  }

  getUserData(user: User) {
    this.eveApi.getSmartCharacter(user.address)
      .pipe(
        map(userData => ({
          name: userData.name,
          worth: (Number(userData.eveBalanceWei) / 1e18).toString()
        }))
      )
      .subscribe(data => {
        this.ranking.push(data);
      });
  }
}
