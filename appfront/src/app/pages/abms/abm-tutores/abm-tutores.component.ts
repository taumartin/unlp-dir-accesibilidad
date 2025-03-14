import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {GenericAbm} from '../generic-abm';
import {Tutor} from '../../../models/tutor';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {TutoresService} from '../../../services/data/tutores/tutores.service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {Persona} from '../../../models/persona';
import {Usuario} from '../../../models/usuario';
import {UsuariosService} from '../../../services/data/usuarios/usuarios.service';

@Component({
  selector: 'app-abm-tutores',
  imports: [
    CrudLayoutComponent,
    ReactiveFormsModule,
    NgbTypeahead
  ],
  templateUrl: './abm-tutores.component.html',
  styleUrl: './abm-tutores.component.scss'
})
export class AbmTutoresComponent extends GenericAbm<Tutor> implements OnInit, OnDestroy {
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

  protected usuarioFormatter = (u: Usuario) => u.correo;
  protected searchUsuario = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return of([]);
        }
        return this.usuariosService.listAll({
          search: term,
          orderBy: 'correo',
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
    private readonly usuariosService: UsuariosService,
    tutoresService: TutoresService,
    formService: FormService,
    toastService: ToastService,
  ) {
    super(tutoresService, formService, toastService, [
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Apellido', data: 'persona.apellido', name: '$persona.apellido$'},
      {title: 'Nombre', data: 'persona.nombre', name: '$persona.nombre$'},
      {title: 'Usuario', data: 'usuario.correo', name: '$usuario.correo$'},
      {title: 'Horas Asignadas', data: 'horasAsignadas', name: 'horasAsignadas', className: 'text-center'},
    ], {
      title: 'ABM Tutores',
      creation: 'Nuevo Tutor',
      edition: 'Ver/Editar Tutor',
    }, {
      personaId: [0, [Validators.required]],
      _persona: [null, [Validators.required]],
      usuarioId: [0, [Validators.required]],
      _usuario: [null, [Validators.required]],
      horasAsignadas: [0, [Validators.required, Validators.min(1), Validators.max(8), Validators.pattern(/^\d$/)]],
    });
  }

  protected get personaId() {
    return this.getFormControlByKey<number>('personaId');
  }

  protected get _persona() {
    return this.getFormControlByKey<Persona>('_persona');
  }

  protected get usuarioId() {
    return this.getFormControlByKey<number>('usuarioId');
  }

  protected get _usuario() {
    return this.getFormControlByKey<Usuario>('_usuario');
  }

  protected get horasAsignadas() {
    return this.getFormControlByKey<number>('horasAsignadas');
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
    this._usuario?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (!value && this.usuarioId?.touched) {
          this.usuarioId.reset();
          this.usuarioId.markAsTouched();
        }
        if (value && this._usuario?.touched && this.usuarioId?.untouched) {
          this.usuarioId.markAsTouched();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  protected getModified(formValues: Partial<Omit<Tutor, "id">>): Partial<Omit<Tutor, "id">> {
    return {
      personaId: formValues.personaId,
      usuarioId: formValues.usuarioId,
      horasAsignadas: formValues.horasAsignadas,
    };
  }

  protected getNewModel(formValues: Partial<Omit<Tutor, "id">>): Omit<Tutor, "id"> {
    const {personaId, usuarioId, horasAsignadas} = formValues;
    return {
      personaId: Number(personaId!),
      usuarioId: Number(usuarioId!),
      horasAsignadas: horasAsignadas!,
    };
  }

  protected getPatchedValues(model: Tutor): any {
    return {
      personaId: model.personaId,
      _persona: model.persona!,
      usuarioId: model.usuarioId,
      _usuario: model.usuario!,
      horasAsignadas: model.horasAsignadas,
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

  protected onSelectUsuario($event: NgbTypeaheadSelectItemEvent<Usuario>) {
    if (this.usuarioId) {
      this.usuarioId.setValue($event.item.id);
      this.usuarioId.markAsTouched();
    }
  }

  protected onBlurUsuario() {
    this.usuarioId?.markAsTouched();
  }
}
