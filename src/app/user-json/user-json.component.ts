import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketMessage } from '../eve-wallet-service/Interfaces/web-socket.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-user-json',
  templateUrl: './user-json.component.html',
  styleUrl: './user-json.component.css'
})
export class UserJsonComponent implements OnInit, OnDestroy {
  counter: number = 0;
  id: string;
  text: string = "";
  ws: WebSocket;

  constructor(private route: ActivatedRoute, private eveApi: EveApiService)
  {}
  
  ngOnInit()
  {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.ws = this.eveApi.getUserWS(this.id);
    
    this.ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };
    
    this.ws.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      this.text = JSON.stringify(data.smartCharacter, null, 2);
      this.counter++;
      console.log("Counter: " + this.counter)
    };
    
    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };
    
    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };
  }
  
  ngOnDestroy()
  {
    this.ws.close();
  }
}
