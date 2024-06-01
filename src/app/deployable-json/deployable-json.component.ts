import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketMessage } from '../web-socket/web-socket.model';
import { EveApiService } from '../eve-wallet-service/eve-api.service';

@Component({
  selector: 'app-deployable-json',
  templateUrl: './deployable-json.component.html',
  styleUrl: './deployable-json.component.css'
})
export class DeployableJsonComponent implements OnInit {
  counter: number = 0;
  id: string;
  text: string = "";

  constructor(private route: ActivatedRoute, private eveApi: EveApiService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    let ws = this.eveApi.getDeployableWS( this.id );

    ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    ws.onmessage = (event) => {
      // console.log('WebSocket message received:', event.data);
      // Save event.data as a WebSocketMessage
      const data: WebSocketMessage = JSON.parse(event.data);
      this.text = JSON.stringify(data.smartDeployable, null, 2);
      this.counter++;
    };

    ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };
  }
}
