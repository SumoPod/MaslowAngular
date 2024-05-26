import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, ShownData } from '../user-ranking/user-ranking.component';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';

@Component({
  selector: 'app-ranking-csv',
  templateUrl: './ranking-csv.component.html',
  styleUrl: './ranking-csv.component.css'
})
export class RankingCsvComponent  implements OnInit{
  allUsers: User[] = [];

  csv: string;

  dataTimeouts: any[] = [];
  sortTimeout: any;

  constructor( private http: HttpClient)
  {
  }

  ngOnInit(): void {
    this.http.get<User[]>('https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters')
    .subscribe((users) => {
      let i = 0;
      let batchSize = 25;

      while (i < users.length) {
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
    this.http.get<SmartCharacterInfo>('https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + user.address)
    .subscribe((userData) => {
      let data: ShownData = {
        name: userData.name,
        id: userData.address,
        worth: Number(userData.eveBalanceWei) / 1e18
      };
    //Name,Owner,System,Worth<br>
      this.csv += data.name + "," + data.worth + "\n";
      
    });
  }
}
