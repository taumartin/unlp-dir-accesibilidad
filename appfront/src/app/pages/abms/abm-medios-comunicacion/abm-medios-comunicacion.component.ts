import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {MediosComunicacionService} from '../../../services/data/medios-comunicacion/medios-comunicacion.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {MedioComunicacion} from '../../../models/medio-comunicacion';

@Component({
  selector: 'app-abm-medios-comunicacion',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-medios-comunicacion.component.html',
  styleUrl: './abm-medios-comunicacion.component.scss'
})
export class AbmMediosComunicacionComponent {
  protected labels = {
    title: 'ABM Medios de Comunicación',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Nombre', data: 'nombre', name: 'nombre'},
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<MedioComunicacion>> = (pagReq) => this.mediosComunicacionService.getMediosComunicacion(pagReq);

  public constructor(
    private readonly mediosComunicacionService: MediosComunicacionService,
  ) {
  }
}
