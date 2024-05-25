import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketMessage } from '../web-socket/web-socket.model';

@Component({
  selector: 'app-user-json',
  templateUrl: './user-json.component.html',
  styleUrl: './user-json.component.css'
})
export class UserJsonComponent {
  id: string;
  text: string = "";
  ws: WebSocket;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.ws = new WebSocket('wss://blockchain-gateway-test.nursery.reitnorf.com/ws/'+ this.id + '/0');

    this.ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    this.ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      // Save event.data as a WebSocketMessage
      const data: WebSocketMessage = JSON.parse(event.data);
      this.text = JSON.stringify(data.smartCharacter, null, 2);
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error observed:', event);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };

    //   this.http.get(
    //     'https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + this.id,
    //   ).subscribe((response) => {
    //     // Handle the response here
    //     this.text = JSON.stringify(response, null, 2);
    // });
  }
}
