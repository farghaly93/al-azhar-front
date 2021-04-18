import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Offer, OfferInterface } from "../views/main-page/offers/offer.model";
const url = environment.url;

@Injectable({providedIn: 'root'})

export class OffersServices {
  constructor(private http: HttpClient) {}
  offer!: OfferInterface;

  getOffer(id: number) {
   return this.http.get<any>(url + '/getOffer/' + id);
  }

  addNewOffer(offer: OfferInterface, update: boolean): Observable<{added: boolean}> {
    console.log(localStorage.getItem('token'));
    return this.http.post<{added: boolean}>(update? url+'/updateOffer': url+'/addOffer', JSON.stringify(offer));
  }

  getOffers(): Observable<{offers: OfferInterface[]}> {
    return this.http.get<{offers: OfferInterface[]}>(url + '/fetchOffers');
  }

  fetchFilters(): Observable<any> {
    return this.http.get<{filters: {}}>(url + '/fetchFilters')
    .pipe(
      map((res: {filters: {}}) => res.filters)
    )
  }

  filterOffers(filter: {}, skip: number, limit: number): Observable<any> {
    return this.http.post(url + '/filterOffers/'+skip+'/'+limit, filter);
  }

  deleteOffer(id: number): Observable<{deleted: boolean}> {
    return this.http.delete<{deleted: boolean}>(url + '/softDeleteOffer/'+id);
  }

}
