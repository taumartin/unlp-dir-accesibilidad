import {Component} from '@angular/core';
import {faBars, faSearch, faBell, faEnvelope, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/ui/sidebar/sidebar.service';

@Component({
  selector: 'app-topbar',
  imports: [FontAwesomeModule, NgbDropdownModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  protected iconBars = faBars;
  protected iconSearch = faSearch;
  protected iconAlerts = faBell;
  protected iconMessages = faEnvelope;
  protected iconFiles = faFileAlt;

  constructor(
    private readonly sidebarService: SidebarService
  ) {
  }

  protected toggleSideNavigation(): void {
    this.sidebarService.toggleEvent.emit();
  }
}
