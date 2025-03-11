import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {MediosComunicacionService} from '../../../services/data/medios-comunicacion/medios-comunicacion.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {MedioComunicacion} from '../../../models/medio-comunicacion';
import {GenericAbm} from '../generic-abm';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';

@Component({
  selector: 'app-abm-medios-comunicacion',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './abm-medios-comunicacion.component.html',
  styleUrl: './abm-medios-comunicacion.component.scss'
})
export class AbmMediosComunicacionComponent extends GenericAbm<MedioComunicacion> {
  public constructor(
    mediosComunicacionService: MediosComunicacionService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(mediosComunicacionService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
    ], {
      title: 'ABM Medios de Comunicación',
      creation: 'Nuevo Medio de Comunicación',
      edition: 'Ver/Editar Medio de Comunicación',
    }, {
      nombre: ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  protected get nombre() {
    return this.getFormControlByKey('nombre');
  }

  protected getModified(formValues: any): Partial<Omit<MedioComunicacion, "id">> {
    return {
      nombre: formValues.nombre ?? undefined,
    };
  }

  protected getNewModel(formValues: any): Omit<MedioComunicacion, "id"> {
    const {nombre} = formValues;
    return {
      nombre: nombre!,
    };
  }

  protected getPatchedValues(model: MedioComunicacion): any {
    return {
      nombre: model.nombre,
    };
  }
}
