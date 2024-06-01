import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SmartCharacterInfo } from '../web-socket/web-socket.model';
import { User } from '../eve-wallet-service/Interfaces/user.model';



export interface ShownData {
  name: string;
  id: string;
  worth: number;
}

@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrl: './user-ranking.component.css'
})
export class UserRankingComponent implements OnInit{
  allUsers: User[] = [];

  public shownData: ShownData[] = [];

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

      this.startSorting();

      while (i < users.length) {
        let batch = users.slice(i, i + batchSize);
        this.dataTimeouts.push( setTimeout(() => {
            batch.forEach(element => {
              this.getUserData(element);
            });
          }, (i / batchSize) * 125)
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
      this.shownData.push(data);
    });
  }

  startSorting()
  {
    let prevAmount = 0;
    this.sortTimeout = setInterval(() => {
      this.sortData();
      if(prevAmount == this.shownData.length)
      {
        clearInterval(this.sortTimeout);
      }
      prevAmount = this.shownData.length;
    }, 1500);
  }

  sortData() {
    console.log('Sorting data');
    this.shownData.sort((a, b) => {
      return b.worth - a.worth;
    });
  }

}
