import {Routes} from '@angular/router';
import {AbmPersonasComponent} from './pages/abm-personas/abm-personas.component';
import {ErrorNotFoundComponent} from './pages/error-not-found/error-not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'abm',
    children: [
      {
        path: 'personas',
        component: AbmPersonasComponent
      }
    ]
  },
  {path: '**', component: ErrorNotFoundComponent}
];
