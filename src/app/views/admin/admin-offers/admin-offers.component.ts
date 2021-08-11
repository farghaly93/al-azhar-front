import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferInterface } from '../../../shared/offer.model';
import { OffersServices } from '../../../shared/offers.service';

@Component({
  selector: 'app-admin-offers',
  templateUrl: './admin-offers.component.html',
  styleUrls: ['./admin-offers.component.scss']
})
export class AdminOffersComponent implements OnInit {
  constructor() { }

  ngOnInit() {}

}
