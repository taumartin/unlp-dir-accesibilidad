import {Component} from '@angular/core';
import {faBars, faSearch, faBell, faEnvelope, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-topbar',
  imports: [
    FontAwesomeModule,
    NgbDropdownModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  public iconBars = faBars;
  public iconSearch = faSearch;
  public iconAlerts = faBell;
  public iconMessages = faEnvelope;
  public iconFiles = faFileAlt;

  constructor(
    private readonly sidebarService: SidebarService
  ) {
  }

  public toggleSideNavigation(): void {
    this.sidebarService.toggleEvent.emit();
  }
}
