import {Component} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {Persona} from '../../../models/persona';
import {GenericAbm} from '../generic-abm';

@Component({
  selector: 'app-abm-personas',
  imports: [DataTablesModule, CrudLayoutComponent, ReactiveFormsModule],
  templateUrl: './abm-personas.component.html',
  styleUrl: './abm-personas.component.scss'
})
export class AbmPersonasComponent extends GenericAbm<Persona> {
  public constructor(
    personasService: PersonasService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(personasService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
      {title: 'Apellido', data: 'apellido', name: 'apellido'},
      {title: 'DNI', data: 'dni', name: 'dni', className: 'text-center'},
      {title: 'Teléfono', data: 'telefono', name: 'telefono'},
      {title: 'E-mail', data: 'email', name: 'email'},
    ], {
      title: 'ABM Personas',
      creation: 'Nueva Persona',
      edition: 'Ver/Editar Persona',
    }, {
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      dni: [0, [Validators.required, Validators.min(10_000_000), Validators.max(99_999_999),
        Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono: ['', [Validators.maxLength(25)]],
    });
  }

  protected get nombre() {
    return this.getFormControlByKey('nombre');
  }

  protected get apellido() {
    return this.getFormControlByKey('apellido');
  }

  protected get dni() {
    return this.getFormControlByKey('dni');
  }

  protected get telefono() {
    return this.getFormControlByKey('telefono');
  }

  protected get email() {
    return this.getFormControlByKey('email');
  }

  protected getModified(formValues: Partial<Omit<Persona, 'id'>>): Partial<Omit<Persona, "id">> {
    return {
      nombre: formValues.nombre ?? undefined,
      apellido: formValues.apellido ?? undefined,
      dni: formValues.dni ?? undefined,
      email: formValues.email ?? undefined,
      telefono: formValues.telefono ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Persona, 'id'>>): Omit<Persona, "id"> {
    const {nombre, apellido, dni, email, telefono} = formValues;
    return {
      nombre: nombre!,
      apellido: apellido!,
      dni: Number(dni!),
      email: email!,
      telefono: telefono ?? '',
    };
  }

  protected getPatchedValues(model: Persona): any {
    return {
      nombre: model.nombre,
      apellido: model.apellido,
      dni: model.dni,
      email: model.email,
      telefono: model.telefono,
    };
  }
}
