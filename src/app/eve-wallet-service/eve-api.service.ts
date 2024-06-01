import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmartDeployable } from './Interfaces/smart-deployable.model';
import { Observable } from 'rxjs';
import { DetailedDeployableInfo } from './Interfaces/deployable-data.model';
import { ItemData, ItemDetailedData } from './Interfaces/item-data.model';
import { User } from './Interfaces/user.model';
import { SmartCharacterInfo } from './Interfaces/web-socket.model';

@Injectable({
  providedIn: 'root'
})
export class EveApiService {

  smartDeployablesURL: string = "https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables";
  
  constructor( private http: HttpClient) { }

  // -- Users

  getSmartCharacter( id: string ): Observable<SmartCharacterInfo>
  {
    return this.http.get<SmartCharacterInfo>('https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + id);
  }

  getSmartCharacters(): Observable<User[]>
  {
    return this.http.get<User[]>('https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters');
  }

  // Websockets request a smart character id and a deployable id.
  // But if you don't provide an id of either you just get the data from the other.
  getUserWS( id: string ): WebSocket
  {
    return new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/' + id + '/0');
  }

  getUserDeployableWS( charId: string, deployableId: string ): WebSocket
  {
    return new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/' + charId + '/' + deployableId);
  }

  // -- Smart Deployables

  getSmartDeployables(): Observable<SmartDeployable[]>
  {
    return this.http.get<SmartDeployable[]>('https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables');
  }

  getSmartDeployableInfo( id: string ): Observable<DetailedDeployableInfo>
  {
    return this.http.get<DetailedDeployableInfo>('https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables/' + id);
  }

  // Websockets request a smart character id and a deployable id.
  // But if you don't provide an id of either you just get the data from the other.
  getDeployableWS( id: string ): WebSocket
  {
      return new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/0/'+ id );
  }

  // -- Items

  getAllItems(): Observable<{ [key: string]: ItemData }[]>
  {
    return this.http.get<{ [key: string]: ItemData }[]>('https://blockchain-gateway-test.nursery.reitnorf.com/types');
  }

  getItem( id: string ): Observable<ItemDetailedData>
  {
    return this.http.get<ItemDetailedData>('https://blockchain-gateway-test.nursery.reitnorf.com/types/' + id);
  }
}
