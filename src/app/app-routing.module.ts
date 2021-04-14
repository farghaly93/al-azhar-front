import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateOfferComponent } from './views/admin/add-update-offer/add-update-offer.component';
import { AdminMainPageComponent } from './views/admin/admin-main-page/admin-main-page.component';
import { AuthComponent } from './views/auth/auth.component';
import { HomeComponent } from './views/home/home.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NewsDetailsComponent } from './views/main-page/news/news-details/news-details.component';
import { NewsComponent } from './views/main-page/news/news.component';
import { OfferDetailsComponent } from './views/main-page/offers/offer-details/offer-details.component';
import { AdminOffersComponent } from './views/admin/admin-offers/admin-offers.component';
import { OffersComponent } from './views/main-page/offers/offers.component';
import { AddUpdateNewsComponent } from './views/admin/add-update-news/add-update-news.component';
import { AdminNewsComponent } from './views/admin/admin-news/admin-news.component';
import { UpdateModeratorDataComponent } from './views/admin/update-moderator-data/update-moderator-data.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  {path: "auth", component: AuthComponent},
  {path: "newsDetails/:id", component: NewsDetailsComponent},
  {path: "main-page", component: MainPageComponent, children: [
    {path: '', component: MenuPageComponent},
    {path: "offers", component: OffersComponent},
    {path: "news", component: NewsComponent},
    {path: "offers/offer-details/:id", component: OfferDetailsComponent},
  ]},



  {path: "admin-panel", component: AdminMainPageComponent, children: [
    {path: 'add-offer', component: AddUpdateOfferComponent},
    {path: 'update-offer/:id', component: AddUpdateOfferComponent},
    {path: 'offers', component: AdminOffersComponent},
    {path: 'add-news', component: AddUpdateNewsComponent},
    {path: 'update-news/:id', component: AddUpdateNewsComponent},
    {path: 'news', component: AdminNewsComponent},
    {path: 'update-info', component: UpdateModeratorDataComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
