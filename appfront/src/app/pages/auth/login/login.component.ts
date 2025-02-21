import {Component} from '@angular/core';
import {AuthService} from '../../../services/core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = 'pepe@argento.ar';
  password = 'pepe123';

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: result => {
        console.log('Login exitoso', result);
      },
      error: error => {
        console.log('Credenciales incorrectas', error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  me() {
    this.authService.me().subscribe({
      next: result => {
        console.log('me exitoso', result);
        alert(result.data.email);
      },
      error: error => {
        console.log('error me', error);
      },
      complete: () => {
        console.log('me complete');
      }
    })
  }
}
