import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/core/auth/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {faGoogle, faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {Subject, takeUntil} from 'rxjs';

const REDIRECT_Q_PARAM = 'r';
const DEFAULT_REDIRECT = '/';
const REMEMBER_ME_STORAGE_KEY = 'rememberedEmail';

@Component({
  selector: 'app-login',
  imports: [FaIconComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  protected googleIcon = faGoogle;
  protected facebookIcon = faFacebookF;

  private returnUrl: string = DEFAULT_REDIRECT;
  protected isDoingLogin: boolean = false;

  private readonly formBuilder = inject(FormBuilder);
  protected loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  private destroy$?: Subject<void>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formService: FormService,
    private readonly toastService: ToastService,
  ) {
  }

  private onLoginSuccess(): void {
    this.router.navigate([this.returnUrl], {relativeTo: this.route}).then((navResult) => {
      if (!navResult) {
        this.router.navigate([DEFAULT_REDIRECT]);
      }
    });
  }

  public ngOnInit(): void {
    if (this.route.snapshot.queryParams[REDIRECT_Q_PARAM]) {
      this.returnUrl = atob(this.route.snapshot.queryParams[REDIRECT_Q_PARAM]);
    }

    if (this.authService.isLoggedIn()) {
      this.onLoginSuccess();
      this.toastService.showStandardToast('Login realizado automáticamente.');
    } else {
      this.subscribeToSilentLogin();
    }

    const rememberedUsername = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
    if (rememberedUsername) {
      this.loginForm.patchValue({email: rememberedUsername, rememberMe: true});
    }
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  private cancelSilentLoginSubscription(): void {
    if (this.destroy$) {
      this.destroy$.next();
    }
  }

  private subscribeToSilentLogin(): void {
    this.destroy$ = new Subject<void>();
    this.authService.userAuthChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.onLoginSuccess();
        }
      });
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

  private doLogin(username: string, password: string, remember: boolean): void {
    this.isDoingLogin = true;
    this.cancelSilentLoginSubscription();

    if (remember) {
      localStorage.setItem(REMEMBER_ME_STORAGE_KEY, username);
    } else {
      localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
    }

    this.authService.login(username, password).subscribe({
      next: result => {
        if (result.success) {
          this.onLoginSuccess();
          this.toastService.showSuccessToast(result.message);
        } else {
          this.subscribeToSilentLogin();
          this.toastService.showErrorToast(result.message, "No se pudo realizar el login");
        }
      },
      complete: () => {
        this.isDoingLogin = false;
      }
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid && !this.isDoingLogin) {
      this.formService.resetFormValidations(this.loginForm);
      const {email, password, rememberMe} = this.loginForm.value;
      this.doLogin(email!, password!, !!rememberMe);
    }
  }
}
