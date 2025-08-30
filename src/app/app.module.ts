import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { LinksComponent } from './components/molecules/links/links.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';

// import pages
import { HomeComponent } from './pages/home/home.component';
import { RecordsComponent } from './pages/records/records.component';
import { QuotesComponent } from './pages/quotes/quotes/quotes.component';

//import modules
import { IconModule } from './components/atoms/icon/icon.module';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';

// import services
import { RecordsService } from './models/records.service';

@NgModule({ declarations: [
        AppComponent,
        ButtonComponent,
        IconComponent,
        ProjectComponent,
        LinksComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        RecordsComponent,
        QuotesComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        IconModule], providers: [RecordsService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
