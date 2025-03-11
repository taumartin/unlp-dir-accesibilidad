import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {UsuariosService} from '../../../services/data/usuarios/usuarios.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {Usuario} from '../../../models/usuario';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {NgOptimizedImage} from '@angular/common';
import {GenericAbm} from '../generic-abm';

@Component({
  selector: 'app-abm-usuarios',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './abm-usuarios.component.html',
  styleUrl: './abm-usuarios.component.scss'
})
export class AbmUsuariosComponent extends GenericAbm<Usuario> {
  public constructor(
    usuariosService: UsuariosService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(usuariosService, formService, toastService, [
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
    ], {
      title: 'ABM Usuarios',
      creation: 'Nuevo Usuario',
      edition: 'Ver/Editar Usuario',
    }, {
      username: ['', [Validators.required, Validators.maxLength(32)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      fotoPerfil: ['', [Validators.maxLength(255), Validators.pattern(/^(https?:\/\/)?([\da-zA-Z.-]+)\.([a-z.]{2,6})([/\w .-])*$/)]],
      esAdmin: [false],
      estaActivo: [false],
    });
  }

  protected get username() {
    return this.getFormControlByKey('username');
  }

  protected get correo() {
    return this.getFormControlByKey('correo');
  }

  protected get fotoPerfil() {
    return this.getFormControlByKey('fotoPerfil');
  }

  protected get esAdmin() {
    return this.getFormControlByKey('esAdmin');
  }

  protected get estaActivo() {
    return this.getFormControlByKey('estaActivo');
  }

  protected getModified(formValues: Partial<Omit<Usuario, 'id'>>): Partial<Omit<Usuario, "id">> {
    return {
      username: formValues.username ?? undefined,
      correo: formValues.correo ?? undefined,
      fotoPerfil: formValues.fotoPerfil ?? null,
      esAdmin: formValues.esAdmin ?? undefined,
      estaActivo: formValues.estaActivo ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Usuario, 'id'>>): Omit<Usuario, "id"> {
    const {username, correo, fotoPerfil, esAdmin, estaActivo} = formValues;
    return {
      username: username!,
      correo: correo!,
      fotoPerfil: fotoPerfil ?? '',
      esAdmin: esAdmin!,
      estaActivo: estaActivo!,
    };
  }

  protected getPatchedValues(model: Usuario): any {
    return {
      username: model.username,
      correo: model.correo,
      fotoPerfil: model.fotoPerfil,
      esAdmin: model.esAdmin,
      estaActivo: model.estaActivo,
    };
  }
}
