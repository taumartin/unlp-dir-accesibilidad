import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private returnUrl: string = '/';

  email = 'pepe@argento.ar';
  password = 'pepe123';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParams['r']) {
      this.returnUrl = atob(this.route.snapshot.queryParams['r']);
    }
  }

  public login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: result => {
        console.log('Login exitoso', result);
        this.router.navigate([this.returnUrl], {relativeTo: this.route});
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
