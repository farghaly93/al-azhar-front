import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewsServices } from '../../../shared/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataLayerManager } from '@agm/core';
import { GlobalServices } from 'src/app/shared/global.service';
import { BehaviorSubject } from 'rxjs';
import { Info } from 'src/app/shared/info.interface';

@Component({
  selector: 'app-update-moderator-data',
  templateUrl: './update-moderator-data.component.html',
  styleUrls: ['./update-moderator-data.component.scss']
})
export class UpdateModeratorDataComponent implements OnInit {
  constructor(private globalServices: GlobalServices, private route: ActivatedRoute, public snackbar: MatSnackBar) { }

  message: string = '';
  features: string[] = [];
  featureInput = '';
  loading = false;
  title = '';
  desc = '';
  facebook = '';
  phone = "";
  address = "";
  email = "";
  whatsapp = "";

  ngOnInit(): void {
    const info = this.globalServices.getInfo();
    if(info) {
      this.title = info.title;
      this.desc = info.desc;
      this.facebook = info.facebook;
      this.phone = info.phone;
      this.address = info.address;
      this.email = info.email;
      this.whatsapp = info.whatsapp;
      this.features = info.features.split("/");
    }
    this.globalServices.infoReady.subscribe((info: Info | any) => {
      if(info) {
        this.title = info.title;
        this.desc = info.desc;
        this.facebook = info.facebook;
        this.phone = info.phone;
        this.address = info.address;
        this.email = info.email;
        this.whatsapp = info.whatsapp;
        this.features = info.features.split("/");
      }
    });
  }

  submit(f: NgForm) {
    this.loading = true;
    let info: any = {...f.value, features: this.features};
    console.log(info);
      this.globalServices.updateInfo(info).subscribe((res: any) => {
        console.log(res);
        if(res.updated) {
          let sb = this.snackbar.open('تم تحديث البيانات بنجاح', 'close', {
            duration: 7000,
            panelClass: ["snack-bar"]
          });
          sb.onAction().subscribe(() => sb.dismiss());
        }
        this.loading = false;
      });

  }

  addFeature(ftr: string) {
    console.log(ftr);
    if(ftr != "") {
      this.features.push(ftr);
    }
  }

  deleteFeature(i: number) {
    this.features.splice(i, 1);
  }

  // pickImage(e: any) {
  //   this.imageFile = e.target.files[0];
  //   console.log(this.imageFile);
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(this.imageFile);

  //   fileReader.onload = (e) => {
  //     this.image = e?.target?.result;
  //   };
  // }

}
