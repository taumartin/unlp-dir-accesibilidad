import {Injectable} from '@angular/core';
import {ConfirmDialogModalComponent} from '../../../components/confirm-dialog-modal/confirm-dialog-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private readonly modalService: NgbModal,
  ) {
  }

  public async openConfirmDialog(message: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogModalComponent, {backdrop: 'static', keyboard: true});
    modalRef.componentInstance.message = message;
    try {
      let result = await modalRef.result;
      return (result === 'CONFIRMED');
    } catch (e) {
      return false;
    }
  }
}
