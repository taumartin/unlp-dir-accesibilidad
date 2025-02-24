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
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/ui/sidebar/sidebar.service';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/core/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastService} from '../../services/ui/toast/toast.service';
import {NgOptimizedImage} from '@angular/common';

const REDIRECT_PATH_AFTER_LOGOUT = '/';
const DEFAULT_DISPLAY_NAME = 'Invitado';
const DEFAULT_USER_PROFILE = '/assets/img/undraw_profile.svg';

@Component({
  selector: 'app-topbar',
  imports: [FontAwesomeModule, NgbDropdownModule, NgOptimizedImage, RouterLink],
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
  protected iconLogin = faSignInAlt;

  // VERSION 2.0: habilitar estas funciones
  protected showSearchBar = false;
  protected showNotifications = false;
  protected showMessages = false;
  protected showUserPages = false;

  protected isUserLoggedIn: boolean = false;
  protected userDisplayName: string = DEFAULT_DISPLAY_NAME;
  protected userProfilePhoto: string = DEFAULT_USER_PROFILE;

  private readonly destroy$: Subject<void> = new Subject<void>();

  private isDoingLogout: boolean = false;
  private isGettingUserProfile: boolean = false;

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

  private onUserAuthChange(isUserLoggedIn: boolean): void {
    this.isUserLoggedIn = isUserLoggedIn;
    if (this.isUserLoggedIn && !this.isGettingUserProfile) {
      this.getUserProfile();
    }
  }

  public ngOnInit(): void {
    this.onUserAuthChange(this.authService.isLoggedIn());
    this.authService.userAuthChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoggedIn => {
        this.onUserAuthChange(isLoggedIn);
      });
  }

  private doLogout(): void {
    this.isDoingLogout = true;
    this.authService.logout().subscribe({
      next: result => {
        if (result.success) {
          this.router.navigate([REDIRECT_PATH_AFTER_LOGOUT]);
          this.toastService.showSuccessToast({body: result.message});
        } else {
          this.toastService.showErrorToast({body: result.message});
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

  private getUserProfile(): void {
    this.isGettingUserProfile = true;
    this.authService.me().subscribe({
      next: result => {
        this.userDisplayName = result.success ? result.data.displayName : DEFAULT_DISPLAY_NAME;
        this.userProfilePhoto = (result.success && result.data.profilePhoto) ? result.data.profilePhoto : DEFAULT_USER_PROFILE;
      },
      complete: () => {
        this.isGettingUserProfile = false;
      }
    });
  }
}
