import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Info } from "./info.interface";

const url = environment.url;
const nodeUrl = environment.nodeUrl;

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
      console.log(res.info)
      this.info = res.info;
      this.infoReady.next(this.info);
    });
  }

  getInfo() {
    return this.info;
  }

  sendMessage(form: {name: string, message: string}) {
    console.log(form);
    return this.http.post(url + '/sendMessage', {
      name: form.name, replyto: "miserable.farghaly93@gmail.com", message: form.message
    });
  }

  getMessages() {
   return this.http.get(url + '/fetchMessages');
  }

  deleteMessage(id: number) {
    return this.http.get(url + '/deleteMessage/' + id);
  }

  uploadAlbumImage(image: any) {
    return this.http.post("nodeUrl/uploadAlbumImage", {image});
  }

  getImages() {
    return this.http.get("nodeUrl/getAlbumImages");
  }

  removeAlbumImage(id: string) {
    return this.http.get("nodeUrl/removeAlbumImage/" + id);
  }
}
