import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NewsComponent } from './views/main-page/news/news.component';
import { NewsPostComponent } from './components/news-post/news-post.component';
import { NewsDetailsComponent } from './views/main-page/news/news-details/news-details.component';
import { OffersComponent } from './views/main-page/offers/offers.component';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { OfferDetailsComponent } from './views/main-page/offers/offer-details/offer-details.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMaps } from './components/google-map/google-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainPageComponent } from './views/admin/admin-main-page/admin-main-page.component';
import { AddUpdateOfferComponent } from './views/admin/add-update-offer/add-update-offer.component';
import { AdminOffersComponent } from './views/admin/admin-offers/admin-offers.component';
import { AdminOfferCardComponent } from './components/admin-offer-card/admin-offer-card.component';
import {OffersSharedComponent} from './shared/offers-page/offers.component';
import { AddUpdateNewsComponent } from './views/admin/add-update-news/add-update-news.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsPostsComponent } from './shared/news-posts/news-posts.component';
import { AdminNewsComponent } from './views/admin/admin-news/admin-news.component';
import { AdminNewsPostComponent } from './components/admin-news-post/admin-news-post.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { UpdateModeratorDataComponent } from './views/admin/update-moderator-data/update-moderator-data.component';
import { AdminHomeComponent } from './views/admin/admin-home/admin-home.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';
import { NgxSocialShareModule } from 'ngx-social-share';
import { FacebookModule } from 'ngx-facebook';
import { WishlistComponent } from './views/wishlist/wishlist.component';
import { MessagesComponent } from './views/admin/messages/messages.component';
import { AddLocationComponent } from './views/admin/add-location/add-location.component';
import { LocationsComponent } from './shared/locations/locations.component';
import { FooterComponent } from './components/footer/footer.component';
import { PadgeComponent } from './components/padge/padge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SidebarComponent,
    MainPageComponent,
    NewsComponent,
    NewsPostComponent,
    NewsDetailsComponent,
    OffersComponent,
    OfferCardComponent,
    OfferDetailsComponent,
    GoogleMaps,
    AdminMainPageComponent,
    AddUpdateOfferComponent,
    AdminOffersComponent,
    AdminOfferCardComponent,
    OffersSharedComponent,
    AddUpdateNewsComponent,
    NewsPostsComponent,
    AdminNewsComponent,
    AdminNewsPostComponent,
    SpinnerComponent,
    UpdateModeratorDataComponent,
    AdminHomeComponent,
    MenuPageComponent,
    WishlistComponent,
    MessagesComponent,
    AddLocationComponent,
    LocationsComponent,
    FooterComponent,
    PadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIYDBgOQD5G6LU-7XrgaOmDgfWIl4vl6g'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
