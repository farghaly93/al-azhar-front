import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Info } from "./info.interface";

const url = environment.url;

@Injectable({providedIn: "root"})

export class GlobalServices {

  constructor(private http: HttpClient) {}
  menuBarsClicked = new Subject<any>();
  info!: Info;
  infoReady = new Subject<Info>();

  onMenuBarsClick() {
    console.log("clicked");
    this.menuBarsClicked.next("");
  }

  updateInfo(info: {}) {
    return this.http.post(url + '/updateInfo', info);
  }

  fetchInfo() {
    this.http.get<{res: {info: Info}} | any>(url + '/fetchInfo').subscribe((res: {info: Info}) => {
      this.info = res.info;
      this.infoReady.next(this.info);
    });
  }

  getInfo() {
    return this.info;
  }
}
