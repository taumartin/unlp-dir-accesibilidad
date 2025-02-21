import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
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
  public dtOptions: Config = {};

  public constructor(
    private readonly mediosComunicacionService: MediosComunicacionService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.mediosComunicacionService
        .getMediosComunicacion(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
