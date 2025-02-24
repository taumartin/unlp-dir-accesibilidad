import {Component, OnInit} from '@angular/core';
import {DataTablesModule} from "angular-datatables";
import {Config} from 'datatables.net';
import {DatatablesService} from '../../../services/data/datatables/datatables.service';
import {MediosComunicacionService} from '../../../services/data/medios-comunicacion/medios-comunicacion.service';
import {CrudLayoutComponent} from '../../../components/crud-layout/crud-layout.component';

@Component({
  selector: 'app-abm-medios-comunicacion',
  imports: [DataTablesModule, CrudLayoutComponent],
  templateUrl: './abm-medios-comunicacion.component.html',
  styleUrl: './abm-medios-comunicacion.component.scss'
})
export class AbmMediosComunicacionComponent implements OnInit {
  protected dtOptions: Config = {};
  protected labels = {
    title: 'ABM Medios de Comunicación',
  }

  public constructor(
    private readonly mediosComunicacionService: MediosComunicacionService,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide([
      {title: 'ID', data: 'id', name: 'id', className: 'text-start'},
      {title: 'Nombre', data: 'nombre', name: 'nombre'},
    ], (pagReq) => this.mediosComunicacionService.getMediosComunicacion(pagReq));
  }
}
