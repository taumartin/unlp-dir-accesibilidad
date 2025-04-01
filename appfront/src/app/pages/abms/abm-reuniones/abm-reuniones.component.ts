import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenericAbm} from '../generic-abm';
import {Reunion} from '../../../models/reunion';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {TutoresService} from '../../../services/data/tutores/tutores.service';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {Tutor} from '../../../models/tutor';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Alumno} from '../../../models/alumno';
import {AlumnosService} from '../../../services/data/alumnos/alumnos.service';
import {MedioComunicacion} from '../../../models/medio-comunicacion';
import {MediosComunicacionService} from '../../../services/data/medios-comunicacion/medios-comunicacion.service';
import {Materia} from '../../../models/materia';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {ReunionesService} from '../../../services/data/reuniones/reuniones.service';
import {DatesService} from '../../../services/data/dates/dates.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';

@Component({
  selector: 'app-abm-reuniones',
  imports: [
    CrudLayoutComponent,
    NgbTypeahead,
    ReactiveFormsModule
  ],
  templateUrl: './abm-reuniones.component.html',
  styleUrl: './abm-reuniones.component.scss'
})
export class AbmReunionesComponent extends GenericAbm<Reunion> implements OnInit, OnDestroy {
  protected medioComunicacionFormatter = (m: MedioComunicacion) => m.nombre;
  protected searchMedioComunicacion = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.mediosComunicacionService.listAll({
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

  private destroy$?: Subject<void>;

  public constructor(
    reunionesService: ReunionesService,
    private readonly mediosComunicacionService: MediosComunicacionService,
    private readonly tutoresService: TutoresService,
    private readonly alumnosService: AlumnosService,
    private readonly materiasService: MateriasService,
    private readonly datesService: DatesService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(reunionesService, formService, toastService, [
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
        title: "Alumno",
        render: (data, type, row) => {
          return `<p class="m-0">${row.alumno.persona.apellido}, ${row.alumno.persona.nombre}` +
            `<br><small class="fst-italic text-gray-700">Legajo: ${row.alumno.legajo}</small></p>`;
        },
        name: '@alumno',
      },
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
      {title: "Medio de Comunicación", data: "medioComunicacion.nombre", name: '@medioComunicacion'},
      {title: "Materia", data: "materia.nombre", name: '@materia'},
      // {title: 'Observaciones', data: 'observaciones', name: 'observaciones'},
    ], {
      title: 'ABM Reuniones',
      creation: 'Nueva Reunión',
      edition: 'Ver/Editar Reunión',
    }, {
      medioComunicacionId: [0, [Validators.required]],
      _medioComunicacion: [null, [Validators.required]],
      tutorId: [0, [Validators.required]],
      _tutor: [null, [Validators.required]],
      alumnoId: [0, [Validators.required]],
      _alumno: [null, [Validators.required]],
      materiaId: [0],
      _materia: [null],
      fechaYHora: [null, [Validators.required]],
      observaciones: ['', [Validators.maxLength(5_000)]],
    });
  }

  protected get medioComunicacionId() {
    return this.getFormControlByKey<number>('medioComunicacionId');
  }

  protected get _medioComunicacion() {
    return this.getFormControlByKey<MedioComunicacion>('_medioComunicacion');
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

  protected get materiaId() {
    return this.getFormControlByKey<number | null>('materiaId');
  }

  protected get _materia() {
    return this.getFormControlByKey<Materia>('_materia');
  }

  protected get fechaYHora() {
    return this.getFormControlByKey<string>('fechaYHora');
  }

  protected get observaciones() {
    return this.getFormControlByKey<string>('observaciones');
  }

  public ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this._medioComunicacion?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.medioComunicacionId?.touched) {
          this.medioComunicacionId.reset();
          this.medioComunicacionId.markAsTouched();
        }
        if (value && this._medioComunicacion?.touched && this.medioComunicacionId?.untouched) {
          this.medioComunicacionId.markAsTouched();
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
    this._materia?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Materia | string) => {
        if ((value === "") || (!value && this.materiaId?.touched)) {
          this.materiaId?.reset(null);
          this.materiaId?.markAsTouched();
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

  protected getModified(formValues: Partial<Omit<Reunion, "id">>): Partial<Omit<Reunion, "id">> {
    return {
      medioComunicacionId: formValues.medioComunicacionId,
      tutorId: formValues.tutorId,
      alumnoId: formValues.alumnoId,
      materiaId: formValues.materiaId ?? null,
      fechaYHora: formValues.fechaYHora,
      observaciones: formValues.observaciones,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Reunion, "id">>): Omit<Reunion, "id"> {
    const {medioComunicacionId, tutorId, alumnoId, materiaId, fechaYHora, observaciones} = formValues;
    return {
      medioComunicacionId: Number(medioComunicacionId!),
      tutorId: Number(tutorId!),
      alumnoId: Number(alumnoId!),
      materiaId: materiaId || null,
      fechaYHora: this.datesService.inputStringToIsoString(fechaYHora!),
      observaciones: observaciones ?? '',
    };
  }

  protected getPatchedValues(model: Reunion): any {
    return {
      medioComunicacionId: model.medioComunicacionId,
      _medioComunicacion: model.medioComunicacion!,
      tutorId: model.tutorId,
      _tutor: model.tutor!,
      alumnoId: model.alumnoId,
      _alumno: model.alumno!,
      materiaId: model.materiaId,
      _materia: model.materia,
      fechaYHora: model._dateTimeString,
      observaciones: model.observaciones || '',
    };
  }

  protected onSelectMedioComunicacion($event: NgbTypeaheadSelectItemEvent<MedioComunicacion>) {
    if (this.medioComunicacionId) {
      this.medioComunicacionId.setValue($event.item.id);
      this.medioComunicacionId.markAsTouched();
    }
  }

  protected onBlurMedioComunicacion() {
    this.medioComunicacionId?.markAsTouched();
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
