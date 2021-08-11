import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Offer, OfferInterface } from "./offer.model";
const url = environment.url;

@Injectable({providedIn: 'root'})

export class LocationsServices {
  constructor(private http: HttpClient) {}
  location!: Location;

  getLocation(id: number) {
   return this.http.get<any>(url + '/getLocation/' + id);
  }

  addUpdateLocation(location: Location , update: boolean): Observable<{added: boolean}> {
    return this.http.post<{added: boolean}>(update? url+'/updateLocation': url+'/addLocation', JSON.stringify(location));
  }

  getLocations(): Observable<{locations: Location[]}> {
    return this.http.get<{locations: Location[]}>(url + '/getLocations');
  }

  deleteLocation(id: number): Observable<{deleted: boolean}> {
    return this.http.delete<{deleted: boolean}>(url + '/deleteLocation/'+id);
  }

}

export interface Location {
  id: number,
  number: number,
  lat: number,
  lng: number,
  desc: string,
}
