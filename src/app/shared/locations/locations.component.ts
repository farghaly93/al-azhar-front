import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationsServices } from '../locations.service';
import {Location} from '../locations.service'


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private locationsServices: LocationsServices, private router: Router) { }

  locations: Location[] = [];
  loading = false;
  deleting = false;
  lat = 27.1930007;
  lng = 31.1737909;
  zoom = 14;
  location: any;
  admin = false;

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.admin = true;
    } else {
      this.admin = false;
    }
    this.loading = true;
    this.locationsServices.getLocations().subscribe((res: any) => {
      this.locations = res.locations;
      this.loading = false;
    })
  }

  edit(id: number) {
    this.router.navigate(['admin-panel/addLocations/' + id], {queryParams: this.locations.find(loc => loc.id===id)});
  }

  delete(id: number) {
    this.deleting = true;
    this.locationsServices.deleteLocation(id).subscribe(res => {
      this.deleting = false;
      if(res.deleted) {
        this.locations.splice(this.locations.findIndex(loc => loc.id == id), 1);
      }
    })
  }

  getInfo(id: any) {
    console.log(id);
    this.location = this.locations.find(loc => loc.id == id);
    console.log(this.location);
  }

  hideLocation() {
    this.location = null;
  }
}
