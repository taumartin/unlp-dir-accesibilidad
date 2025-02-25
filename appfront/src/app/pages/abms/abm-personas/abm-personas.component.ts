import {Component, inject} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {ConfigColumns} from 'datatables.net';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {
  CrudLayoutComponent,
  CrudLayoutEntityModalOpenEvent
} from '../../../components/crud-layout/crud-layout.component';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {Persona} from '../../../models/persona';
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {ApiSuccessResponse} from '../../../services/network/api/api-success-response';
import {ApiErrorResponse} from '../../../services/network/api/api-error-response';

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
    edition: 'Ver/Editar Persona',
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
  protected isUpdatingPersona = false;
  protected isDeletingPersona = false;
  protected isEditing = false;

  protected get readonlyInputs(): boolean {
    return !!this.selectedPersona && !this.isEditing;
  }

  private entityModal: NgbModalRef | null = null;
  protected selectedPersona: Persona | null = null;

  private readonly formBuilder = inject(FormBuilder);
  protected personaForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastname: ['', [Validators.required, Validators.maxLength(100)]],
    documentNumber: [0, [Validators.required, Validators.min(10_000_000), Validators.max(99_999_999),
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

  private closeModal(): void {
    this.entityModal?.close();
    this.entityModal = null;
  }

  private createPersona(persona: Omit<Persona, 'id'>): void {
    console.log("creating");
    if (!this.isCreatingPersona) {
      this.isCreatingPersona = true;
      this.personasService.createPersona(persona).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isCreatingPersona = false;
        }
      });
    }
  }

  private onEntitySaveEnd(result: ApiSuccessResponse | ApiErrorResponse): void {
    if (result.success) {
      this.personaForm.reset();
      this.toastService.showSuccessToast({body: result.message});
      this.closeModal();
      this.selectedPersona = null;
    } else {
      this.formService.parseBackendValidation(this.personaForm, result);
      this.toastService.showErrorToast({body: result.message});
    }
  }

  private updatePersona(persona: Omit<Persona, 'id'>): void {
    if (!this.isUpdatingPersona && this.selectedPersona) {
      this.isUpdatingPersona = true;
      this.personasService.updatePersona(this.selectedPersona.id, persona).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isUpdatingPersona = false;
        }
      });
    }
  }

  private deletePersona(): void {
    if (!this.isDeletingPersona && this.selectedPersona) {
      this.isDeletingPersona = true;
      this.personasService.deletePersona(this.selectedPersona.id).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isDeletingPersona = false;
        }
      });
    }
  }

  protected onSavePersona(modal: NgbModalRef | null = null) {
    if (this.personaForm.valid) {
      this.entityModal = this.entityModal || modal;
      this.formService.resetFormValidations(this.personaForm);
      const {name, lastname, documentNumber, email, phone} = this.personaForm.value;
      const newPersona: Omit<Persona, 'id'> = {
        nombre: name!,
        apellido: lastname!,
        dni: Number(documentNumber!),
        email: email!,
        telefono: phone ?? '',
      };
      if (this.selectedPersona) {
        this.updatePersona(newPersona)
      } else {
        this.createPersona(newPersona);
      }
    }
  }

  protected isPersonaModified(): boolean {
    if (!this.personaForm || !this.selectedPersona) {
      return false;
    }
    const formValues = this.personaForm.value;
    return this.personasService.isPersonaModified(this.selectedPersona, {
      nombre: formValues.name ?? undefined,
      apellido: formValues.lastname ?? undefined,
      dni: formValues.documentNumber ?? undefined,
      email: formValues.email ?? undefined,
      telefono: formValues.phone ?? undefined,
    });
  }

  protected onEntityModalOpen(event: CrudLayoutEntityModalOpenEvent<Persona>): void {
    this.personaForm.reset();
    this.entityModal = event.modal;
    this.selectedPersona = event.entity || null;
    if (this.selectedPersona) {
      this.personaForm.patchValue({
        name: this.selectedPersona.nombre,
        lastname: this.selectedPersona.apellido,
        documentNumber: this.selectedPersona.dni,
        email: this.selectedPersona.email,
        phone: this.selectedPersona.telefono,
      });
    }
  }

  protected onDeletePersona(): void {
    this.deletePersona();
  }
}
