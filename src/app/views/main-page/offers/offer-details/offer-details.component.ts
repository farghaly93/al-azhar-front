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
        appId: '1927971220769787',
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

  shareOnFacebook() {

    const params: UIParams = {
      href: 'https://github.com/zyra/ngx-facebook',
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

    // let url = 'http://www.facebook.com/sharer.php?u=http://192.168.1.6:4200/';
    //     let newwindow=window.open(url,'name','height=500,width=520,top=200,left=300,resizable');
    //     newwindow?.focus();
    // }

  }
}
