import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {PageHeadingComponent} from '../page-heading/page-heading.component';
import {Config} from 'datatables.net';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgTemplateOutlet} from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

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
export class CrudLayoutComponent {
  protected iconCreate = faPlus;

  @Input()
  public labels: { [key: string]: string; } = {};
  @Input()
  public dtOptions: Config = {};
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
  ) {
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
