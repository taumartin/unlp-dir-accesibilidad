import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenericAbm} from '../generic-abm';
import {MaterialAccesibilizado} from '../../../models/material-accesibilizado';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Materia} from '../../../models/materia';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {TipoMaterial} from '../../../models/tipo-material';
import {TiposMaterialesService} from '../../../services/data/tipos-materiales/tipos-materiales.service';
import {
  MaterialesAccesibilizadosService
} from '../../../services/data/materiales-accesibilizados/materiales-accesibilizados.service';
import {DatesService} from '../../../services/data/dates/dates.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';

@Component({
  selector: 'app-abm-materiales-accesibilizados',
  imports: [
    CrudLayoutComponent,
    NgbTypeahead,
    ReactiveFormsModule
  ],
  templateUrl: './abm-materiales-accesibilizados.component.html',
  styleUrl: './abm-materiales-accesibilizados.component.scss'
})
export class AbmMaterialesAccesibilizadosComponent extends GenericAbm<MaterialAccesibilizado> implements OnInit, OnDestroy {
  protected materiaFormatter = (m: Materia) => m.nombre;
  protected searchMateria = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.materiasService.listAll({
          search: term,
          orderBy: 'nombre',
          orderDirection: 'desc',
          page: 1,
          pageSize: 20,
        }).pipe(
          map(page => page.data),
          catchError(() => of([]))
        );
      }));

  protected tipoMaterialFormatter = (t: TipoMaterial) => t.nombre;
  protected searchTipoMaterial = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.tiposMaterialesService.listAll({
          search: term,
          orderBy: 'nombre',
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
    private readonly materialesAccesibilizadosService: MaterialesAccesibilizadosService,
    private readonly materiasService: MateriasService,
    private readonly tiposMaterialesService: TiposMaterialesService,
    private readonly datesService: DatesService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(materialesAccesibilizadosService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Titulo', data: 'titulo', name: 'titulo'},
      {title: 'Link', data: 'link', name: 'link'},
      {
        title: 'Publicado', data: '_timestamp', name: 'fechaPublicacion', className: 'text-center',
        render: data => data.toLocaleTimeString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
      {title: 'Tipo', data: 'tipoMaterial.nombre', name: '@tipoMaterial'},
      {title: 'Materia', data: 'materia.nombre', name: '@materia'},
    ], {
      title: 'ABM Materiales Accesibilizados',
      creation: 'Nuevo Material Accesibilizado',
      edition: 'Ver/Editar Material Accesibilizado',
    }, {
      tipoMaterialId: [0, [Validators.required]],
      _tipoMaterial: [null, [Validators.required]],
      materiaId: [0, [Validators.required]],
      _materia: [null, [Validators.required]],
      fechaPublicacion: [null, [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      link: ['', [Validators.required, Validators.maxLength(255),
        Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/)]],
    });
  }

  protected get tipoMaterialId() {
    return this.getFormControlByKey<number>('tipoMaterialId');
  }

  protected get _tipoMaterial() {
    return this.getFormControlByKey<TipoMaterial>('_tipoMaterial');
  }

  protected get materiaId() {
    return this.getFormControlByKey<number>('materiaId');
  }

  protected get _materia() {
    return this.getFormControlByKey<Materia>('_materia');
  }

  protected get fechaPublicacion() {
    return this.getFormControlByKey<string>('fechaPublicacion');
  }

  protected get titulo() {
    return this.getFormControlByKey<string>('titulo');
  }

  protected get link() {
    return this.getFormControlByKey<string>('link');
  }

  public ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this._tipoMaterial?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.tipoMaterialId?.touched) {
          this.tipoMaterialId.reset();
          this.tipoMaterialId.markAsTouched();
        }
        if (value && this._tipoMaterial?.touched && this.tipoMaterialId?.untouched) {
          this.tipoMaterialId.markAsTouched();
        }
      });
    this._materia?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.materiaId?.touched) {
          this.materiaId.reset();
          this.materiaId.markAsTouched();
        }
        if (value && this._materia?.touched && this.materiaId?.untouched) {
          this.materiaId.markAsTouched();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  protected getModified(formValues: Partial<Omit<MaterialAccesibilizado, "id">>): Partial<Omit<MaterialAccesibilizado, "id">> {
    return {
      tipoMaterialId: formValues.tipoMaterialId,
      materiaId: formValues.materiaId,
      fechaPublicacion: formValues.fechaPublicacion,
      titulo: formValues.titulo ?? '',
      link: formValues.link ?? '',
    };
  }

  protected getNewModel(formValues: Partial<Omit<MaterialAccesibilizado, "id">>): Omit<MaterialAccesibilizado, "id"> {
    const {tipoMaterialId, materiaId, fechaPublicacion, titulo, link} = formValues;
    return {
      tipoMaterialId: Number(tipoMaterialId!),
      materiaId: Number(materiaId!),
      fechaPublicacion: this.datesService.inputStringToIsoString(fechaPublicacion!),
      titulo: titulo!,
      link: link!,
    };
  }

  protected getPatchedValues(model: MaterialAccesibilizado): any {
    return {
      tipoMaterialId: model.tipoMaterialId,
      _tipoMaterial: model.tipoMaterial!,
      materiaId: model.materiaId,
      _materia: model.materia!,
      fechaPublicacion: model._dateTimeString!,
      titulo: model.titulo,
      link: model.link,
    };
  }

  protected onSelectTipoMaterial($event: NgbTypeaheadSelectItemEvent<TipoMaterial>) {
    if (this.tipoMaterialId) {
      this.tipoMaterialId.setValue($event.item.id);
      this.tipoMaterialId.markAsTouched();
    }
  }

  protected onBlurTipoMaterial() {
    this.tipoMaterialId?.markAsTouched();
  }

  protected onSelectMateria($event: NgbTypeaheadSelectItemEvent<Materia>) {
    if (this.materiaId) {
      this.materiaId.setValue($event.item.id);
      this.materiaId.markAsTouched();
    }
  }

  protected onBlurMateria() {
    this.materiaId?.markAsTouched();
  }
}
