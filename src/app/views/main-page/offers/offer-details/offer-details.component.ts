import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer, OfferInterface } from '../offer.model';
import { OffersServices } from '../../../../shared/offers.service';
import { GlobalServices } from 'src/app/shared/global.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';



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
    private globalServices: GlobalServices,
    private fb: FacebookService,
    private http: HttpClient) {
      const initParams: InitParams = {
        appId: '1234566778',
        xfbml: true,
        version: 'v2.8'
      };

      fb.init(initParams);
     }

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

  async shareOnFacebook() {

    await navigator.share({});

    // var url="http://192.168.1.6:4200/main-page/offers/offer-details/1"; //Set desired URL here
    // var img="https://i.ytimg.com/vi/rL6fb4qFO1g/maxresdefault.jpg"; //Set Desired Image here
    // var totalurl=encodeURIComponent(url+'?img='+img);

    // window.open ('http://www.facebook.com/sharer.php?u='+totalurl,'','width=500, height=500, scrollbars=yes, resizable=no');

  }
}
