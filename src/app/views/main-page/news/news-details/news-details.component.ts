import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsServices } from 'src/app/shared/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  constructor(private newsServices: NewsServices, private route: ActivatedRoute) { }

  part1: any[] = [];
  part2: any[] = [];
  post!: any;
  loading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.newsServices.getOneNews(+id).subscribe((res: any) => {
      const text = res.post.body;
      this.post = res.post;
      const postStringArray = text.split(" ");
      const postLength = postStringArray.length;
      this.part1 = postStringArray.slice(0, postLength/3).join(" ").split("/");
      this.part2 = postStringArray.slice(postLength/3, postLength).join(" ").split("/");
      this.loading = false;
    });
}
  readFile(cb: Function) {
    const http = new XMLHttpRequest();
    http.open('get', 'news.txt', true);
    http.onreadystatechange = () => {
      if(http.readyState == 4) {
        if(http.status == 200) {
          cb(http.responseText);
        }
      }
    }
    http.send();
  }

}
