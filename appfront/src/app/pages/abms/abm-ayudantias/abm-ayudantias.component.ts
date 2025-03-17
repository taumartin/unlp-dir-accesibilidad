import {Component, OnDestroy, OnInit} from '@angular/core';
import {Semestre} from '../../../models/semestre';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {Tutor} from '../../../models/tutor';
import {SemestresService} from '../../../services/data/semestres/semestres.service';
import {TutoresService} from '../../../services/data/tutores/tutores.service';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {GenericAbm} from '../generic-abm';
import {Ayudantia} from '../../../models/ayudantia';
import {Materia} from '../../../models/materia';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {AyudantiasService} from '../../../services/data/ayudantias/ayudantias.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';

@Component({
  selector: 'app-abm-ayudantias',
  imports: [
    CrudLayoutComponent,
    ReactiveFormsModule,
    NgbTypeahead
  ],
  templateUrl: './abm-ayudantias.component.html',
  styleUrl: './abm-ayudantias.component.scss'
})
export class AbmAyudantiasComponent extends GenericAbm<Ayudantia> implements OnInit, OnDestroy {
  protected semestreFormatter = (s: Semestre) => `${s.anio}, (${s.esPrimerSemestre ? '1ro' : '2do'})`;
  protected searchSemestre = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.semestresService.listAll({
          search: term,
          orderBy: 'anio',
          orderDirection: 'desc',
          page: 1,
          pageSize: 20,
        }).pipe(
          map(page => page.data),
          catchError(() => of([]))
        );
      }));

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

  protected materiaFormatter = (m: Materia) => `${m.nombre}`;
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
    private readonly ayudantiasService: AyudantiasService,
    private readonly semestresService: SemestresService,
    private readonly tutoresService: TutoresService,
    private readonly materiasService: MateriasService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(ayudantiasService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {
        data: null,
        title: "Semestre",
        render: (data, type, row) => {
          return `${row.semestre.anio} (${row.semestre.es_primer_semestre ? '1ro' : '2do'})`;
        },
        className: 'text-center',
        name: '@semestre',
      },
      {
        data: null,
        title: "Tutor",
        render: (data, type, row) => {
          return `<p class="m-0">${row.tutor.persona.apellido}, ${row.tutor.persona.nombre}` +
            `<br><small class="fst-italic text-gray-700">DNI: ${row.tutor.persona.dni}</small></p>`;
        },
        name: '@tutor',
      },
      {title: "Materia", data: "materia.nombre", name: '@materia'},
    ], {
      title: 'ABM Ayudantías',
      creation: 'Nueva Ayudantía',
      edition: 'Ver/Editar Ayudantía',
    }, {
      semestreId: [0, [Validators.required]],
      _semestre: [null, [Validators.required]],
      tutorId: [0, [Validators.required]],
      _tutor: [null, [Validators.required]],
      materiaId: [0, [Validators.required]],
      _materia: [null, [Validators.required]],
    });
  }

  protected get semestreId() {
    return this.getFormControlByKey<number>('semestreId');
  }

  protected get _semestre() {
    return this.getFormControlByKey<Semestre>('_semestre');
  }

  protected get tutorId() {
    return this.getFormControlByKey<number>('tutorId');
  }

  protected get _tutor() {
    return this.getFormControlByKey<Tutor>('_tutor');
  }

  protected get materiaId() {
    return this.getFormControlByKey<number>('materiaId');
  }

  protected get _materia() {
    return this.getFormControlByKey<Materia>('_materia');
  }

  public ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this._semestre?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.semestreId?.touched) {
          this.semestreId.reset();
          this.semestreId.markAsTouched();
        }
        if (value && this._semestre?.touched && this.semestreId?.untouched) {
          this.semestreId.markAsTouched();
        }
      });
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

  protected getModified(formValues: Partial<Omit<Ayudantia, "id">>): Partial<Omit<Ayudantia, "id">> {
    return {
      semestreId: formValues.semestreId,
      tutorId: formValues.tutorId,
      materiaId: formValues.materiaId,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Ayudantia, "id">>): Omit<Ayudantia, "id"> {
    const {semestreId, tutorId, materiaId} = formValues;
    return {
      semestreId: Number(semestreId!),
      tutorId: Number(tutorId!),
      materiaId: Number(materiaId!),
    };
  }

  protected getPatchedValues(model: Ayudantia): any {
    return {
      semestreId: model.semestreId,
      _semestre: model.semestre!,
      tutorId: model.tutorId,
      _tutor: model.tutor!,
      materiaId: model.materiaId,
      _materia: model.materia!,
    };
  }

  protected onSelectSemestre($event: NgbTypeaheadSelectItemEvent<Semestre>) {
    if (this.semestreId) {
      this.semestreId.setValue($event.item.id);
      this.semestreId.markAsTouched();
    }
  }

  protected onBlurSemestre() {
    this.semestreId?.markAsTouched();
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
