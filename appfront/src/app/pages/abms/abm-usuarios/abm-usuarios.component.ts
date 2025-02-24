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
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Usuario', data: 'nombre', name: 'nombre'},
      {title: 'E-mail', data: 'correo', name: 'correo'},
      {
        title: 'Admin', data: 'esAdmin', name: 'esAdmin', className: 'text-center',
        render: data => data ? 'Sí' : 'No',
      },
      {
        title: 'Avatar', data: 'fotoDePerfil', name: 'fotoDePerfil', className: 'text-center',
        render: data => data ? `<img src="${data}" alt="Avatar " class="img-data-avatar">` : null,
      },
    ], (pagReq) => this.usuariosService.getUsuarios(pagReq));
  }
}
