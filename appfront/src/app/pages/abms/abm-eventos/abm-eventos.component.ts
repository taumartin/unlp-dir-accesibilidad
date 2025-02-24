import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {EventosService} from '../../../services/data/eventos/eventos.service';

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
  protected dtOptions: Config = {};

  public constructor(
    private readonly eventosService: EventosService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
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
    ], (pagReq) => this.eventosService.getEventos(pagReq));
  }
}
