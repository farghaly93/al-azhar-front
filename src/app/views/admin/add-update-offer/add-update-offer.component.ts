import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferInterface } from '../../../shared/offer.model';
import { OffersServices } from '../../../shared/offers.service';

@Component({
  selector: 'app-add-update-offer',
  templateUrl: './add-update-offer.component.html',
  styleUrls: ['./add-update-offer.component.scss']
})
export class AddUpdateOfferComponent implements OnInit {
  constructor(private offerServices: OffersServices, private route: ActivatedRoute) { }

  message: string = '';
  update = false;
  user = false;
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
    name = '';
    phone = '';
    confirmed = true;
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
      this.negotiable = data.negotiable==1?true: false;
      this.lat = +data.lat;
      this.lng = +data.lng;
      this.name = data.name;
      this.phone = data.phone;
      this.confirmed = data.confirmed==1?true: false;
    } else {
      this.update =  false;
    }

    if(!localStorage.getItem('token')) {
      this.user = true;
    } else {
      this.user = false;
    }
  }

  submit(f: NgForm) {
    this.loading = true;
    const offer: OfferInterface = {...f.value, lat: this.lat, lng: this.lng};
    offer['confirmed'] = this.confirmed?1: 0;
    offer['negotiable'] = this.negotiable?1: 0;
    if(this.update) offer['id'] = +this.id;
    this.offerServices.addNewOffer(offer, this.update, this.user).subscribe(res => {
      if(res.added) {
        this.message = this.user?"في انتظار الموافقة على الاعلان" :"تم نشر الأعلان بنجاح";
      } else {
        this.message = "مشكلة اثناء رفع الأعلان";
      }
      this.loading = false;
      if(this.user) f.reset();
      window.scroll(0, 0);
    });
  }

  testForm(f: NgForm) {
    console.log(f);
  }
  clicked(e: any) {
    console.log(e);
    this.lat = e.coords.lat;
    this.lng = e.coords.lng;
  }

}
