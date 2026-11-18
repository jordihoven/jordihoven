import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
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
  LucideGamepad2,
} from '@lucide/angular';
import { LoaderComponent } from './components/molecules/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    QuotesComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    LucideGamepad2,
    LoaderComponent,
  ],
  providers: [
    provideHttpClient(),
    provideLucideIcons(
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
      LucideGamepad2,
    ),
  ],
})
export class AppModule {}
