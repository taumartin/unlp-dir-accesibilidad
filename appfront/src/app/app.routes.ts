import {Routes} from '@angular/router';
import {AbmPersonasComponent} from './pages/abms/abm-personas/abm-personas.component';
import {ErrorNotFoundComponent} from './pages/error-not-found/error-not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {HomeComponent} from './pages/home/home.component';
import {AbmMateriasComponent} from './pages/abms/abm-materias/abm-materias.component';
import {AbmEventosComponent} from './pages/abms/abm-eventos/abm-eventos.component';
import {AbmMediosComunicacionComponent} from './pages/abms/abm-medios-comunicacion/abm-medios-comunicacion.component';
import {AbmSemestresComponent} from './pages/abms/abm-semestres/abm-semestres.component';
import {AbmTiposEventosComponent} from './pages/abms/abm-tipos-eventos/abm-tipos-eventos.component';
import {AbmTiposMaterialesComponent} from './pages/abms/abm-tipos-materiales/abm-tipos-materiales.component';
import {AbmUsuariosComponent} from './pages/abms/abm-usuarios/abm-usuarios.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {authGuard} from './guards/auth/auth.guard';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {ForgotPasswordComponent} from './pages/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'auth',
    children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'recuperar-clave', component: ForgotPasswordComponent},
    ],
    data: {useBoxLayout: true},
  },
  {
    path: 'abm',
    canActivate: [authGuard],
    children: [
      {path: 'eventos', component: AbmEventosComponent},
      {path: 'materias', component: AbmMateriasComponent},
      {path: 'medios-comunicacion', component: AbmMediosComunicacionComponent},
      {path: 'personas', component: AbmPersonasComponent},
      {path: 'semestres', component: AbmSemestresComponent},
      {path: 'tipos-eventos', component: AbmTiposEventosComponent},
      {path: 'tipos-materiales', component: AbmTiposMaterialesComponent},
      {path: 'usuarios', component: AbmUsuariosComponent},
    ],
  },
  {path: '**', component: ErrorNotFoundComponent},
];
