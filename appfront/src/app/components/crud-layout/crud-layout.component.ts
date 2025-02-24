import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {PageHeadingComponent} from '../page-heading/page-heading.component';
import {Config, ConfigColumns} from 'datatables.net';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgTemplateOutlet} from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ApiPageRequest} from '../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../services/network/api/api-response-page';
import {DatatablesService} from '../../services/data/datatables/datatables.service';

@Component({
  selector: 'app-crud-layout',
  imports: [
    DataTablesModule,
    PageHeadingComponent,
    FaIconComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './crud-layout.component.html',
  styleUrl: './crud-layout.component.scss'
})
export class CrudLayoutComponent<T> implements OnInit {
  protected iconCreate = faPlus;
  protected dtOptions: Config = {};

  @Input()
  public labels: { [key: string]: string; } = {};
  @Input()
  public dtColumns!: ConfigColumns[];
  @Input()
  public dtSource!: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<T>>;
  @Input()
  public createModalTemplate?: TemplateRef<any>;
  @Input()
  public formInvalid: boolean = true;
  @Input()
  public isProcessing: boolean = false;

  @Output()
  public createEntity = new EventEmitter<NgbModalRef>();
  @Output()
  public entitySaved = new EventEmitter<NgbModalRef>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly datatablesService: DatatablesService,
  ) {
  }

  private onRowClick(dataRow: T, rowIndex: number): void {
    // TODO: lanzar evento al host para popular el form, abrir modal...
    console.log("rowcallback", dataRow, rowIndex);
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide(this.dtColumns, this.dtSource,
      (data: T, index: number): void => this.onRowClick(data, index));
  }

  private openModal(modalTemplate: TemplateRef<any>, openedByButton: HTMLButtonElement): NgbModalRef {
    const modalRef = this.modalService.open(modalTemplate, {
      backdrop: 'static',
      keyboard: true,
      centered: true,
      size: "xl",
      modalDialogClass: 'modal-dialog-centered modal-dialog-scrollable',
    });
    modalRef.result.finally(() => {
      openedByButton.focus();
    });
    return modalRef;
  }

  protected dismissModal(modal: NgbModalRef, reason: string): void {
    modal.dismiss(reason);
  }

  protected onSaveEntity(modal: NgbModalRef): void {
    this.entitySaved.emit(modal);
  }

  protected openCreationModal(modalTemplate: TemplateRef<any>, btn: HTMLButtonElement): void {
    this.createEntity.emit(this.openModal(modalTemplate, btn));
  }
}
