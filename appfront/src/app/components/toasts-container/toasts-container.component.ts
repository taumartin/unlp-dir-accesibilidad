import {Component, OnDestroy} from '@angular/core';
import {ToastService} from '../../services/ui/toast/toast.service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {ToastInfo} from '../../services/ui/toast/toast-info';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-toasts-container',
  imports: [NgbToast, NgTemplateOutlet],
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.scss',
})
export class ToastsContainerComponent implements OnDestroy {
  constructor(
    private readonly toastService: ToastService,
  ) {
  }

  protected get toasts() {
    return this.toastService.toasts;
  }

  protected remove(toast: ToastInfo): void {
    this.toastService.remove(toast);
  }

  public ngOnDestroy(): void {
    this.toastService.clear();
  }
}
