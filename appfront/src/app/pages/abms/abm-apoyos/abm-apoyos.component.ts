import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {AlumnosService} from '../../../services/data/alumnos/alumnos.service';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {Alumno} from '../../../models/alumno';
import {GenericAbm} from '../generic-abm';
import {Apoyo} from '../../../models/apoyo';
import {ApoyosService} from '../../../services/data/apoyos/apoyos.service';
import {Semestre} from '../../../models/semestre';
import {Tutor} from '../../../models/tutor';
import {SemestresService} from '../../../services/data/semestres/semestres.service';
import {TutoresService} from '../../../services/data/tutores/tutores.service';

@Component({
  selector: 'app-abm-apoyos',
  imports: [
    CrudLayoutComponent,
    FormsModule,
    NgbTypeahead,
    ReactiveFormsModule
  ],
  templateUrl: './abm-apoyos.component.html',
  styleUrl: './abm-apoyos.component.scss'
})
export class AbmApoyosComponent extends GenericAbm<Apoyo> implements OnInit, OnDestroy {
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

  protected relPersonaFormatter = (e: Tutor | Alumno) => `${e.persona?.apellido}, ${e.persona?.nombre}`;
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

  protected searchAlumno = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.alumnosService.listAll({
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

  private destroy$?: Subject<void>;

  public constructor(
    private readonly apoyosService: ApoyosService,
    private readonly semestresService: SemestresService,
    private readonly tutoresService: TutoresService,
    private readonly alumnosService: AlumnosService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(apoyosService, formService, toastService, [
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
      {
        data: null,
        title: "Alumno",
        render: (data, type, row) => {
          return `<p class="m-0">${row.alumno.persona.apellido}, ${row.alumno.persona.nombre}` +
            `<br><small class="fst-italic text-gray-700">Legajo: ${row.alumno.legajo}</small></p>`;
        },
        name: '@alumno',
      },
    ], {
      title: 'ABM Apoyos',
      creation: 'Nuevo Apoyo',
      edition: 'Ver/Editar Apoyo',
    }, {
      semestreId: [0, [Validators.required]],
      _semestre: [null, [Validators.required]],
      tutorId: [0, [Validators.required]],
      _tutor: [null, [Validators.required]],
      alumnoId: [0, [Validators.required]],
      _alumno: [null, [Validators.required]],
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

  protected get alumnoId() {
    return this.getFormControlByKey<number>('alumnoId');
  }

  protected get _alumno() {
    return this.getFormControlByKey<Alumno>('_alumno');
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
    this._alumno?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.alumnoId?.touched) {
          this.alumnoId.reset();
          this.alumnoId.markAsTouched();
        }
        if (value && this._alumno?.touched && this.alumnoId?.untouched) {
          this.alumnoId.markAsTouched();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  protected getModified(formValues: Partial<Omit<Apoyo, "id">>): Partial<Omit<Apoyo, "id">> {
    return {
      semestreId: formValues.semestreId,
      tutorId: formValues.tutorId,
      alumnoId: formValues.alumnoId,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Apoyo, "id">>): Omit<Apoyo, "id"> {
    const {semestreId, tutorId, alumnoId} = formValues;
    return {
      semestreId: Number(semestreId!),
      tutorId: Number(tutorId!),
      alumnoId: Number(alumnoId!),
    };
  }

  protected getPatchedValues(model: Apoyo): any {
    return {
      semestreId: model.semestreId,
      _semestre: model.semestre!,
      tutorId: model.tutorId,
      _tutor: model.tutor!,
      alumnoId: model.alumnoId,
      _alumno: model.alumno!,
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

  protected onSelectAlumno($event: NgbTypeaheadSelectItemEvent<Alumno>) {
    if (this.alumnoId) {
      this.alumnoId.setValue($event.item.id);
      this.alumnoId.markAsTouched();
    }
  }

  protected onBlurAlumno() {
    this.alumnoId?.markAsTouched();
  }
}
