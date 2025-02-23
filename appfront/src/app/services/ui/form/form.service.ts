import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {isApiValidationErrorResponseFields} from '../../network/api/api-validation-error-response';
import {ApiErrorResponse} from '../../network/api/api-error-response';


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

  public parseBackendValidation(form: FormGroup, apiError: ApiErrorResponse) {
    if (isApiValidationErrorResponseFields(apiError.error)) {
      Object.entries(apiError.error.fields).forEach(([fieldKey, field]) => {
        const control = form.get(fieldKey);
        if (control) {
          control.setErrors({backend: field.msg});
          control.markAsTouched();
        }
      });
    } else {
      console.log("p");
    }
  }
}
