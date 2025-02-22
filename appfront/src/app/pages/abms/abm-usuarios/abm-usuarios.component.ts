import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {MateriasService} from '../../../services/data/materias/materias.service';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
import {UsuariosService} from '../../../services/data/usuarios/usuarios.service';

@Component({
  selector: 'app-abm-usuarios',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-usuarios.component.html',
  styleUrl: './abm-usuarios.component.scss'
})
export class AbmUsuariosComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly usuariosService: UsuariosService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Correo', data: 'correo', name: 'correo',},
      {
        title: 'Admin', data: 'esAdmin', name: 'esAdmin',
        render: data => data ? 'Sí' : 'No',
      },
      // TODO: agregar fotoDePerfil...
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.usuariosService
        .getUsuarios(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
