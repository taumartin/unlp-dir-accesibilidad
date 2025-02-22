import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  public resetFormValidations(form: FormGroup) {
    form.markAsPristine();
    form.markAsUntouched();
    form.updateValueAndValidity();
  }

  public isInputInvalid(control: AbstractControl | null) {
    return !!control && control.invalid && control.touched;
  }

  public isInputValid(control: AbstractControl | null) {
    return !!control && control.valid && control.touched;
  }
}
