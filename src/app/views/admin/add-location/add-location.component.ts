import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationsServices } from 'src/app/shared/locations.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private locationServices: LocationsServices, private snackbar: MatSnackBar) { }

  message: string = '';
  update = false;
  id= 0;
  number = 1;
  desc= '';
  lat=27.678418;
  lng= 31.809007;
  zoom = 15;
  loading = false;

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.update =  true;
      const data = this.route.snapshot.queryParams;
      this.id = data.id;
      this.number = data.number;
      this.lat = +data.lat;
      this.lng = +data.lng;
      this.desc = data.desc;
    } else {
      this.update =  false;
    }
  }

  submit(f: NgForm) {
    this.loading = true;
    const location = {lat: this.lat, lng: this.lng, ...f.value};
    if(this.update) location["id"] = this.id;
    this.locationServices.addUpdateLocation(location, this.update).subscribe(res => {
      this.loading = false;
      console.log(res);
      if(res.added) {
        let sb = this.snackbar.open("تمت اضافة الموقع بنجاح", 'close', {duration: 6000});
        sb.onAction().subscribe(() => sb.dismiss());
      }
    });
  }

  clicked(e: any) {
    console.log(e);
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
  }

}
