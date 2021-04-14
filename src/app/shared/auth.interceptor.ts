import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders({
      "Content-Type": "Application/json",
      "X-Requested-With": 'XMLHttpRequest',
      "Authorization": "Bearer " + localStorage.getItem('token')
    });

    // newHeader.append('', '');
    // newHeader.append('', '');
    // newHeader.append('', '');
    const newReq = req.clone({headers: headers});
    return next.handle(newReq);
  }
}
