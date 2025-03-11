import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {EventosService} from '../../../services/data/eventos/eventos.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {Evento} from '../../../models/evento';

@Component({
  selector: 'app-abm-eventos',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.scss'
})
export class AbmEventosComponent {
  protected labels = {
    title: 'ABM Eventos',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
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
    {title: 'Descripción', data: 'descripcion', name: 'descripcion'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Evento>> = (pagReq) => this.eventosService.listAll(pagReq);

  public constructor(
    private readonly eventosService: EventosService,
  ) {
  }
}
