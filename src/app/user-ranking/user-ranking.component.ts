import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartCharacterInfo } from '../eve-wallet-service/Interfaces/web-socket.model';
import { User } from '../eve-wallet-service/Interfaces/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface ShownData {
  name: string;
  id: string;
  worth: number;
  image: string;
}

@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrl: './user-ranking.component.css'
})
export class UserRankingComponent implements OnInit{
  allUsers: User[] = [];
  loading: boolean = true;
  shownData = new MatTableDataSource<ShownData>([]);
  displayedColumns: string[] = ['image', 'worth', 'name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataTimeouts: any[] = [];
  sortTimeout: any;

  constructor( private http: HttpClient) {
  }
  ngAfterViewInit() {
    this.shownData.paginator = this.paginator;
    this.shownData.sort = this.sort;
    this.loading = true;
  }

  ngOnInit(): void {
    this.http.get<User[]>('https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters')
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
          }, (i / batchSize) * 125)
        );
        i += batchSize;
      }
      this.dataTimeouts.push( setTimeout(() => {
        this.loading = false;
      }, (users.length / batchSize) * 125) );
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
        worth: Number(userData.eveBalanceWei) / 1e18,
        image: userData.image
      };
      this.shownData.data = [...this.shownData.data, data];
    });
  }
}