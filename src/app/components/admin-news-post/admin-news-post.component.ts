import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/views/news.intrface';

@Component({
  selector: 'app-admin-news-post',
  templateUrl: './admin-news-post.component.html',
  styleUrls: ['./admin-news-post.component.scss']
})
export class AdminNewsPostComponent implements OnInit {

  constructor(private router: Router) {}
  @Input() post!: News;
  @Output() deletePost = new EventEmitter<number>();
  ngOnInit(): void {
  }
  edit() {
    this.router.navigate(['admin-panel/update-news/'+this.post.id], {queryParams: this.post});
  }

  delete() {
    this.deletePost.emit(this.post.id);
  }
}
