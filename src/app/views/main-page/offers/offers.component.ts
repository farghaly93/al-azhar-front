import { Component, OnInit } from '@angular/core';
import { Offer } from './offer.model';
import { OffersServices } from '../../../shared/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor(private offersServices: OffersServices) {}

  offers: Offer[] = [];

  ngOnInit(): void {
    this.offersServices.getOffers().subscribe(data => {
      this.offers =data. offers;
    });
  }

}
