import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/core/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {faGoogle, faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-login',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected googleIcon = faGoogle;
  protected facebookIcon = faFacebookF;

  private returnUrl: string = '/';

  private readonly email = 'pepe@argento.ar'; // FIXME:
  private readonly password = 'pepe123'; // FIXME:

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

  protected login(): void { // FIXME:
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

  private me(): void { // FIXME:
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
