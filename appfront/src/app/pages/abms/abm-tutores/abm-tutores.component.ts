import {Component} from '@angular/core';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {GenericAbm} from '../generic-abm';
import {Tutor} from '../../../models/tutor';
import {FormService} from '../../../services/ui/form/form.service';
import {ToastService} from '../../../services/ui/toast/toast.service';
import {TutoresService} from '../../../services/data/tutores/tutores.service';
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-abm-tutores',
  imports: [
    CrudLayoutComponent,
    ReactiveFormsModule
  ],
  templateUrl: './abm-tutores.component.html',
  styleUrl: './abm-tutores.component.scss'
})
export class AbmTutoresComponent extends GenericAbm<Tutor> {
  public constructor(
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
      personaId: [3, [Validators.required]],
      usuarioId: [0, [Validators.required]],
      horasAsignadas: [0, [Validators.required, Validators.min(1), Validators.max(8), Validators.pattern(/^\d$/)]],
    });
  }

  protected get personaId() {
    return this.getFormControlByKey('personaId');
  }

  protected get usuarioId() {
    return this.getFormControlByKey('usuarioId');
  }

  protected get horasAsignadas() {
    return this.getFormControlByKey('horasAsignadas');
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
      usuarioId: model.usuarioId,
      horasAsignadas: model.horasAsignadas,
    };
  }
}
