import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {GenericAbm} from '../generic-abm';
import {TutorTrabajoEnMaterial} from '../../../models/tutor-trabajo-en-material';
import {Tutor} from '../../../models/tutor';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {TutoresService} from '../../../services/data/tutores/tutores.service';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {
  MaterialesAccesibilizadosService
} from '../../../services/data/materiales-accesibilizados/materiales-accesibilizados.service';
import {MaterialAccesibilizado} from '../../../models/material-accesibilizado';
import {
  TutoresTrabajosEnMaterialesService
} from '../../../services/data/tutores-trabajos-en-materiales/tutores-trabajos-en-materiales.service';
import {DatesService} from '../../../services/data/dates/dates.service';

@Component({
  selector: 'app-abm-tutores-trabajos-en-materiales',
  imports: [
    CrudLayoutComponent,
    NgbTypeahead,
    ReactiveFormsModule
  ],
  templateUrl: './abm-tutores-trabajos-en-materiales.component.html',
  styleUrl: './abm-tutores-trabajos-en-materiales.component.scss'
})
export class AbmTutoresTrabajosEnMaterialesComponent extends GenericAbm<TutorTrabajoEnMaterial> implements OnInit, OnDestroy {
  protected tutorFormatter = (t: Tutor) => `${t.persona?.apellido}, ${t.persona?.nombre}`;
  protected searchTutor = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.tutoresService.listAll({
          search: term,
          orderBy: '@persona',
          orderDirection: 'asc',
          page: 1,
          pageSize: 20,
        }).pipe(
          map(page => page.data),
          catchError(() => of([]))
        );
      }));

  protected materialFormatter = (m: MaterialAccesibilizado) => m.titulo;
  protected searchMaterial = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.materialesAccesibilizadosService.listAll({
          search: term,
          orderBy: 'titulo',
          orderDirection: 'asc',
          page: 1,
          pageSize: 20,
        }).pipe(
          map(page => page.data),
          catchError(() => of([]))
        );
      }));

  private destroy$?: Subject<void>;

  public constructor(
    private readonly tutoresTrabajosEnMaterialesService: TutoresTrabajosEnMaterialesService,
    private readonly tutoresService: TutoresService,
    private readonly materialesAccesibilizadosService: MaterialesAccesibilizadosService,
    formService: FormService,
    toastService: ToastService,
    private readonly datesService: DatesService,
  ) {
    super(tutoresTrabajosEnMaterialesService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {
        data: null,
        title: "Tutor",
        render: (data, type, row) => {
          return `<p class="m-0">${row.tutor.persona.apellido}, ${row.tutor.persona.nombre}` +
            `<br><small class="fst-italic text-gray-700">DNI: ${row.tutor.persona.dni}</small></p>`;
        },
        name: '@tutor',
      },
      {
        data: null,
        title: "Material Accesibilizado",
        render: (data, type, row) => {
          return `<p class="m-0">${row.materialAccesibilizado.titulo}` +
            `<br><small class="fst-italic text-gray-700">${row.materialAccesibilizado.link}</small></p>`;
        },
        className: 'text-start',
        name: '@materialAccesibilizado',
      },
      {title: 'Minutos Trabajados', data: 'minutosTrabajados', name: 'minutosTrabajados', className: 'text-center'},
      {
        title: 'Fecha', data: '_timestamp', name: 'fecha', className: 'text-center',
        render: data => data.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      },
    ], {
      title: 'ABM Tutores Trabajos En Materiales',
      creation: 'Nuevo Tutor-Trabajo-En-Material',
      edition: 'Ver/Editar Tutor-Trabajo-En-Material',
    }, {
      tutorId: [0, [Validators.required]],
      _tutor: [null, [Validators.required]],
      materialAccesibilizadoId: [0, [Validators.required]],
      _materialAccesibilizado: [null, [Validators.required]],
      minutosTrabajados: [0, [Validators.required, Validators.min(1), Validators.max(1440)]],
      fecha: [null, [Validators.required]],
    });
  }

  protected get tutorId() {
    return this.getFormControlByKey<number>('tutorId');
  }

  protected get _tutor() {
    return this.getFormControlByKey<Tutor>('_tutor');
  }

  protected get materialAccesibilizadoId() {
    return this.getFormControlByKey<number>('materialAccesibilizadoId');
  }

  protected get _materialAccesibilizado() {
    return this.getFormControlByKey<MaterialAccesibilizado>('_materialAccesibilizado');
  }

  protected get minutosTrabajados() {
    return this.getFormControlByKey<number>('minutosTrabajados');
  }

  protected get fecha() {
    return this.getFormControlByKey<string>('fecha');
  }

  public ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this._tutor?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.tutorId?.touched) {
          this.tutorId.reset();
          this.tutorId.markAsTouched();
        }
        if (value && this._tutor?.touched && this.tutorId?.untouched) {
          this.tutorId.markAsTouched();
        }
      });
    this._materialAccesibilizado?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.materialAccesibilizadoId?.touched) {
          this.materialAccesibilizadoId.reset();
          this.materialAccesibilizadoId.markAsTouched();
        }
        if (value && this._materialAccesibilizado?.touched && this.materialAccesibilizadoId?.untouched) {
          this.materialAccesibilizadoId.markAsTouched();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  protected getModified(formValues: Partial<Omit<TutorTrabajoEnMaterial, "id">>): Partial<Omit<TutorTrabajoEnMaterial, "id">> {
    return {
      tutorId: formValues.tutorId,
      materialAccesibilizadoId: formValues.materialAccesibilizadoId,
      minutosTrabajados: formValues.minutosTrabajados,
      fecha: formValues.fecha,
    };
  }

  protected getNewModel(formValues: Partial<Omit<TutorTrabajoEnMaterial, "id">>): Omit<TutorTrabajoEnMaterial, "id"> {
    const {tutorId, materialAccesibilizadoId, minutosTrabajados, fecha} = formValues;
    return {
      tutorId: Number(tutorId!),
      materialAccesibilizadoId: Number(materialAccesibilizadoId!),
      minutosTrabajados: Number(minutosTrabajados),
      fecha: this.datesService.inputStringToIsoDateString(fecha!),
    };
  }

  protected getPatchedValues(model: TutorTrabajoEnMaterial): any {
    return {
      tutorId: model.tutorId,
      _tutor: model.tutor!,
      materialAccesibilizadoId: model.materialAccesibilizadoId,
      _materialAccesibilizado: model.materialAccesibilizado!,
      minutosTrabajados: model.minutosTrabajados,
      fecha: model._dateString!,
    };
  }

  protected onSelectTutor($event: NgbTypeaheadSelectItemEvent<Tutor>) {
    if (this.tutorId) {
      this.tutorId.setValue($event.item.id);
      this.tutorId.markAsTouched();
    }
  }

  protected onBlurTutor() {
    this.tutorId?.markAsTouched();
  }

  protected onSelectMaterialAccesibilizado($event: NgbTypeaheadSelectItemEvent<MaterialAccesibilizado>) {
    if (this.materialAccesibilizadoId) {
      this.materialAccesibilizadoId.setValue($event.item.id);
      this.materialAccesibilizadoId.markAsTouched();
    }
  }

  protected onBlurMaterialAccesibilizado() {
    this.materialAccesibilizadoId?.markAsTouched();
  }
}
