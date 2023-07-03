import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { ProjectComponent } from './components/molecules/project/project.component';
import { DockComponent } from './components/molecules/dock/dock.component';

//import modules
import { IconModule } from './components/atoms/icon/icon.module';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    IconComponent,
    ProjectComponent,
    DockComponent
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
