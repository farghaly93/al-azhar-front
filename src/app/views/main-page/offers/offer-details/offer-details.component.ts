import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer, OfferInterface } from '../offer.model';
import { OffersServices } from '../../../../shared/offers.serive';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';




@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  constructor(
    // private socialSharing: SocialSharing,
    private route: ActivatedRoute,
    private offerServices: OffersServices,
    private http: HttpClient) { }

  offerDetails!: OfferInterface;
  descriptions: string[] = [];
  lat: number = 51.678418;
  lng: number = 7.809007;
  negotiable = false;
  loading = false;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.loading = true;
      this.offerServices.getOffer(+params['id']).subscribe(res => {
        this.offerDetails = res.offer;
        this.descriptions = this.offerDetails.desc.split("/");
        this.negotiable = this.offerDetails.negotiable? true: false;
        this.lat = +this.offerDetails.lat;
        this.lng = +this.offerDetails.lng;

        this.loading = false;
      });
    });
  }

  shareOnFacebook() {

    let url =  "https://www.facebook.com/dialog/share?app_id=123456789&amp;href="+location.href+"&amp;picture="+"https://khamsat.hsoubcdn.com/images/services/1468846/ed33090fd9a2787c9b4ebcb47c6fb7f5.jpg";
        let newwindow=window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
        newwindow?.focus()
  }

}
