import {Component, inject} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {UsuariosService} from '../../../services/data/usuarios/usuarios.service';
import {
  CrudLayoutComponent,
  CrudLayoutEntityModalOpenEvent
} from "../../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {Usuario} from '../../../models/usuario';
import {AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {ApiSuccessResponse} from '../../../services/network/api/api-success-response';
import {ApiErrorResponse} from '../../../services/network/api/api-error-response';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-abm-usuarios',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './abm-usuarios.component.html',
  styleUrl: './abm-usuarios.component.scss'
})
export class AbmUsuariosComponent {
  protected labels = {
    title: 'ABM Usuarios',
    creation: 'Nuevo Usuario',
    edition: 'Ver/Editar Usuario',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Usuario', data: 'username', name: 'username'},
    {title: 'E-mail', data: 'correo', name: 'correo'},
    {
      title: 'Activo', data: 'estaActivo', name: 'estaActivo', className: 'text-center',
      render: data => data ? 'Sí' : 'No',
    },
    {
      title: 'Admin', data: 'esAdmin', name: 'esAdmin', className: 'text-center',
      render: data => data ? 'Sí' : 'No',
    },
    {
      title: 'Avatar', data: 'fotoPerfil', name: 'fotoPerfil', className: 'text-center',
      render: data => data ? `<img src="${data}" alt="Avatar " class="img-data-avatar">` : null,
    },
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Usuario>> = (pagReq) => this.usuariosService.listAll(pagReq);
  protected isCreatingUsuario = false;
  protected isUpdatingUsuario = false;
  protected isDeletingUsuario = false;
  protected isEditing = false;

  protected get readonlyInputs(): boolean {
    return !!this.selectedUsuario && !this.isEditing;
  }

  private entityModal: NgbModalRef | null = null;
  protected selectedUsuario: Usuario | null = null;

  private readonly formBuilder = inject(FormBuilder);
  protected usuarioForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(32)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    fotoPerfil: ['', [Validators.maxLength(255), Validators.pattern(/^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-z.]{2,6})([/\w .-])*$/)]],
    esAdmin: [false],
    estaActivo: [false],
  });

  public constructor(
    private readonly usuariosService: UsuariosService,
    private readonly formService: FormService,
    private readonly toastService: ToastService,
  ) {
  }

  protected get username() {
    return this.usuarioForm.get('username');
  }

  protected get correo() {
    return this.usuarioForm.get('correo');
  }

  protected get fotoPerfil() {
    return this.usuarioForm.get('fotoPerfil');
  }

  protected get esAdmin() {
    return this.usuarioForm.get('esAdmin');
  }

  protected get estaActivo() {
    return this.usuarioForm.get('estaActivo');
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

  private createUsuario(usuario: Omit<Usuario, 'id'>): void {
    if (!this.isCreatingUsuario) {
      this.isCreatingUsuario = true;
      this.usuariosService.create(usuario).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isCreatingUsuario = false;
        }
      });
    }
  }

  private onEntitySaveEnd(result: ApiSuccessResponse | ApiErrorResponse): void {
    if (result.success) {
      this.usuarioForm.reset();
      this.toastService.showSuccessToast({body: result.message});
      this.closeModal();
      this.selectedUsuario = null;
    } else {
      this.formService.parseBackendValidation(this.usuarioForm, result);
      this.toastService.showErrorToast({body: result.message});
    }
  }

  private updateUsuario(usuario: Omit<Usuario, 'id'>): void {
    if (!this.isUpdatingUsuario && this.selectedUsuario) {
      this.isUpdatingUsuario = true;
      this.usuariosService.update(this.selectedUsuario.id, usuario).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isUpdatingUsuario = false;
        }
      });
    }
  }

  private deleteUsuario(): void {
    if (!this.isDeletingUsuario && this.selectedUsuario) {
      this.isDeletingUsuario = true;
      this.usuariosService.delete(this.selectedUsuario.id).subscribe({
        next: result => this.onEntitySaveEnd(result),
        complete: () => {
          this.isDeletingUsuario = false;
        }
      });
    }
  }

  protected onSaveUsuario(modal: NgbModalRef | null = null) {
    if (this.usuarioForm.valid && !this.readonlyInputs) {
      this.entityModal = this.entityModal || modal;
      this.formService.resetFormValidations(this.usuarioForm);
      const {username, correo, fotoPerfil, esAdmin, estaActivo} = this.usuarioForm.value;
      const newUsuario: Omit<Usuario, 'id'> = {
        username: username!,
        correo: correo!,
        fotoPerfil: fotoPerfil ?? '',
        esAdmin: esAdmin!,
        estaActivo: estaActivo!,
      };
      if (this.selectedUsuario) {
        this.updateUsuario(newUsuario)
      } else {
        this.createUsuario(newUsuario);
      }
    }
  }

  protected isUsuarioModified(): boolean {
    if (!this.usuarioForm || !this.selectedUsuario) {
      return false;
    }
    const formValues = this.usuarioForm.value;
    return this.usuariosService.isModified(this.selectedUsuario, {
      username: formValues.username ?? undefined,
      correo: formValues.correo ?? undefined,
      fotoPerfil: formValues.fotoPerfil ?? undefined,
      esAdmin: formValues.esAdmin ?? undefined,
      estaActivo: formValues.estaActivo ?? undefined,
    });
  }

  protected onEntityModalOpen(event: CrudLayoutEntityModalOpenEvent<Usuario>): void {
    this.usuarioForm.reset();
    this.entityModal = event.modal;
    this.selectedUsuario = event.entity || null;
    if (this.selectedUsuario) {
      this.usuarioForm.patchValue({
        username: this.selectedUsuario.username,
        correo: this.selectedUsuario.correo,
        fotoPerfil: this.selectedUsuario.fotoPerfil,
        esAdmin: this.selectedUsuario.esAdmin,
        estaActivo: this.selectedUsuario.estaActivo,
      });
    }
  }

  protected onDeleteUsuario(): void {
    this.deleteUsuario();
  }
}
