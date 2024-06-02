import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit, OnDestroy {
  charId: string;
  deployableId: string;
  ws: WebSocket;

  constructor(private route: ActivatedRoute, private eveApi: EveApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.charId = params['charId'];
      this.deployableId = params['deployableId'];
    });

    this.ws = this.eveApi.getUserDeployableWS(this.charId, this.deployableId);

    this.ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    this.ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };
  }

  ngOnDestroy(): void {
    this.ws.close();
  }
}
