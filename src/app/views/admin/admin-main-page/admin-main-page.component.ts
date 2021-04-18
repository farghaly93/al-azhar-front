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
    {path: '/admin-panel/news', name: "الأخبار المنشورة", icon: "fa fa-newspaper-o"},
    {path: '/admin-panel/offers', name: "الأعلانات المنشورة", icon: "fa fa-ad"},
    {path: '/admin-panel/update-info', name: "تعديل بيانات صاحب الشركة", icon: "fa fa-user"},
    {path: '/admin-panel/add-news', name: "اضافة خبر جديد", icon: "fa fa-pen"},
    {path: '/admin-panel/messages', name: "الرسائل", icon: "fa fa-envelope"},
    {path: '/admin-panel/addLocations', name: "اضافة موقع جديد", icon: "fa fa-location"},
    {path: '/admin-panel/locations', name: "المواقع", icon: "fa fa-location"},
  ];

  ngOnInit(): void {
    this.authServices.autoLogin();
  }

  logout() {
    this.authServices.logout();
  }

}
