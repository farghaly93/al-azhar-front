import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent implements OnInit {

  constructor(private authServices: AuthServices) { }
  sidebar = false;

  links = [
    {path: '/admin-panel/add-offer', name: "اضافة عرض جديد", icon: "fa fa-user"},
    {path: '/admin-panel/news', name: "الأخبار المنشورة", icon: "fa fa-bars"},
    {path: '/admin-panel/offers', name: "الأعلانات المنشورة", icon: "fa fa-bars"},
    {path: '/admin-panel/update-info', name: "تعديل بيانات صاحب الشركة", icon: "fa fa-user"},
    {path: '/admin-panel/add-news', name: "اضافة خبر جديد", icon: "fa fa-user"},
  ];

  ngOnInit(): void {
    this.authServices.autoLogin();
  }

  logout() {
    this.authServices.logout();
  }

}
