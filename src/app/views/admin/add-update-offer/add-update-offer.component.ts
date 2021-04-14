import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferInterface } from '../../main-page/offers/offer.model';
import { OffersServices } from '../../../shared/offers.serive';

@Component({
  selector: 'app-add-update-offer',
  templateUrl: './add-update-offer.component.html',
  styleUrls: ['./add-update-offer.component.scss']
})
export class AddUpdateOfferComponent implements OnInit {
  constructor(private offerServices: OffersServices, private route: ActivatedRoute) { }

  message: string = '';
  update = false;
  // offerDataa = {
    id= 0;
    title= '';
    activity= '';
    type= '';
    area= 0;
    price= 0;
    desc= '';
    site= '';
    negotiable = false;
    lat=51.678418;
    lng= 7.809007;
    zoom = 15;
    loading = false;
  // };
  // offerData = {};

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.update =  true;
      const data = this.route.snapshot.queryParams;
      this.id = data.id;
      this.title = data.title;
      this.activity = data.activity;
      this.type = data.type;
      this.area = data.area;
      this.price = data.price;
      this.desc = data.desc;
      this.site = data.site;
      this.negotiable = data.negotiable;
      this.lat = +data.lat;
      this.lng = +data.lng;
    } else {
      this.update =  false;
    }
  }

  submit(f: NgForm) {
    this.loading = true;
    const offer: OfferInterface = {...f.value, lat: this.lat, lng: this.lng};
    if(this.update) offer['id'] = +this.id;
    this.offerServices.addNewOffer(offer, this.update).subscribe(res => {
      console.log(res);
      if(res.added) {
        this.message = "تم نشر الأعلان بنجاح"
      }
      this.loading = false;
    });
  }

  clicked(e: any) {
    console.log(e);
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
  }

}
