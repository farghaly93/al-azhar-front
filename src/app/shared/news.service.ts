import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { News } from "./news.intrface";
import { map, tap } from "rxjs/operators";

const url = environment.url;

@Injectable({providedIn: 'root'})

export class NewsServices {

  constructor(private http: HttpClient) {}

  getOneNews(id: number) {
    return this.http.get<any>(url + '/getNewsPost/' + id).pipe(
      map((data: any) => {
         return {post: {...data.post, image: JSON.parse(data.post.image)}};
        }),
        tap((data) => {
          // console.log(data)
        })
      );
   }

   addNewNews(news: any, update: boolean): Observable<any> {
     console.log(news);
     return this.http.post<{added: boolean}>(
      update? url+'/updateNews': url+'/addNews',news,
      {reportProgress: true}
      );
   }

   getNews(): Observable<{news: News[]}> {
     return this.http.get<{news: News[]}>(url + '/fetchNews').pipe(
       map((data: any) => {
         const news = data.news.map((n: any) => {
          return {...n, image: JSON.parse(n.image)};
         })
         return {news};
       })
     );
   }

   deleteNews(id: number): Observable<{deleted: boolean}> {
     return this.http.delete<{deleted: boolean}>(url + '/softDeleteNews/'+id);
   }

   search(query: string) {
     return this.http.get(url + '/search/' + query);
   }

   filterByDate(date: string) {
     return this.http.get(url + '/filterByDate/' + date);
   }
}
