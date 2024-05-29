import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { LinksComponent } from './components/molecules/links/links.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';
import { RecordComponent } from './components/molecules/record/record.component';

// import pages
import { HomeComponent } from './pages/home/home.component';
import { RecordsComponent } from './pages/records/records.component';

//import modules
import { IconModule } from './components/atoms/icon/icon.module';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';
import { BookCardComponent } from './components/molecules/book-card/book-card.component';

// import services
import { RecordsService } from './models/records.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    ProjectComponent,
    LinksComponent,
    FooterComponent,
    HeaderComponent,
    BookCardComponent,
    HomeComponent,
    RecordsComponent,
    RecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconModule
  ],
  providers: [RecordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
