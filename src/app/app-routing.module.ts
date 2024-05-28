import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './pages/records/records.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'records', component: RecordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
