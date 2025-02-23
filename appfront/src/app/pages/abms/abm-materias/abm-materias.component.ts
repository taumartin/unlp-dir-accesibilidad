import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {PageHeadingComponent} from '../../../components/page-heading/page-heading.component';
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {MateriasService} from '../../../services/data/materias/materias.service';

@Component({
  selector: 'app-abm-materias',
  imports: [
    DataTablesModule,
    PageHeadingComponent
  ],
  templateUrl: './abm-materias.component.html',
  styleUrl: './abm-materias.component.scss'
})
export class AbmMateriasComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly materiasService: MateriasService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Docentes', data: 'docentes', name: 'docentes',},
      {title: 'Contacto', data: 'contacto', name: 'contacto',},
    ], (pagReq) => this.materiasService.getMaterias(pagReq));
  }
}
