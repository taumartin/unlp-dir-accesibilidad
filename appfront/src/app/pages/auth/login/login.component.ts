import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/core/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {faGoogle, faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';

const REDIRECT_Q_PARAM = 'r';
const REMEMBER_ME_STORAGE_KEY = 'rememberedEmail';

@Component({
  selector: 'app-login',
  imports: [FaIconComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected googleIcon = faGoogle;
  protected facebookIcon = faFacebookF;

  private returnUrl: string = '/';
  protected isDoingLogin: boolean = false;

  private readonly formBuilder = inject(FormBuilder);
  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formService: FormService,
    private readonly toastService: ToastService,
  ) {
  }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParams[REDIRECT_Q_PARAM]) {
      this.returnUrl = atob(this.route.snapshot.queryParams[REDIRECT_Q_PARAM]);
    }

    const rememberedUsername = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
    if (rememberedUsername) {
      this.loginForm.patchValue({email: rememberedUsername, rememberMe: true});
    }
  }

  protected get email() {
    return this.loginForm.get('email');
  }

  protected get password() {
    return this.loginForm.get('password');
  }

  protected get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  protected isInvalid(control: AbstractControl | null): boolean {
    return this.formService.isInputInvalid(control);
  }

  protected isValid(control: AbstractControl | null): boolean {
    return this.formService.isInputValid(control);
  }

  protected doLogin(username: string, password: string, remember: boolean): void {
    this.isDoingLogin = true;

    if (remember) {
      localStorage.setItem(REMEMBER_ME_STORAGE_KEY, username);
    } else {
      localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
    }

    this.authService.login(username, password).subscribe({
      next: result => {
        if (result.success) {
          this.router.navigate([this.returnUrl], {relativeTo: this.route}).then((navResult) => {
            if (!navResult) {
              this.router.navigate(['/']);
            }
            this.toastService.showSuccessToast(result.message);
          });
        } else {
          this.toastService.showErrorToast(result.message, "No se pudo realizar el login");
        }
      },
      complete: () => {
        this.isDoingLogin = false;
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

  public onSubmit(): void {
    if (this.loginForm.valid && !this.isDoingLogin) {
      this.formService.resetFormValidations(this.loginForm);
      const {email, password, rememberMe} = this.loginForm.value;
      this.doLogin(email!, password!, !!rememberMe);
    }
  }
}
