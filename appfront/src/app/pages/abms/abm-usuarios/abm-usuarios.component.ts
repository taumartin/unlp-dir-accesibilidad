import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
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
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Correo', data: 'correo', name: 'correo',},
      {
        title: 'Admin', data: 'esAdmin', name: 'esAdmin',
        render: data => data ? 'Sí' : 'No',
      },
      // TODO: agregar fotoDePerfil...
    ], (pagReq) => this.usuariosService.getUsuarios(pagReq));
  }
}
