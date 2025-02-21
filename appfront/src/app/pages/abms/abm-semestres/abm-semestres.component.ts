import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {DatatablesServersideRequest} from '../../../services/data/datatables/datatables-serverside-request';
import {map} from 'rxjs';
import {SemestresService} from '../../../services/data/semestres/semestres.service';

@Component({
  selector: 'app-abm-semestres',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-semestres.component.html',
  styleUrl: './abm-semestres.component.scss'
})
export class AbmSemestresComponent implements OnInit {
  public dtOptions: Config = {};

  public constructor(
    private readonly semestresService: SemestresService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = this.datatablesService.getOptions([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Año', data: 'anio', name: 'anio',},
      {
        title: '1° Semestre', data: 'esPrimerSemestre', name: 'esPrimerSemestre',
        render: data => data ? 'Sí' : 'No',
      },
    ], (params: DatatablesServersideRequest, callback: (data: any) => void) => {
      __this.semestresService
        .getSemestres(this.datatablesService.getPageFromDatatablesParams(params))
        .pipe(
          map(apiResponse => this.datatablesService.getPageFromApiResponse(params, apiResponse))
        )
        .subscribe(data => {
          callback(data);
        });
    });
  }
}
