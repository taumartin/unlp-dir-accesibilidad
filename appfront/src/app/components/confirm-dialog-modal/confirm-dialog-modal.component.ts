import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog-modal',
  imports: [],
  templateUrl: './confirm-dialog-modal.component.html',
  styleUrl: './confirm-dialog-modal.component.scss'
})
export class ConfirmDialogModalComponent {
  @Input()
  public message: string = 'Por favor, confirma la operación para continuar.';

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  protected confirm(): void {
    this.activeModal.close('CONFIRMED');
  }

  protected dismiss(reason: string): void {
    this.activeModal.dismiss(reason);
  }
}
