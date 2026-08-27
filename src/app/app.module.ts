import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { LinksComponent } from './components/molecules/links/links.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';

// import pages
import { HomeComponent } from './pages/home/home.component';
import { QuotesComponent } from './pages/quotes/quotes/quotes.component';

//import modules
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';

// lucide icons
import {
  provideLucideIcons,
  LucideCode,
  LucideMail,
  LucideFileUser,
  LucideHome,
  LucidePopcorn,
  LucideMusic,
  LucideBook,
  LucideStar,
  LucideStarHalf,
  LucideLoader,
  LucideActivity,
  LucideScrollText,
  LucideArrowLeft,
} from '@lucide/angular';
import { LoaderComponent } from './components/molecules/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    LinksComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    QuotesComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideCode,
    LucideMail,
    LucideFileUser,
    LucideHome,
    LucidePopcorn,
    LucideMusic,
    LucideBook,
    LucideStar,
    LucideStarHalf,
    LucideLoader,
    LucideActivity,
    LucideScrollText,
    LucideArrowLeft,
    LoaderComponent,
  ],
  providers: [
    provideHttpClient(),
    provideLucideIcons(
      LucideCode,
      LucideMail,
      LucideFileUser,
      LucideHome,
      LucidePopcorn,
      LucideMusic,
      LucideBook,
      LucideStar,
      LucideStarHalf,
      LucideLoader,
      LucideActivity,
      LucideScrollText,
      LucideArrowLeft,
    ),
  ],
})
export class AppModule {}
