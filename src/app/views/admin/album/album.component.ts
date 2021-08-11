import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalServices } from 'src/app/shared/global.service';
import { ImageInterface } from 'src/app/shared/image.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private globalServices: GlobalServices) {

   }

  images: ImageInterface[] = [];
  loading = false;
  itemDeleting: any = null;
  currentImage: any = null;


  ngOnInit(): void {
    this.globalServices.getImages().subscribe((res: any) => {
      console.log(res.images)
      this.images = res.images;
    })
  }

  pickImage(e: any) {
    const file = e.target.files[0];
    if(!["jpg", "jpeg", "png", "svg"].includes(file.type.toString().split('/')[1])) {
      alert("اختر صورة صالحة");
      return;
    }
    if(file.size > 1000000) {
      alert("الصورة أكبر من المسموح به")
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      this.currentImage = e.target?.result;
    }
  }

  uploadImage() {
    if(!this.currentImage) return;
    this.loading = true;
    this.globalServices.uploadAlbumImage(this.currentImage).subscribe((res: any) => {
      this.loading = false;
      if(res.done) {
        this.images.push(res.image);
        this.currentImage = null;
      } else {
        console.log(res.err);
      }
    });
  }

  removeCurrentImage() {
    this.currentImage = null;
  }

  removeAlbumImage(id: string) {
    const index = this.images.findIndex(image => image._id == id);
    this.itemDeleting = index;
    this.globalServices.removeAlbumImage(id).subscribe((res: any) => {
      this.itemDeleting = null;
      if(res.done) {
        this.images.splice(index, 1);
      }
    });
  }

}
