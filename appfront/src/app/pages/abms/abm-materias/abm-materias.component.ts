import {Component} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {ConfigColumns} from 'datatables.net';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {Materia} from '../../../models/materia';

@Component({
  selector: 'app-abm-materias',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-materias.component.html',
  styleUrl: './abm-materias.component.scss'
})
export class AbmMateriasComponent {
  protected labels = {
    title: 'ABM Materias',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Nombre', data: 'nombre', name: 'nombre'},
    {title: 'Docentes', data: 'docentes', name: 'docentes'},
    {title: 'Contacto', data: 'contacto', name: 'contacto'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Materia>> = (pagReq) => this.materiasService.listAll(pagReq);

  public constructor(
    private readonly materiasService: MateriasService,
  ) {
  }
}
