import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {EventosService} from '../../../services/data/eventos/eventos.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {Evento} from '../../../models/evento';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GenericAbm} from '../generic-abm';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {DatesService} from '../../../services/data/dates/dates.service';

@Component({
  selector: 'app-abm-eventos',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.scss'
})
export class AbmEventosComponent extends GenericAbm<Evento> {
  public constructor(
    eventosService: EventosService,
    formService: FormService,
    toastService: ToastService,
    private readonly datesService: DatesService,
  ) {
    super(eventosService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {
        title: 'Fecha', data: '_timestamp', name: 'fechaYHora', className: 'text-center',
        render: data => data.toLocaleTimeString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
      {title: 'Descripción', data: 'descripcion', name: 'descripcion'},
    ], {
      title: 'ABM Eventos',
      creation: 'Nuevo Evento',
      edition: 'Ver/Editar Evento',
    }, {
      fechaYHora: [null, [Validators.required]],
      descripcion: ['', [Validators.maxLength(5_000)]],
    });
  }

  protected get fechaYHora() {
    return this.getFormControlByKey('fechaYHora');
  }

  protected get descripcion() {
    return this.getFormControlByKey('descripcion');
  }

  protected getModified(formValues: Partial<Omit<Evento, "id">>): Partial<Omit<Evento, "id">> {
    return {
      fechaYHora: formValues.fechaYHora ?? undefined,
      descripcion: formValues.descripcion ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Evento, "id">>): Omit<Evento, "id"> {
    const {fechaYHora, descripcion} = formValues;
    return {
      fechaYHora: this.datesService.inputStringToIsoString(fechaYHora!),
      descripcion: descripcion ?? '',
    };
  }

  protected getPatchedValues(model: Evento): any {
    return {
      fechaYHora: model._dateTimeString!,
      descripcion: model.descripcion,
    };
  }
}
