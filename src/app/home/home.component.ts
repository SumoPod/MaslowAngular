import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  brightQuantumColor = 'hsla(26, 85%, 58%, 1)';
  constructor() {}

  ngOnInit()
  {
    console.log('Home Component Initialized');
    // window.dispatchEvent(new Event("eip6963:requestProvider"));
  }
  
  // @HostListener('window:eip6963:announceProvider', ['$event'])
  // onProviderAnnounced(event: any) {
  //   console.log("EIP6963 Provider Announced");
  //   console.log(event);
  //   this.text = JSON.stringify( event.detail.info);
  // }
}