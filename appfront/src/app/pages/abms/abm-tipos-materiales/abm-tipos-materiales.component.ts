import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {TiposMaterialesService} from '../../../services/data/tipos-materiales/tipos-materiales.service';

@Component({
  selector: 'app-abm-tipos-materiales',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-tipos-materiales.component.html',
  styleUrl: './abm-tipos-materiales.component.scss'
})
export class AbmTiposMaterialesComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly tiposMaterialesService: TiposMaterialesService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
    ], (pagReq) => this.tiposMaterialesService.getTiposMateriales(pagReq));
  }
}
