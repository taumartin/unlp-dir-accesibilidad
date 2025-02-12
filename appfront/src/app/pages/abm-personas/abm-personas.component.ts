import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {Config} from 'datatables.net';
import {PersonasService} from '../../services/data/personas/personas.service';
import {PageHeadingComponent} from '../../components/page-heading/page-heading.component';
import {DatatablesService} from '../../services/data/datatables/datatables.service';
import {map} from 'rxjs';
import {DatatablesServersideRequest} from '../../services/data/datatables/datatables-serverside-request';

@Component({
  selector: 'app-abm-personas',
  imports: [DataTablesModule, PageHeadingComponent],
  templateUrl: './abm-personas.component.html',
  styleUrl: './abm-personas.component.scss'
})
export class AbmPersonasComponent implements OnInit {
  public dtOptions: Config = {};

  public constructor(
    private readonly personasService: PersonasService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Apellido', data: 'apellido', name: 'apellido',},
      {title: 'DNI', data: 'dni', name: 'dni',},
      {title: 'Teléfono', data: 'telefono', name: 'telefono',},
      {title: 'E-mail', data: 'email', name: 'email',}
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.personasService
        .getPersonas(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
