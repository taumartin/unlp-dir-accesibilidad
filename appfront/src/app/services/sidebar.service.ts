import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public toggleEvent = new EventEmitter<void>();

  constructor() {
  }
}
