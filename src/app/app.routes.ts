import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: CompletedProjectsComponent }
];
