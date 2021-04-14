import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMaps {
  @Input() coords!: {lat: number, lng: number};
  zoom = 15;
  // googleMapType = 'SATELLITE';


  markerClicked(e: any) {
    console.log(e);
  }

}
