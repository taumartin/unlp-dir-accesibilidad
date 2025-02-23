import {TemplateRef} from '@angular/core';

export interface ToastInfo {
  template?: TemplateRef<any>;
  header?: string;
  body?: string;
  classname: string;
  closeBtnClassname: string;
  delay: number;
  autohide: boolean;
}
