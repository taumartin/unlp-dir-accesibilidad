import {Component, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {AuthService} from '../../../services/core/auth/auth.service';
import {ToastService} from '../../../services/ui/toast/toast.service';

const emailPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email');
  const password = control.get('password');
  if (!email || !password) {
    return null;
  }

  const errors = password.errors ?? {};
  if (email.value === password.value) {
    password.setErrors({...errors, emailPasswordMatch: true});
    return {emailPasswordMatch: true};
  }

  if (errors['emailPasswordMatch']) {
    delete errors['emailPasswordMatch'];
    password.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }
  return null;
};

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRetype = control.get('passwordRetype');
  if (!password || !passwordRetype) {
    return null;
  }

  const errors = passwordRetype.errors ?? {};
  if (password.value !== passwordRetype.value) {
    passwordRetype.setErrors({...errors, passwordMismatch: true});
    return {passwordMismatch: true};
  }

  if (errors['passwordMismatch']) {
    delete errors['passwordMismatch'];
    passwordRetype.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }
  return null;
};

const emailMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email');
  const emailRetype = control.get('emailRetype');
  if (!email || !emailRetype) {
    return null;
  }

  const errors = emailRetype.errors ?? {};
  if (email.value !== emailRetype.value) {
    emailRetype.setErrors({...errors, emailMismatch: true});
    return {emailMismatch: true};
  }

  if (errors['emailMismatch']) {
    delete errors['emailMismatch'];
    emailRetype.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }
  return null;
};

const REDIRECT_PATH_AFTER_SIGNUP = '/';

@Component({
  selector: 'app-signup',
  imports: [
    FaIconComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  protected googleIcon = faGoogle;
  protected facebookIcon = faFacebookF;

  protected isDoingSignup: boolean = false;

  private readonly formBuilder = inject(FormBuilder);
  protected signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      emailRetype: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRetype: ['', Validators.required],
    },
    {validators: [emailPasswordValidator, passwordMatchValidator, emailMatchValidator]});

  constructor(
    private readonly formService: FormService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) {
  }

  protected get email() {
    return this.signupForm.get('email');
  }

  protected get emailRetype() {
    return this.signupForm.get('emailRetype');
  }

  protected get password() {
    return this.signupForm.get('password');
  }

  protected get passwordRetype() {
    return this.signupForm.get('passwordRetype');
  }

  protected isInvalid(control: AbstractControl | null): boolean {
    return this.formService.isInputInvalid(control);
  }

  protected isValid(control: AbstractControl | null): boolean {
    return this.formService.isInputValid(control);
  }

  private doSignup(email: string, password: string): void {
    this.isDoingSignup = true;
    this.authService.signup(email, password).subscribe({
      next: result => {
        if (result.success) {
          this.signupForm.reset();
          this.toastService.showSuccessToast({body: result.message});
          this.router.navigate([REDIRECT_PATH_AFTER_SIGNUP]);
        } else {
          this.formService.parseBackendValidation(this.signupForm, result);
          this.toastService.showErrorToast({body: result.message, header: "No se pudo realizar el registro"});
        }
      },
      complete: () => {
        this.isDoingSignup = false;
      }
    });
  }

  public onSubmit(): void {
    if (this.signupForm.valid && !this.isDoingSignup) {
      this.formService.resetFormValidations(this.signupForm);
      const {email, password} = this.signupForm.value;
      this.doSignup(email!, password!);
    }
  }
}
