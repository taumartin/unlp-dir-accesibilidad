import {Component} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {Materia} from '../../../models/materia';
import {GenericAbm} from '../generic-abm';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';

@Component({
  selector: 'app-abm-materias',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './abm-materias.component.html',
  styleUrl: './abm-materias.component.scss'
})
export class AbmMateriasComponent extends GenericAbm<Materia> {
  public constructor(
    materiasService: MateriasService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(materiasService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
      {title: 'Docentes', data: 'docentes', name: 'docentes'},
      {title: 'Contacto', data: 'contacto', name: 'contacto'},
    ], {
      title: 'ABM Materias',
      creation: 'Nueva Materia',
      edition: 'Ver/Editar Materia',
    }, {
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      docentes: ['', [Validators.maxLength(500)]],
      contacto: ['', [Validators.maxLength(500)]],
    });
  }

  protected get nombre() {
    return this.getFormControlByKey('nombre');
  }

  protected get docentes() {
    return this.getFormControlByKey('docentes');
  }

  protected get contacto() {
    return this.getFormControlByKey('contacto');
  }

  protected getModified(formValues: Partial<Omit<Materia, "id">>): Partial<Omit<Materia, "id">> {
    return {
      nombre: formValues.nombre ?? undefined,
      docentes: formValues.docentes ?? undefined,
      contacto: formValues.contacto ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Materia, "id">>): Omit<Materia, "id"> {
    const {nombre, docentes, contacto} = formValues;
    return {
      nombre: nombre!,
      docentes: docentes ?? '',
      contacto: contacto ?? '',
    };
  }

  protected getPatchedValues(model: Materia): any {
    return {
      nombre: model.nombre,
      docentes: model.docentes,
      contacto: model.contacto,
    };
  }
}
