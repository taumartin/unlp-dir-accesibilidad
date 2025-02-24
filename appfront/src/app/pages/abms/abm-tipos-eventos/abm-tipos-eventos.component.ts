import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {TiposEventosService} from '../../../services/data/tipos-eventos/tipos-eventos.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";

@Component({
  selector: 'app-abm-tipos-eventos',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-tipos-eventos.component.html',
  styleUrl: './abm-tipos-eventos.component.scss'
})
export class AbmTiposEventosComponent implements OnInit {
  protected dtOptions: Config = {};
  protected labels = {
    title: 'ABM Tipos de Eventos',
  }

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
