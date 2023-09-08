import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { DockComponent } from './components/molecules/dock/dock.component';
import { ProjectComponent } from './components/molecules/project-card/project-card.component';

//import modules
import { IconModule } from './components/atoms/icon/icon.module';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { HeaderComponent } from './components/molecules/header/header.component';
import { BookCardComponent } from './components/molecules/book-card/book-card.component';
import { WritingComponent } from './components/molecules/writing/writing.component';
import { ArticleComponent } from './components/molecules/article/article.component';

import { MarkdownModule } from 'ngx-markdown'; // Import MarkdownModule
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    ProjectComponent,
    DockComponent,
    FooterComponent,
    HeaderComponent,
    BookCardComponent,
    WritingComponent,
    ArticleComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, IconModule, MarkdownModule.forRoot(), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
