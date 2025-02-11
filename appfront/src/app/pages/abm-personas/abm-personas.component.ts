import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {Config} from 'datatables.net';
import {PersonasService} from '../../services/data/personas/personas.service';
import {PageHeadingComponent} from '../../components/page-heading/page-heading.component';

@Component({
  selector: 'app-abm-personas',
  imports: [DataTablesModule, PageHeadingComponent],
  templateUrl: './abm-personas.component.html',
  styleUrl: './abm-personas.component.scss'
})
export class AbmPersonasComponent implements OnInit {
  public dtOptions: Config = {};

  public constructor(
    private readonly personasService: PersonasService
  ) {
  }

  public ngOnInit(): void {
    const __this = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        // FIXME: usar dataTablesParameters
        __this.personasService.getPersonas().subscribe(personas => {
          callback({
            recordsTotal: personas.length,
            // recordsFiltered: resp.recordsFiltered,
            data: personas
          });
        });
      },
      columns: [
        {
          title: 'ID',
          data: 'id'
        }, {
          title: 'Nombre',
          data: 'nombre'
        }, {
          title: 'Apellido',
          data: 'apellido'
        }, {
          title: 'DNI',
          data: 'dni'
        }, {
          title: 'Teléfono',
          data: 'telefono'
        }, {
          title: 'E-mail',
          data: 'email'
        }
      ]
    };
  }
}
