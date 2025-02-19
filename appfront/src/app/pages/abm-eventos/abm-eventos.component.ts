import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {MateriasService} from '../../services/data/materias/materias.service';
import {DatatablesService} from '../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
import {EventosService} from '../../services/data/eventos/eventos.service';

@Component({
  selector: 'app-abm-eventos',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.scss'
})
export class AbmEventosComponent implements OnInit {
  public dtOptions: Config = {};

  public constructor(
    private readonly eventosService: EventosService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {
        title: 'Fecha', data: '_timestamp', name: 'fechaYHora',
        render: data => data.toLocaleTimeString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }, // FIXME: ordena mal al ir contra el API...
      {title: 'Descripción', data: 'descripcion', name: 'descripcion',},
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.eventosService
        .getEventos(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
