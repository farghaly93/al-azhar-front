import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalServices } from 'src/app/shared/global.service';
import { Info } from 'src/app/shared/info.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private globalServices: GlobalServices, private router: Router, private snackbar: MatSnackBar) { }

  info!: Info;
  features: string[] = [];
  loading = false;

  ngOnInit(): void {
    this.globalServices.infoReady.subscribe(info => {
      this.info = info;
      this.features = this.info.features.split("/");
    });
    setTimeout(() => {
      this.info = this.globalServices.getInfo();
      this.features = this.info.features.split("/");
    }, 800);
  }

  begin() {
    this.router.navigate(['/main-page']);
  }

  goto(link: string) {
    if(link === 'whatsapp') {
      // window.open('https://api.whatsapp.com/send?phone='+this.info.phone, "_blank");
      // window.open('whatsapp://send?text=Hello%2C%20World!');
      window.open('intent://send/+2'+this.info.whatsapp+'#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end');
    }

    if(link === 'email') {
      window.open("mailto:"+this.info.email+"?subject=Subject&body=message%20goes%20here", "_blank");
    }

    if(link === 'facebook') {

      // window.open("https://www.facebook.com/AlQousi", "_blank");
      window.open("fb://facewebmodal/f?href=" + this.info.facebook);
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

}
