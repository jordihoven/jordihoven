import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { LinksComponent } from './components/molecules/links/links.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';

//import modules
import { IconModule } from './components/atoms/icon/icon.module';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';
import { BookCardComponent } from './components/molecules/book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    ProjectComponent,
    LinksComponent,
    FooterComponent,
    HeaderComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
