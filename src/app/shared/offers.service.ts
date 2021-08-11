import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Offer, OfferInterface } from "./offer.model";
const url = environment.url;

@Injectable({providedIn: 'root'})

export class OffersServices {
  constructor(private http: HttpClient) {}
  offer!: OfferInterface;

  getOffer(id: number) {
   return this.http.get<any>(url + '/getOffer/' + id);
  }

  addNewOffer(offer: OfferInterface, update: boolean, user: boolean): Observable<{added: boolean}> {
    console.log(offer);
    if(!user) return this.http.post<{added: boolean}>(update? url+'/updateOffer': url+'/addOffer', JSON.stringify(offer));
    else return this.http.post<{added: boolean}>(url+'/addClientOffer', JSON.stringify(offer));
  }

  getOffers(): Observable<{offers: OfferInterface[]}> {
    return this.http.get<{offers: OfferInterface[]}>(url + '/fetchOffers');
  }

  fetchFilters(type: string): Observable<any> {
    return this.http.get<{filters: {}}>(url + '/fetchFilters/'+type)
    .pipe(
      map((res: {filters: {}}) => res.filters)
    )
  }

  filterOffers(filter: {}, skip: number, limit: number, type: string): Observable<any> {
    return this.http.post(url + '/filterOffers/'+skip+'/'+limit+'/'+type, filter);
  }

  deleteOffer(id: number): Observable<{deleted: boolean}> {
    return this.http.delete<{deleted: boolean}>(url + '/softDeleteOffer/'+id);
  }

}
