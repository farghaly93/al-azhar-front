import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OfferInterface } from 'src/app/shared/offer.model';
import { OffersServices } from 'src/app/shared/offers.service';

@Component({
  selector: 'app-shared-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersSharedComponent implements OnInit {
  constructor(private offersServices: OffersServices, private router: Router, private route: ActivatedRoute) { }

  @Input() side!: string;
  offers: OfferInterface[] = [];
  activities: {value: string, count: number}[] = [];
  types: {value: string, count: number}[] = [];
  sites: {value: string, count: number}[] = [];
  skip = 0;
  limit = 20;
  numberOfPages = 0;
  currentPageNumber = 1;
  nextAllowed = false;
  previousAllowed = true;
  loading = false;
  type = "published";

  filters: {
    activity: string[],
    type: string[],
    site: string[],
    area: number,
    price: number,
    date: string,
    like: string,
    } = {
      activity: [],
      type: [],
      site: [],
      area: 0,
      price: 0,
      date: '',
      like: ''
    };

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.type = params['type'];
      this.filterResults();
      this.getFilters();
    });
  }

  getFilters() {
    this.offersServices.fetchFilters(this.type).subscribe((filters) => {
      this.activities = filters.activity;
      this.types = filters.type;
      this.sites = filters.site;
    });
  }

  setFilter(prop: string, value: string) {
    const property = prop=='activity'?'activity': prop=='type'? 'type': 'site';
    const PropertyProperty = this.filters[property];
    if(this.filters[property].includes(value)) {
      this.filters[property].splice(PropertyProperty.findIndex(val => val === value), 1);
    } else {
      this.filters[property].push(value);
    }
    this.restePage();
    this.filterResults();
  }

  search(e: any) {
    console.log(e.target.value);
    if(e.keyCode == '13') {
      this.filters.like = e.target.value;
      this.restePage();
      this.filterResults();
     }
  }

  filterByDate(e: any) {
    console.log(e.target.value);
    this.filters.date = e.target.value;
    this.restePage();
    this.filterResults();
  }

  filterResults() {
    this.offersServices.filterOffers(this.filters, this.skip, this.limit, this.type).subscribe((res) => {
      this.offers = res.offers;
      console.log(res.searchCount);
      this.numberOfPages = Math.ceil(res.numberOfAllItems/this.limit);
      this.currentPageNumber = (this.skip/this.limit) + 1;
      if(this.currentPageNumber >= this.numberOfPages) this.nextAllowed = false; else this.nextAllowed = true
      if(this.currentPageNumber <= 1) this.previousAllowed = false; else this.previousAllowed = true;
      this.loading = false;
      },
      err => {
        console.log(err);
      }
    )
  }
  nextPage() {
    if(this.nextAllowed) {
      this.skip = this.skip + this.limit;
      this.filterResults();
    }
  }

  previousPage() {
    if(this.previousAllowed) {
      this.skip = this.skip - this.limit;
      this.filterResults()
    }
  }

  restePage() {
    this.skip = 0;
    this.currentPageNumber = 1;
    this.numberOfPages = 1;
  }

  deleteOffer(id: number) {
    console.log(id)
    let confirmed = confirm("هل انتا متأكد من مسح هذا الأعلان؟؟");
    if(confirmed) {
      this.offersServices.deleteOffer(id).subscribe((res: {deleted: boolean}) => {
        if(res.deleted) {
          this.offers.splice(this.offers.findIndex(offer => offer.id === id), 1);
        }
      });
    }
  }

}
