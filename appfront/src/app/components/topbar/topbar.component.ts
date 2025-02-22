import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  faBars,
  faSearch,
  faBell,
  faEnvelope,
  faFileAlt,
  faUser,
  faCogs,
  faList,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/ui/sidebar/sidebar.service';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/core/auth/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/ui/toast/toast.service';

const REDIRECT_PATH_AFTER_LOGOUT = '/';

@Component({
  selector: 'app-topbar',
  imports: [FontAwesomeModule, NgbDropdownModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit, OnDestroy {
  protected iconBars = faBars;
  protected iconSearch = faSearch;
  protected iconAlerts = faBell;
  protected iconMessages = faEnvelope;
  protected iconFiles = faFileAlt;
  protected iconProfile = faUser;
  protected iconSettings = faCogs;
  protected iconActivity = faList;
  protected iconLogout = faSignOutAlt;

  // FIXME: habilitar estas funciones en v2.
  protected showSearchBar = false;
  protected showNotifications = false;
  protected showMessages = false;
  protected showUserPages = false;

  protected isUserLoggedIn: boolean = false;

  private readonly destroy$: Subject<void> = new Subject<void>();

  private isDoingLogout: boolean = false;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {
  }

  protected toggleSideNavigation(): void {
    this.sidebarService.toggleEvent.emit();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.authService.userAuthChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoggedIn => {
        this.isUserLoggedIn = isLoggedIn;
      });
  }

  private doLogout(): void {
    this.isDoingLogout = true;
    this.authService.logout().subscribe({
      next: result => {
        if (result.success) {
          this.router.navigate([REDIRECT_PATH_AFTER_LOGOUT]);
          this.toastService.showSuccessToast(result.message);
        } else {
          this.toastService.showErrorToast(result.message);
        }
      },
      complete: () => {
        this.isDoingLogout = false;
      }
    });
  }

  public onLogoutClick(): void {
    if (this.isUserLoggedIn && !this.isDoingLogout) {
      this.doLogout();
    }
  }
}
