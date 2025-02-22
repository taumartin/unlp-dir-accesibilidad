import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
import {TiposEventosService} from '../../../services/data/tipos-eventos/tipos-eventos.service';

@Component({
  selector: 'app-abm-tipos-eventos',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-tipos-eventos.component.html',
  styleUrl: './abm-tipos-eventos.component.scss'
})
export class AbmTiposEventosComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly tiposEventosService: TiposEventosService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.tiposEventosService
        .getTiposEventos(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
