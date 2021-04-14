import { Component, Input, OnInit } from '@angular/core';
import { NewsServices } from 'src/app/shared/news.service';
import { News } from 'src/app/views/news.intrface';

@Component({
  selector: 'app-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit {

  constructor(private newsServices: NewsServices) { }
  @Input() side!: string;
  posts!: News[];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.newsServices.getNews().subscribe((res) => {
      this.posts = res.news;
      this.loading = false;
    });
  }

  delete(id: number) {
    let confirmed = confirm('تأكيد مسح هذا الخبر');
    if(confirmed) {
      this.newsServices.deleteNews(id).subscribe(res => {
        if(res.deleted) {
          this.posts.splice(this.posts.findIndex(post => post.id == id), 1);
        }
      });
    }
  }

  search(e: any) {
    if(e.keyCode == 13) {
      this.newsServices.search(e.target.value).subscribe((res: any) => {
        this.posts = res.posts;
      });
    }
  }

  filterByDate(e: any) {
    this.newsServices.filterByDate(e.target.value).subscribe((res: any) => {
      console.log(res)
      this.posts = res.posts;
    });
  }

}
