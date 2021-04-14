import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsServices } from '../../../shared/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataLayerManager } from '@agm/core';

@Component({
  selector: 'app-add-update-offer',
  templateUrl: './add-update-news.component.html',
  styleUrls: ['./add-update-news.component.scss']
})
export class AddUpdateNewsComponent implements OnInit {
  constructor(private newsServices: NewsServices, private route: ActivatedRoute, public snackbar: MatSnackBar) { }

  message: string = '';
  update = false;
  // offerDataa = {
    id= 0;
    title= '';
    body= '';
    imageFile!: File;
    image: any = 'https://www.av.se/Static/images/placeholder.png';
    progress = 0.0;
    loading = false;
  // };
  // offerData = {};

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.update =  true;
      const data = this.route.snapshot.queryParams;
      this.title = data.title;
      this.body = data.body;
      this.id = data.id;
      // if(!data.image.includes("D:")) {
        this.image = data.image;
      // }
    } else {
      this.update =  false;
    }
  }

  submit(f: NgForm) {
    this.loading = true;
    let news: any = {...f.value, image: this.image};
    if(this.update) news['id'] = +this.id;
      this.newsServices.addNewNews(news, this.update).subscribe((res) => {
        console.log(res);
        // console.log(res.loaded, res.total);
        this.progress = (res.loaded/res.total) * 100
        if(res.updated) {
          let sb = this.snackbar.open('تم نشر الخبر بنجاح', 'close', {
            duration: 7000,
            panelClass: ["snack-bar"]
          });
          sb.onAction().subscribe(() => sb.dismiss());
        }
        this.loading = false;
      });

  }

  pickImage(e: any) {
    this.imageFile = e.target.files[0];
    console.log(this.imageFile);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.imageFile);

    fileReader.onload = (e) => {
      this.image = e?.target?.result;
    };
  }

  copyImage(e: any) {
    this.image = e.target.value;
  }

}
