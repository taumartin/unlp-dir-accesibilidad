import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {GenericAbm} from '../generic-abm';
import {Alumno} from '../../../models/alumno';
import {Persona} from '../../../models/persona';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {AlumnosService} from '../../../services/data/alumnos/alumnos.service';

@Component({
  selector: 'app-abm-alumnos',
  imports: [
    CrudLayoutComponent,
    NgbTypeahead,
    ReactiveFormsModule
  ],
  templateUrl: './abm-alumnos.component.html',
  styleUrl: './abm-alumnos.component.scss'
})
export class AbmAlumnosComponent extends GenericAbm<Alumno> implements OnInit, OnDestroy {
  protected personaFormatter = (p: Persona) => `${p.apellido}, ${p.nombre}`;
  protected searchPersona = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.personasService.listAll({
          search: term,
          orderBy: 'apellido',
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
    private readonly personasService: PersonasService,
    alumnosService: AlumnosService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(alumnosService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Apellido', data: 'persona.apellido', name: '$persona.apellido$'},
      {title: 'Nombre', data: 'persona.nombre', name: '$persona.nombre$'},
      {title: 'Legajo', data: 'legajo', name: 'legajo', className: 'text-center'},
      {
        title: 'Certificado', data: 'tieneCertificado', name: 'tieneCertificado', className: 'text-center',
        render: data => data ? 'Sí' : 'No',
      },
      {title: 'Situación', data: 'situacion', name: 'situacion'},
    ], {
      title: 'ABM Alumnos',
      creation: 'Nuevo Alumno',
      edition: 'Ver/Editar Alumno',
    }, {
      personaId: [0, [Validators.required]],
      _persona: [null, [Validators.required]],
      legajo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{4,6}\/\d$/)]],
      tieneCertificado: [false, []],
      situacion: ['', [Validators.maxLength(5_000)]],
    });
  }

  protected get personaId() {
    return this.getFormControlByKey<number>('personaId');
  }

  protected get _persona() {
    return this.getFormControlByKey<Persona>('_persona');
  }

  protected get legajo() {
    return this.getFormControlByKey<string>('legajo');
  }

  protected get tieneCertificado() {
    return this.getFormControlByKey<boolean>('tieneCertificado');
  }

  protected get situacion() {
    return this.getFormControlByKey<string>('situacion');
  }

  public ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this._persona?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.personaId?.touched) {
          this.personaId.reset();
          this.personaId.markAsTouched();
        }
        if (value && this._persona?.touched && this.personaId?.untouched) {
          this.personaId.markAsTouched();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  protected getModified(formValues: Partial<Omit<Alumno, "id">>): Partial<Omit<Alumno, "id">> {
    return {
      personaId: formValues.personaId,
      legajo: formValues.legajo,
      tieneCertificado: formValues.tieneCertificado,
      situacion: formValues.situacion,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Alumno, "id">>): Omit<Alumno, "id"> {
    const {personaId, legajo, tieneCertificado, situacion} = formValues;
    return {
      personaId: Number(personaId!),
      legajo: legajo!,
      tieneCertificado: Boolean(tieneCertificado),
      situacion: situacion ?? '',
    };
  }

  protected getPatchedValues(model: Alumno): any {
    return {
      personaId: model.personaId,
      _persona: model.persona!,
      legajo: model.legajo,
      tieneCertificado: model.tieneCertificado,
      situacion: model.situacion,
    };
  }

  protected onSelectPersona($event: NgbTypeaheadSelectItemEvent<Persona>) {
    if (this.personaId) {
      this.personaId.setValue($event.item.id);
      this.personaId.markAsTouched();
    }
  }

  protected onBlurPersona() {
    this.personaId?.markAsTouched();
  }
}
