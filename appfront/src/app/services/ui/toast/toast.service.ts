import {Injectable} from '@angular/core';
import {ToastInfo} from './toast-info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: ToastInfo[] = [];

  public maxVisibleToasts = 5;

  constructor() {
  }

  public show(toast: ToastInfo): void {
    if (this.toasts.length >= this.maxVisibleToasts) {
      const removeFirstToastDelay = 500;
      toast.delay = toast.delay + removeFirstToastDelay;
      setTimeout(() => {
        if (this.toasts.length > 0) {
          this.remove(this.toasts[0]);
        }
      }, removeFirstToastDelay);
    }
    this.toasts.push(toast);
  }

  public remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  public clear(count: number = 0) {
    this.toasts.splice(0, count || this.toasts.length);
  }

  private _createToast(body?: string, header?: string, classname: string = '', delay: number = 5_000, autohide: boolean = true): ToastInfo {
    return {header, body, classname, delay, autohide};
  }

  public showSuccessToast(message?: string, header?: string, delay: number = 3_000): ToastInfo {
    const toast = this._createToast(message, header, 'bg-success text-light', delay);
    this.show(toast);
    return toast;
  }

  public showErrorToast(message?: string, header?: string, delay: number = 10_000): ToastInfo {
    const toast = this._createToast(message, header, 'bg-danger text-light', delay);
    this.show(toast);
    return toast;
  }

  public showInfoToast(message?: string, header?: string, delay: number = 5_000): ToastInfo {
    const toast = this._createToast(message, header, 'bg-primary text-light', delay);
    this.show(toast);
    return toast;
  }

  public showWarningToast(message?: string, header?: string, delay: number = 5_000): ToastInfo {
    const toast = this._createToast(message, header, 'bg-warning text-light', delay);
    this.show(toast);
    return toast;
  }

  public showStandardToast(message?: string, header?: string, delay: number = 5_000): ToastInfo {
    const toast = this._createToast(message, header, '', delay);
    this.show(toast);
    return toast;
  }
}
