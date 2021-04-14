import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {GlobalServices} from './shared/global.service';
import { AuthServices } from './views/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private globalServices: GlobalServices) {}

  title = 'alazhar-website';
  menuBars = false;
  times = 0;
  header = true;
  ngOnInit() {
    this.globalServices.fetchInfo();

    this.router.events.subscribe((events) => {
      if(this.router.navigated) {
        if(this.times > 13) this.times = 0;
        if(this.router.url.includes('/main-page')) {
          this.times++;
          if(this.times < 2) {
            this.globalServices.onMenuBarsClick();
          }
          this.menuBars = true;
        } else if(this.router.url.includes('/admin-panel')) {
          this.header = false;
        }
        else {
          this.menuBars = false;
        }
      }
    });
  }

  toggleSidebar() {
    this.globalServices.onMenuBarsClick();
  }
}
