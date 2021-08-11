import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

const url = environment.url;

@Injectable({providedIn: 'root'})

export class AuthServices {
  constructor(private http: HttpClient, private router: Router,) {}

  ErrorOccured = new Subject<string>();
  expTime: string | null = "0";
  timer!: any;
  sessionTime = 6000000;

  auth(data: {}, method: string) {
    this.http.post<any>(url+'/'+method, JSON.stringify(data))
      .subscribe(
        (res) => {
          this.handleToken(res.token);
      },
      (err) => {
        this.handleError(err.error.error);
      }
    );
  }

  handleToken(token: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", (+Date.now() + this.sessionTime).toString());
    clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.logout();
        }, this.sessionTime);
    this.router.navigate(['admin-panel']);

  }

  handleError(err: string) {
    this.ErrorOccured.next(err);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    this.router.navigate(['auth']);
  }

  autoLogin() {
    let expTime = +localStorage.getItem('expTime');
    const timeLifted = expTime - Date.now();
    console.log(timeLifted);
    if(timeLifted < 1) {
        this.logout();
        clearTimeout(this.timer);
      } else {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.logout();
        }, timeLifted);
      }
    }
}
