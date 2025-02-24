import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import {PageHeadingComponent} from '../page-heading/page-heading.component';
import {Api, Config, ConfigColumns} from 'datatables.net';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgTemplateOutlet} from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ApiPageRequest} from '../../services/network/api/api-page-request';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../services/network/api/api-response-page';
import {DatatablesService} from '../../services/data/datatables/datatables.service';
import {ToastService} from '../../services/ui/toast/toast.service';

export interface CrudLayoutEntityModalOpenEvent<T> {
  entity?: T;
  rowIndex?: number;
  modal: NgbModalRef;
}

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
  protected isEditing = false;

  @ViewChild('entityModalTemplate')
  protected entityModalTemplate!: TemplateRef<any>;
  @ViewChild(DataTableDirective, {static: false})
  protected dtElement!: DataTableDirective;

  @Input()
  public labels: { [key: string]: string; } = {};
  @Input()
  public dtColumns!: ConfigColumns[];
  @Input()
  public dtSource!: (pagReq: ApiPageRequest) => Observable<ApiResponsePage<T>>;
  @Input()
  public entityModalBodyTemplate?: TemplateRef<any>;
  @Input()
  public formInvalid: boolean = true;
  @Input()
  public isProcessing: boolean = false;

  @Output()
  public entityModalOpen = new EventEmitter<CrudLayoutEntityModalOpenEvent<T>>();
  @Output()
  public entityModalDismiss = new EventEmitter<void>();
  @Output()
  public entityModalSave = new EventEmitter<NgbModalRef>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly datatablesService: DatatablesService,
    private readonly toastService: ToastService,
  ) {
  }

  private onRowClick(dataRow: T, rowIndex: number): void {
    this.isEditing = true;
    this.openEntityModal(dataRow, rowIndex);
  }

  private refreshTable(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: Api) => {
        dtInstance.ajax.reload(undefined, false);
      });
    }
  }

  public ngOnInit(): void {
    this.dtOptions = this.datatablesService.getOptionsServerSide(this.dtColumns, this.dtSource,
      this.entityModalBodyTemplate ? (data: T, index: number): void => this.onRowClick(data, index) : undefined);
  }

  private openEntityModal(entity?: T, rowIndex?: number): NgbModalRef {
    const modal = this.modalService.open(this.entityModalTemplate, {
      backdrop: 'static',
      keyboard: true,
      centered: true,
      size: "xl",
      modalDialogClass: 'modal-dialog-centered modal-dialog-scrollable',
    });
    this.entityModalOpen.emit({entity, modal, rowIndex});
    modal.result
      .then(() => {
        this.refreshTable();
      })
      .catch(dismissReason => {
        if (![1, 'CANCELLED', 'CLOSED'].includes(dismissReason)) {
          this.toastService.showStandardToast({body: 'Sucedió un error y en consecuencia se cerró la ventana modal.'});
        }
      });
    return modal;
  }

  protected dismissModal(modal: NgbModalRef, reason: string): void {
    modal.dismiss(reason);
    this.entityModalDismiss.emit();
  }

  protected openEntityModalForCreation(btn: HTMLButtonElement): void {
    this.isEditing = false;
    const modal = this.openEntityModal();
    modal.result.finally(() => {
      btn.focus();
    });
  }

  protected onSaveEntity(modal: NgbModalRef): void {
    this.entityModalSave.emit(modal);
  }
}
