import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {TiposEventosService} from '../../../services/data/tipos-eventos/tipos-eventos.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {TipoEvento} from '../../../models/tipo-evento';
import {GenericAbm} from '../generic-abm';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-abm-tipos-eventos',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './abm-tipos-eventos.component.html',
  styleUrl: './abm-tipos-eventos.component.scss'
})
export class AbmTiposEventosComponent extends GenericAbm<TipoEvento> {
  public constructor(
    tiposEventosService: TiposEventosService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(tiposEventosService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
    ], {
      title: 'ABM Tipos de Eventos',
      creation: 'Nuevo Tipo de Evento',
      edition: 'Ver/Editar Tipo de Evento',
    }, {
      nombre: ['', [Validators.required, Validators.maxLength(17)]],
    });
  }

  protected get nombre() {
    return this.getFormControlByKey('nombre');
  }

  protected getModified(formValues: Partial<Omit<TipoEvento, 'id'>>): Partial<Omit<TipoEvento, "id">> {
    return {
      nombre: formValues.nombre ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<TipoEvento, 'id'>>): Omit<TipoEvento, "id"> {
    const {nombre} = formValues;
    return {
      nombre: nombre!,
    };
  }

  protected getPatchedValues(model: TipoEvento): any {
    return {
      nombre: model.nombre,
    };
  }
}
