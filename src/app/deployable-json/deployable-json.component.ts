import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deployable-json',
  templateUrl: './deployable-json.component.html',
  styleUrl: './deployable-json.component.css'
})
export class DeployableJsonComponent implements OnInit {
  id: string;
  text: string = "";

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
      this.http.get(
        'https://blockchain-gateway-test.nursery.reitnorf.com/smartdeployables/' + this.id,
      ).subscribe((response) => {
        // Handle the response here
        this.text = JSON.stringify(response, null, 2);
    });
  }
}
