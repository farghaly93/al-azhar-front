import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../../shared/offer.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private router: Router) { }

  offers!: any[];

  ngOnInit(): void {
    this.offers = JSON.parse(localStorage.getItem("wishlist"));
  }

  gotoOfferDetailsPage(id: number) {
    this.router.navigate(['main-page/offers/offer-details/'+id]);
  }

  removeWishItem(id: Number) {
    console.log(id)
    // const index = this.offers.findIndex(offer => offer.id === id);
    // this.offers.splice(index, 1);
    this.offers = this.offers.filter(offer => offer.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.offers));
  }
}
