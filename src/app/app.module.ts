import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { withInterceptorsFromDi, HttpClientModule } from '@angular/common/http';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { LinksComponent } from './components/molecules/links/links.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';

// import pages
import { HomeComponent } from './pages/home/home.component';
import { QuotesComponent } from './pages/quotes/quotes/quotes.component';

import { ThoughtsComponent } from './pages/thoughts/thoughts/thoughts.component';

//import modules
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';

// import services
import { RecordsService } from './models/records.service';

// lucide icons
import { LucideAngularModule, Code, Mail, Image, FileUser, Home, Popcorn, Music, Book, Star, StarHalf, Loader } from 'lucide-angular';
import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, ProjectComponent, LinksComponent, FooterComponent, HeaderComponent, HomeComponent, QuotesComponent, ThoughtsComponent],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({ Code, Mail, Image, FileUser, Home, Popcorn, Music, Book, Star, StarHalf, Loader }),
    LoaderComponent,
  ],
  providers: [RecordsService],
})
export class AppModule {}
