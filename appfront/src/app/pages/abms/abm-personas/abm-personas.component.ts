import {Component, inject} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {ConfigColumns} from 'datatables.net';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {Persona} from '../../../models/persona';
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';

@Component({
  selector: 'app-abm-personas',
  imports: [DataTablesModule, CrudLayoutComponent, ReactiveFormsModule],
  templateUrl: './abm-personas.component.html',
  styleUrl: './abm-personas.component.scss'
})
export class AbmPersonasComponent {
  protected labels = {
    title: 'ABM Personas',
    creation: 'Nueva Persona',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Nombre', data: 'nombre', name: 'nombre'},
    {title: 'Apellido', data: 'apellido', name: 'apellido'},
    {title: 'DNI', data: 'dni', name: 'dni', className: 'text-center'},
    {title: 'Teléfono', data: 'telefono', name: 'telefono'},
    {title: 'E-mail', data: 'email', name: 'email'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Persona>> = (pagReq) => this.personasService.getPersonas(pagReq);
  protected isCreatingPersona = false;

  private readonly formBuilder = inject(FormBuilder);
  protected personaForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.maxLength(100)]],
    documentNumber: [null, [Validators.required, Validators.min(10_000_000), Validators.max(99_999_999),
      Validators.pattern(/^\d{8}$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.maxLength(25)]],
  });

  public constructor(
    private readonly personasService: PersonasService,
    private readonly formService: FormService,
    private readonly toastService: ToastService,
  ) {
  }

  protected get name() {
    return this.personaForm.get('name');
  }

  protected get lastname() {
    return this.personaForm.get('lastname');
  }

  protected get documentNumber() {
    return this.personaForm.get('documentNumber');
  }

  protected get phone() {
    return this.personaForm.get('phone');
  }

  protected get email() {
    return this.personaForm.get('email');
  }

  protected isInvalid(control: AbstractControl | null): boolean {
    return this.formService.isInputInvalid(control);
  }

  protected isValid(control: AbstractControl | null): boolean {
    return this.formService.isInputValid(control);
  }

  private createPersona(persona: Omit<Persona, 'id'>, modal: NgbModalRef): void {
    this.isCreatingPersona = true;
    this.personasService.createPersona(persona).subscribe({
      next: result => {
        if (result.success) {
          this.personaForm.reset();
          this.toastService.showSuccessToast({body: result.message});
          modal.close();
        } else {
          this.formService.parseBackendValidation(this.personaForm, result);
          this.toastService.showErrorToast({body: result.message});
        }
      },
      complete: () => {
        this.isCreatingPersona = false;
      }
    });
  }

  protected onSavePersona(modal: NgbModalRef) {
    if (this.personaForm.valid && !this.isCreatingPersona) {
      this.formService.resetFormValidations(this.personaForm);
      const {name, lastname, documentNumber, email, phone} = this.personaForm.value;
      this.createPersona({
        nombre: name!,
        apellido: lastname!,
        dni: Number(documentNumber!),
        email: email!,
        telefono: phone ?? '',
      }, modal);
    }
  }

  protected onEntitySaved(modal: NgbModalRef): void {
    this.onSavePersona(modal);
  }

  protected onCreateEntity(modal: NgbModalRef): void {
    this.personaForm.reset();
  }
}
