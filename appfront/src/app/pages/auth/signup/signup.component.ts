import {Component, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {RouterLink} from '@angular/router';
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

const usernamePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const username = control.get('username');
  const password = control.get('password');
  if (username && password && (username.value === password.value)) {
    password.setErrors({usernamePasswordMatch: true});
    return {usernamePasswordMatch: true};
  }
  if (password) {
    password.setErrors(null);
  }
  return null;
};

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRetype = control.get('passwordRetype');
  if (password && passwordRetype && (password.value !== passwordRetype.value)) {
    passwordRetype.setErrors({passwordMismatch: true});
    return {passwordMismatch: true};
  }
  if (passwordRetype) {
    passwordRetype.setErrors(null);
  }
  return null;
};

const usernameMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const username = control.get('username');
  const usernameRetype = control.get('usernameRetype');
  if (username && usernameRetype && (username.value !== usernameRetype.value)) {
    usernameRetype.setErrors({usernameMismatch: true});
    return {usernameMismatch: true};
  }
  if (usernameRetype) {
    usernameRetype.setErrors(null);
  }
  return null;
};

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
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      documentNumber: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      phone: [''],
      username: ['', [Validators.required, Validators.email]],
      usernameRetype: ['', Validators.required],
      password: ['', Validators.required],
      passwordRetype: ['', Validators.required],
    },
    {validators: [usernamePasswordValidator, passwordMatchValidator, usernameMatchValidator]});

  constructor(
    private readonly formService: FormService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
  ) {
  }

  protected get name() {
    return this.signupForm.get('name');
  }

  protected get lastname() {
    return this.signupForm.get('lastname');
  }

  protected get documentNumber() {
    return this.signupForm.get('documentNumber');
  }

  protected get phone() {
    return this.signupForm.get('phone');
  }

  protected get username() {
    return this.signupForm.get('username');
  }

  protected get usernameRetype() {
    return this.signupForm.get('usernameRetype');
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

  private doSignup(name: string, lastname: string, documentNumber: number, email: string, password: string, phone?: string): void {
    this.isDoingSignup = true;
    this.authService.signup(name, lastname, documentNumber, email, password, phone).subscribe({
      next: result => {
        if (result.success) {
          this.signupForm.reset();
          this.toastService.showSuccessToast({body: result.message});
        } else {
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
      const {name, lastname, documentNumber, phone, username, password} = this.signupForm.value;
      this.doSignup(name!, lastname!, Number(documentNumber!), username!, password!, phone ?? '');
    }
  }
}
