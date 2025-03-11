import {Component} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {ConfigColumns} from 'datatables.net';
import {SemestresService} from '../../../services/data/semestres/semestres.service';
import {CrudLayoutComponent} from "../../../components/crud-layout/crud-layout.component";
import {ApiPageRequest} from '../../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../../services/network/api/api-response-page';
import {Semestre} from '../../../models/semestre';

@Component({
  selector: 'app-abm-semestres',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-semestres.component.html',
  styleUrl: './abm-semestres.component.scss'
})
export class AbmSemestresComponent {
  protected labels = {
    title: 'ABM Semestres',
  }
  protected readonly dtColumns: ConfigColumns[] = [
    {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
    {title: 'Año', data: 'anio', name: 'anio', className: 'text-center'},
    {
      title: '1° Semestre', data: 'esPrimerSemestre', name: 'esPrimerSemestre',
      render: data => data ? 'Sí' : 'No',
    },
  ];
  protected dtSource: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<Semestre>> = (pagReq) => this.semestresService.listAll(pagReq);

  public constructor(
    private readonly semestresService: SemestresService,
  ) {
  }
}
