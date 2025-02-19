import {Routes} from '@angular/router';
import {AbmPersonasComponent} from './pages/abm-personas/abm-personas.component';
import {ErrorNotFoundComponent} from './pages/error-not-found/error-not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/home/home.component';
import {AbmMateriasComponent} from './pages/abm-materias/abm-materias.component';
import {AbmEventosComponent} from './pages/abm-eventos/abm-eventos.component';
import {AbmMediosComunicacionComponent} from './pages/abm-medios-comunicacion/abm-medios-comunicacion.component';
import {AbmSemestresComponent} from './pages/abm-semestres/abm-semestres.component';
import {AbmTiposEventosComponent} from './pages/abm-tipos-eventos/abm-tipos-eventos.component';
import {AbmTiposMaterialesComponent} from './pages/abm-tipos-materiales/abm-tipos-materiales.component';
import {AbmUsuariosComponent} from './pages/abm-usuarios/abm-usuarios.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'abm',
    children: [
      {path: 'eventos', component: AbmEventosComponent},
      {path: 'materias', component: AbmMateriasComponent},
      {path: 'medios-comunicacion', component: AbmMediosComunicacionComponent},
      {path: 'personas', component: AbmPersonasComponent},
      {path: 'semestres', component: AbmSemestresComponent},
      {path: 'tipos-eventos', component: AbmTiposEventosComponent},
      {path: 'tipos-materiales', component: AbmTiposMaterialesComponent},
      {path: 'usuarios', component: AbmUsuariosComponent},
    ]
  },
  {path: '**', component: ErrorNotFoundComponent}
];
