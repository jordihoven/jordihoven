import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './components/molecules/article/article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'writing/:filename', component: ArticleComponent }, // Define a route for individual articles
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
