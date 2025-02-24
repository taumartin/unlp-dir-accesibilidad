import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {EventosService} from '../../../services/data/eventos/eventos.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';

@Component({
  selector: 'app-abm-eventos',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-eventos.component.html',
  styleUrl: './abm-eventos.component.scss'
})
export class AbmEventosComponent implements OnInit {
  protected dtOptions: Config = {};
  protected labels = {
    title: 'ABM Eventos',
  }

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
