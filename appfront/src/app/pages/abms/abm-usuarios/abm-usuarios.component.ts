import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {UsuariosService} from '../../../services/data/usuarios/usuarios.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {Usuario} from '../../../models/usuario';

@Component({
  selector: 'app-abm-usuarios',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-usuarios.component.html',
  styleUrl: './abm-usuarios.component.scss'
})
export class AbmUsuariosComponent {
  protected labels = {
    title: 'ABM Usuarios',
  }
  protected readonly dtColumns: ConfigColumns[] = [
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
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Usuario>> = (pagReq) => this.usuariosService.getUsuarios(pagReq);

  public constructor(
    private readonly usuariosService: UsuariosService,
  ) {
  }
}
