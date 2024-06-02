import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  brightQuantumColor = 'hsla(26, 85%, 58%, 1)';
  text: string = "";
  constructor() {}

  ngOnInit() {
    console.log('Home Component Initialized');
    window.addEventListener("eip6963:announceProvider", (event: any) => {
      console.log("EIP6963 Provider Announced");
      this.text = JSON.stringify( this.text )
    });
  }
}