import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {MediosComunicacionService} from '../../../services/data/medios-comunicacion/medios-comunicacion.service';

@Component({
  selector: 'app-abm-medios-comunicacion',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-medios-comunicacion.component.html',
  styleUrl: './abm-medios-comunicacion.component.scss'
})
export class AbmMediosComunicacionComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly mediosComunicacionService: MediosComunicacionService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
    ], (pagReq) => this.mediosComunicacionService.getMediosComunicacion(pagReq));
  }
}
