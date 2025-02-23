import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {Config} from 'datatables.net';
import {PersonasService} from '../../../services/data/personas/personas.service';
import {PageHeadingComponent} from '../../../components/page-heading/page-heading.component';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';

@Component({
  selector: 'app-abm-personas',
  imports: [DataTablesModule, PageHeadingComponent],
  templateUrl: './abm-personas.component.html',
  styleUrl: './abm-personas.component.scss'
})
export class AbmPersonasComponent implements OnInit {
  protected dtOptions: Config = {};

  public constructor(
    private readonly personasService: PersonasService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id',},
      {title: 'Nombre', data: 'nombre', name: 'nombre',},
      {title: 'Apellido', data: 'apellido', name: 'apellido',},
      {title: 'DNI', data: 'dni', name: 'dni',},
      {title: 'Teléfono', data: 'telefono', name: 'telefono',},
      {title: 'E-mail', data: 'email', name: 'email',},
    ], (pagReq) => this.personasService.getPersonas(pagReq));
  }
}
