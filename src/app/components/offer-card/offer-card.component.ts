import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer, OfferInterface } from 'src/app/views/main-page/offers/offer.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() offer!: OfferInterface;
  ngOnInit(): void {
  }

  gotoOfferDetailsPage(id: number) {
    this.router.navigate(['main-page/offers/offer-details/'+id]);
  }

}
