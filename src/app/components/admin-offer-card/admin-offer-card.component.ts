import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OfferInterface } from 'src/app/shared/offer.model';

@Component({
  selector: 'app-admin-offer-card',
  templateUrl: './admin-offer-card.component.html',
  styleUrls: ['./admin-offer-card.component.scss']
})
export class AdminOfferCardComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() offer!: OfferInterface;
  @Output() delete = new EventEmitter<number>();
  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['/admin-panel/update-offer/' + this.offer.id], {queryParams: this.offer});
  }

  deleteOffer() {
    this.delete.emit(this.offer.id);
  }
}
