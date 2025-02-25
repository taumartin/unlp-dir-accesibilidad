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
import {DialogService} from '../../services/ui/dialog/dialog.service';

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
  protected isEntitySelected = false;

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
  public isSaving: boolean = false;
  @Input()
  public isDeleting: boolean = false;
  @Input()
  public isEntityModified: boolean = false;
  @Input()
  public isEditionEnabled: boolean = false;
  @Output()
  public isEditionEnabledChange = new EventEmitter<boolean>();

  private get isPendingChanges(): boolean {
    return this.isEntitySelected && this.isEntityModified;
  }

  protected get canDismissModal(): boolean {
    return !this.isSaving && !this.isDeleting;
  }

  @Output()
  public entityModalOpen = new EventEmitter<CrudLayoutEntityModalOpenEvent<T>>();
  @Output()
  public entityModalDismiss = new EventEmitter<void>();
  @Output()
  public entityModalSave = new EventEmitter<NgbModalRef>();
  @Output()
  public entityModalDelete = new EventEmitter<void>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly datatablesService: DatatablesService,
    private readonly toastService: ToastService,
    private readonly dialogService: DialogService,
  ) {
  }

  private setIsEditionEnabled(value: boolean): void {
    this.isEditionEnabled = value;
    this.isEditionEnabledChange.emit(this.isEditionEnabled);
  }

  private onRowClick(dataRow: T, rowIndex: number): void {
    this.isEntitySelected = true;
    this.setIsEditionEnabled(false);
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

  private triggerModalShake(): void {
    const modalWindow = document.querySelector('ngb-modal-window');
    if (modalWindow) {
      modalWindow.classList.add('modal-static');
      setTimeout(() => modalWindow.classList.remove('modal-static'), 200);
    }
  }

  private openEntityModal(entity?: T, rowIndex?: number): NgbModalRef {
    const modal = this.modalService.open(this.entityModalTemplate, {
      backdrop: 'static',
      keyboard: true,
      centered: true,
      size: "xl",
      beforeDismiss: () => {
        if (!this.canDismissModal) {
          this.triggerModalShake();
        }
        if (this.isPendingChanges) {
          return this.dialogService.openConfirmDialog('Se ha solicitado cerrar la ventana de edición, pero algunos datos fueron modificados y aún no han sido guardados.<br><br>' +
            'Si cierra la ventana se perderán las modificaciones no guardadas.<br><br>' +
            'Presiona <strong>«Aceptar»</strong> para descartar los cambios o <strong>«Cancelar»</strong> para seguir editando.');
        }
        return this.canDismissModal;
      },
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
    this.isEntitySelected = false;
    this.setIsEditionEnabled(false);
    const modal = this.openEntityModal();
    modal.result.finally(() => {
      btn.focus();
    });
  }

  protected onSaveEntity(modal: NgbModalRef): void {
    this.entityModalSave.emit(modal);
  }

  protected onDeleteEntity(): void {
    this.dialogService.openConfirmDialog('Se ha solicitado la eliminación del registro seleccionado y se requiere confirmación para continuar.<br><br>' +
      'Esta operación podría ser irreversible (<strong class="text-danger">la información no se podrá recuperar una vez eliminada</strong>).<br><br>' +
      'Presiona <strong>«Aceptar»</strong> para confirmar la operación de borrado.')
      .then((confirmed) => {
        if (confirmed) {
          this.entityModalDelete.emit();
        }
      });
  }

  public onEditToggle(): void {
    this.setIsEditionEnabled(!this.isEditionEnabled);
  }
}
