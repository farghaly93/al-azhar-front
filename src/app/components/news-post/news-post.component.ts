import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { News } from 'src/app/shared/news.intrface';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss']
})
export class NewsPostComponent implements OnInit {

  constructor(private router: Router, private sanitizer: DomSanitizer) { }
  @Input() post!: News;
  ngOnInit(): void {
    let p = this.post.body.split(" ").splice(0, 20).join(" ");
    console.log(p);
  }

  seeMore() {
    this.router.navigate(['main-page/newsDetails/'+this.post.id]);
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.post.image[0]);
  }

}
