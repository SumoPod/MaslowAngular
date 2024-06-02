import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketMessage } from '../eve-wallet-service/Interfaces/web-socket.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-deployable-json',
  templateUrl: './deployable-json.component.html',
  styleUrl: './deployable-json.component.css'
})
export class DeployableJsonComponent implements OnInit, OnDestroy {

  ws: WebSocket;
  counter: number = 0;
  id: string;
  text: string = "";

  constructor(private route: ActivatedRoute, private eveApi: EveApiService) {}

  ngOnInit() 
  {
    this.id = this.route.snapshot.paramMap.get('id');

    this.ws = this.eveApi.getDeployableWS( this.id );

    this.ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    this.ws.onmessage = (event) => {
      // console.log('WebSocket message received:', event.data);
      // Save event.data as a WebSocketMessage
      const data: WebSocketMessage = JSON.parse(event.data);
      this.text = JSON.stringify(data.smartDeployable, null, 2);
      ++this.counter;
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };
  }

  ngOnDestroy(): void
  {
    this.ws.close();
  }
}
