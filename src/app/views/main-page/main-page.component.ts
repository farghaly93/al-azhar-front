import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServices } from 'src/app/shared/global.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private globalServices: GlobalServices, private router: Router) { }

  sidebar = false;
  header = true;
  links = [
    {path: '/main-page/news', name: "اخر الاخبار", icon: "fa fa-user"},
    {path: '/main-page/offers', name: "العروض", icon: "fa fa-bars"},
    {path: '/main-page/wishlist', name: "المحفوظات", icon: "fa fa-photo"},
    {path: '/main-page/locations', name: "المواقع والاراضي", icon: "fa fa-map"},
  ];

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if(this.router.navigated) {
        this.sidebar = false;
      }
    });
    this.globalServices.menuBarsClicked.subscribe(() => {
      console.log("arrived");
      this.sidebar = ! this.sidebar;
    });
  }

  toggleSidebar() {
    this.globalServices.onMenuBarsClick();
  }

  ngOnDestroy() {
    // this.globalServices.menuBarsClicked.unsubscribe();
  }



}
