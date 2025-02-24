import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {TiposMaterialesService} from '../../../services/data/tipos-materiales/tipos-materiales.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {TipoMaterial} from '../../../models/tipo-material';

@Component({
  selector: 'app-abm-tipos-materiales',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-tipos-materiales.component.html',
  styleUrl: './abm-tipos-materiales.component.scss'
})
export class AbmTiposMaterialesComponent {
  protected labels = {
    title: 'ABM Tipos de Materiales',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Nombre', data: 'nombre', name: 'nombre'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<TipoMaterial>> = (pagReq) => this.tiposMaterialesService.getTiposMateriales(pagReq);

  public constructor(
    private readonly tiposMaterialesService: TiposMaterialesService,
  ) {
  }
}
