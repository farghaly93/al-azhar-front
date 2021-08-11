import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer, OfferInterface } from 'src/app/shared/offer.model';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() offer!: OfferInterface;
  wishlistBtn = "اضف للمفضلات";
  list: any[] = [];
  ngOnInit(): void {
    this.list = JSON.parse(localStorage.getItem("wishlist")?localStorage.getItem("wishlist"): "[]");
    if(this.list.filter( item => item.id == this.offer.id).length > 0) {
      this.wishlistBtn = "تمت الاضافة للمفضلات"
    } else {
      this.wishlistBtn = "اضف للمفضلات";
    }
  }

  gotoOfferDetailsPage(id: number) {
    this.router.navigate(['main-page/offers/offer-details/'+id]);
  }

  addToWishlist() {
    if(this.list.filter( item => item.id == this.offer.id).length > 0) {
      this.list.splice(this.list.findIndex(item => item.id == this.offer.id), 1);
      this.wishlistBtn = "اضف للمفضلات";
    } else {
      this.list.push(this.offer);
      this.wishlistBtn = "تمت الاضافة للمفضلات";
    }
    localStorage.setItem("wishlist", JSON.stringify(this.list));
  }

}
