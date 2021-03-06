import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goto(link: string) {
    if(link === 'home') this.router.navigate(['/']);
    if(link === 'offers') this.router.navigate(['main-page/offers/published']);
    if(link === 'news') this.router.navigate(['main-page/news']);
    if(link === 'wishlist') this.router.navigate(['main-page/wishlist']);
    if(link === 'locations') this.router.navigate(['main-page/locations']);
    if(link === 'add-offer') this.router.navigate(['main-page/add-offer']);

  }

}
