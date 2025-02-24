import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
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
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
    ], (pagReq) => this.tiposEventosService.getTiposEventos(pagReq));
  }
}
