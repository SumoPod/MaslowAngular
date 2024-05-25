import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-json',
  templateUrl: './user-json.component.html',
  styleUrl: './user-json.component.css'
})
export class UserJsonComponent {
  id: string;
  text: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.http.get(
        'https://blockchain-gateway-test.nursery.reitnorf.com/smartcharacters/' + this.id,
      ).subscribe((response) => {
        // Handle the response here
        this.text = JSON.stringify(response, null, 2);
    });
  }
}
