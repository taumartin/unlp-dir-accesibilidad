import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {TiposMaterialesService} from '../../../services/data/tipos-materiales/tipos-materiales.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {TipoMaterial} from '../../../models/tipo-material';
import {GenericAbm} from '../generic-abm';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-abm-tipos-materiales',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './abm-tipos-materiales.component.html',
  styleUrl: './abm-tipos-materiales.component.scss'
})
export class AbmTiposMaterialesComponent extends GenericAbm<TipoMaterial> {
  public constructor(
    tiposMaterialesService: TiposMaterialesService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(tiposMaterialesService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
    ], {
      title: 'ABM Tipos de Materiales',
      creation: 'Nuevo Tipo de Material',
      edition: 'Ver/Editar Tipo de Material',
    }, {
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  protected get nombre() {
    return this.getFormControlByKey('nombre');
  }

  protected getModified(formValues: any): Partial<Omit<TipoMaterial, "id">> {
    return {
      nombre: formValues.nombre ?? undefined,
    };
  }

  protected getNewModel(formValues: any): Omit<TipoMaterial, "id"> {
    const {nombre} = formValues;
    return {
      nombre: nombre!,
    };
  }

  protected getPatchedValues(model: TipoMaterial): any {
    return {
      nombre: model.nombre,
    };
  }
}
