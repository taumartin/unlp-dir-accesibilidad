import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {PageHeadingComponent} from '../../../components/page-heading/page-heading.component';
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
import {MateriasService} from '../../../services/data/materias/materias.service';

@Component({
  selector: 'app-abm-materias',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-materias.component.html',
  styleUrl: './abm-materias.component.scss'
})
export class AbmMateriasComponent implements OnInit {
  public dtOptions: Config = {};

  public constructor(
    private readonly materiasService: MateriasService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Docentes', data: 'docentes', name: 'docentes',},
      {title: 'Contacto', data: 'contacto', name: 'contacto',},
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.materiasService
        .getMaterias(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
