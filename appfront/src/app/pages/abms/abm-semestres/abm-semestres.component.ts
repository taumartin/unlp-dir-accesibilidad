import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {SemestresService} from '../../../services/data/semestres/semestres.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {Semestre} from '../../../models/semestre';
import {GenericAbm} from '../generic-abm';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';

const _CURRENT_YEAR: number = (new Date()).getFullYear();

@Component({
  selector: 'app-abm-semestres',
  imports: [DataTablesModule, CrudLayoutComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './abm-semestres.component.html',
  styleUrl: './abm-semestres.component.scss'
})
export class AbmSemestresComponent extends GenericAbm<Semestre> {
  protected currentYear: number = _CURRENT_YEAR;

  public constructor(
    semestresService: SemestresService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(semestresService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Año', data: 'anio', name: 'anio', className: 'text-center'},
      {
        title: '1° Semestre', data: 'esPrimerSemestre', name: 'esPrimerSemestre',
        render: data => data ? 'Sí' : 'No',
      },
    ], {
      title: 'ABM Semestres',
      creation: 'Nuevo Semestre',
      edition: 'Ver/Editar Semestre',
    }, {
      anio: [_CURRENT_YEAR, [Validators.required, Validators.min(1_999), Validators.max(2_050),
        Validators.pattern(/^\d{4}$/)]],
      esPrimerSemestre: [true],
    });
  }

  protected get anio() {
    return this.getFormControlByKey('anio');
  }

  protected get esPrimerSemestre() {
    return this.getFormControlByKey('esPrimerSemestre');
  }

  protected getModified(formValues: Partial<Omit<Semestre, "id">>): Partial<Omit<Semestre, "id">> {
    return {
      anio: formValues.anio ?? undefined,
      esPrimerSemestre: formValues.esPrimerSemestre ?? undefined,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Semestre, "id">>): Omit<Semestre, "id"> {
    const {anio, esPrimerSemestre} = formValues;
    return {
      anio: Number(anio!),
      esPrimerSemestre: Boolean(esPrimerSemestre),
    };
  }

  protected getPatchedValues(model: Semestre): any {
    return {
      anio: model.anio,
      esPrimerSemestre: model.esPrimerSemestre,
    };
  }
}
