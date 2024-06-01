import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmartDeployable } from './Interfaces/smart-deployable.model';
import { Observable } from 'rxjs';
import { DetailedDeployableInfo } from '../system-tracker/deployable-data.model';

@Injectable({
  providedIn: 'root'
})
export class EveApiService {

  smartDeployablesURL: string = "https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables";
  
  constructor( private http: HttpClient) { }

  getSmartDeployables(): Observable<SmartDeployable[]>
  {
    return this.http.get<SmartDeployable[]>('https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables');
  }

  getSmartDeployableInfo( id: string ): Observable<DetailedDeployableInfo>
  {
    return this.http.get<DetailedDeployableInfo>('https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables/' + id);
  }

}
