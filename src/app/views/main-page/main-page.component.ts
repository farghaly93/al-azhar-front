import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalServices } from 'src/app/shared/global.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private globalServices: GlobalServices) { }

  sidebar = false;
  links = [
    {path: '/main-page/news', name: "اخر الاخبار", icon: "fa fa-user"},
    {path: '/main-page/offers', name: "العروض", icon: "fa fa-bars"},
    {path: '/photos', name: "الصور", icon: "fa fa-photo"},
  ];

  ngOnInit(): void {
    this.globalServices.menuBarsClicked.subscribe(() => {
      console.log("arrived");
      this.sidebar = !this.sidebar;
    });
  }


  ngOnDestroy() {
    // this.globalServices.menuBarsClicked.unsubscribe();
  }

}
