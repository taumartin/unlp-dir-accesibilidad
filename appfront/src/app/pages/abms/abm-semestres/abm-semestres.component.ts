import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {PageHeadingComponent} from "../../../components/page-heading/page-heading.component";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
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
  protected dtOptions: Config = {};

  public constructor(
    private readonly semestresService: SemestresService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Año', data: 'anio', name: 'anio', className: 'text-center'},
      {
        title: '1° Semestre', data: 'esPrimerSemestre', name: 'esPrimerSemestre',
        render: data => data ? 'Sí' : 'No',
      },
    ], (pagReq) => this.semestresService.getSemestres(pagReq));
  }
}
