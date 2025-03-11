import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {TiposEventosService} from '../../../services/data/tipos-eventos/tipos-eventos.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {TipoEvento} from '../../../models/tipo-evento';

@Component({
  selector: 'app-abm-tipos-eventos',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-tipos-eventos.component.html',
  styleUrl: './abm-tipos-eventos.component.scss'
})
export class AbmTiposEventosComponent {
  protected labels = {
    title: 'ABM Tipos de Eventos',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Nombre', data: 'nombre', name: 'nombre'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<TipoEvento>> = (pagReq) => this.tiposEventosService.listAll(pagReq);

  public constructor(
    private readonly tiposEventosService: TiposEventosService,
  ) {
  }
}
