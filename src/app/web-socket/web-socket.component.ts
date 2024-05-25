import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {
  charId: string;
  deployableId: string;
  ws: WebSocket;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.charId = params['charId'];
      this.deployableId = params['deployableId'];
    });

    // Initialize a websocket connection using the charId and deployableId
        // Initialize a websocket connection using the charId and deployableId
        ///ws/<0xSMARTCHARACTERID>/<SMARTDEPLOYABLEID
        this.ws = new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/'+ this.charId + '/' + this.deployableId);

        // 0x1692715f39e6d406b17aaa2ef6c8e676e1b6acaa
        // 70860015881416286250264768493881199026372532447349543657468792188196383309615

        // http://localhost:4200/ws/0x1692715f39e6d406b17aaa2ef6c8e676e1b6acaa/70860015881416286250264768493881199026372532447349543657468792188196383309615

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
}
