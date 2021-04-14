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

    // const headers = new HttpHeaders({
    //   'x-forwarded-host': 'foo',
    //   'Access-Control-Allow-Origin': '*'
    // });
    // // headers.append('x-forwarded-host', 'foo');
    // this.http.get('https://www.google.com.eg/maps/@27.1834644,31.182492,15z?hl=ar&authuser=0', {headers: headers}).subscribe(res => {
    //   console.log(res);
    // });
  }

  shareOnFacebook() {

    // this.socialSharing.shareViaFacebook("أرض للمشاركة", "https://gblobscdn.gitbook.com/assets%2F-LsQWILyBp_9nWmIJ7TG%2F-LucCxlvO0nTnF_7lgmG%2F-LucDH0Ixg83OQ_TzVPw%2Fassets_-La-kqVz2Uq1Ka0VUWZT_-LbE-B4tw3obp2iH7oJG_-LbELIjnC22CB4k0c7Fw_Screen%20Shot%202019-03-30%20at%209.35.14%20PM.png?alt=media&token=03cfa619-8550-4852-ad01-66e8b2d30b05", "http://localhost:4200/main-page/offers/offer-details/1").then((res) => {
    //   console.log(res);
    // }).catch((e) => {
    //   // Error!
    // });
  }

}
