import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketMessage } from '../web-socket/web-socket.model';

@Component({
  selector: 'app-deployable-json',
  templateUrl: './deployable-json.component.html',
  styleUrl: './deployable-json.component.css'
})
export class DeployableJsonComponent implements OnInit {
  counter: number = 0;
  id: string;
  text: string = "";
  ws: WebSocket;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.id = this.route.snapshot.paramMap.get('id');

    this.ws = new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/0/'+ this.id );

    this.ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    this.ws.onmessage = (event) => {
      // console.log('WebSocket message received:', event.data);
      // Save event.data as a WebSocketMessage
      const data: WebSocketMessage = JSON.parse(event.data);
      this.text = JSON.stringify(data.smartDeployable, null, 2);
      this.counter++;
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };

    //   this.http.get(
    //     'https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables/' + this.id,
    //   ).subscribe((response) => {
    //     // Handle the response here
    //     this.text = JSON.stringify(response, null, 2);
    // });
  }
}
