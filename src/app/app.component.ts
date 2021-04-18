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
  times = 0;
  ngOnInit() {
    this.globalServices.fetchInfo();


  }

}
