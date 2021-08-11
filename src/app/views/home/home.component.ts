import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalServices } from 'src/app/shared/global.service';
import { ImageInterface } from 'src/app/shared/image.model';
import { Info } from 'src/app/shared/info.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private globalServices: GlobalServices,
    private router: Router,
    private snackbar: MatSnackBar,
    private _elementRef: ElementRef
    ) { }

  info: any = {};
  features: string[] = [];
  loading = false;
  ua!: any;
  images: ImageInterface[] = [];
  openedImage: any = null;
  // @ViewChild("pop") photos!: ElementRef;


  ngOnInit(): void {
    this.ua = navigator.userAgent;
    this.globalServices.infoReady.subscribe(info => {
      if(info) {
        this.info = info;
        this.features = this.info.features.split("/");
      }
    });
    this.info = this.globalServices.getInfo();
    if(this.info) {
      this.features = this.info.features.split("/");
    }

    this.globalServices.getImages().subscribe((res: any) => {
      this.images = res.images;
    });
  }

  ngAfterViewInit() {
    const photos = this._elementRef.nativeElement.querySelectorAll(".openable");
    photos.forEach((photo: any) => {
      photo.addEventListener("click", () => {
        alert("clicked")
      })
    })
  }

  begin() {
    this.router.navigate(['/main-page']);
  }

  goto(link: string) {
    if(link === 'whatsapp') {
      // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(this.ua))
      //   window.open('intent://send/+2'+this.info.whatsapp+'#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end');
      // else
        window.open('https://api.whatsapp.com/send?phone=+2'+this.info.whatsapp, "_blank");
    }

    if(link === 'email') {
      window.open("mailto:"+this.info.email+"?subject=Subject&body=message%20goes%20here", "_blank");
    }

    if(link === 'facebook') {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(this.ua))
        window.open("fb://facewebmodal/f?href=" + this.info.facebook);
      else
        window.open("https://www.facebook.com/AlQousi", "_blank");
    }
  }

  send(f: any) {
    this.loading = true;
    this.globalServices.sendMessage(f.value).subscribe((res: any) => {
      this.loading = false;
      if(res.sent) {
        let sb = this.snackbar.open('ام ارسال الرسالة', 'close', {
          duration: 7000,
          panelClass: ["snack-bar"]
        });
        sb.onAction().subscribe(() => sb.dismiss());
      }
    })
  }

  scalePhoto(i: number) {
    this.openedImage = this.images[i];
  }

  cancelScaledPhoto() {
    this.openedImage = null;
  }

}
