import {Injectable} from '@angular/core';
import {ToastInfo} from './toast-info';
import {ToastOptions} from './toast-options';

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

  private _createToast(options: ToastOptions): ToastInfo {
    const {body, header, classname = '', closeBtnClassname = '', delay = 5_000, autohide = true} = options;
    return {header, body, classname, delay, autohide, closeBtnClassname};
  }

  public showSuccessToast(options: Omit<ToastOptions, 'classname' | 'closeBtnClassname'>): ToastInfo {
    const toast = this._createToast({
      ...options,
      classname: 'bg-success text-light',
      closeBtnClassname: 'btn-close-white',
      delay: options.delay ?? 3_000
    });
    this.show(toast);
    return toast;
  }

  public showErrorToast(options: Omit<ToastOptions, 'classname' | 'closeBtnClassname'>): ToastInfo {
    const toast = this._createToast({
      ...options,
      classname: 'bg-danger text-light',
      closeBtnClassname: 'btn-close-white',
      delay: options.delay ?? 10_000
    });
    this.show(toast);
    return toast;
  }

  public showInfoToast(options: Omit<ToastOptions, 'classname' | 'closeBtnClassname'>): ToastInfo {
    const toast = this._createToast({
      ...options,
      classname: 'bg-primary text-light',
      closeBtnClassname: 'btn-close-white',
      delay: options.delay ?? 5_000
    });
    this.show(toast);
    return toast;
  }

  public showWarningToast(options: Omit<ToastOptions, 'classname' | 'closeBtnClassname'>): ToastInfo {
    const toast = this._createToast({
      ...options,
      classname: 'text-bg-warning',
      delay: options.delay ?? 5_000
    });
    this.show(toast);
    return toast;
  }

  public showStandardToast(options: Omit<ToastOptions, 'classname' | 'closeBtnClassname'>): ToastInfo {
    const toast = this._createToast({
      ...options,
      delay: options.delay ?? 5_000
    });
    this.show(toast);
    return toast;
  }
}
