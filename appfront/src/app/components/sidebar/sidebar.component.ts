import {Component, OnDestroy, OnInit} from '@angular/core';
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faHome,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgbAccordionModule, NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/sidebar.service';
import {debounceTime, fromEvent, Subscription} from 'rxjs';

interface NavLink {
  id: number;
  icon?: IconDefinition;
  label: string;
  route?: string;
  isCollapsed?: boolean;
  children?: NavLinkGroup[];
}

interface NavLinkGroup {
  id: number;
  heading?: string;
  navLinks: NavLink[];
}

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive, NgbCollapse, NgbAccordionModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  private toggleEventSubscription: Subscription | null = null;
  public toggled: boolean = false;

  private windowResizeSubscription: Subscription | null = null;

  public iconLeft: IconDefinition = faAngleLeft;
  public iconRight: IconDefinition = faAngleRight;
  public iconDown: IconDefinition = faAngleDown;

  public navLinkGroups: NavLinkGroup[] = [
    {
      id: 1,
      navLinks: [
        {
          id: 11,
          icon: faHome,
          label: 'Inicio',
          route: 'home'
        }
      ]
    },
    {
      id: 2,
      heading: 'Administración',
      navLinks: [
        {
          id: 21,
          icon: faCog,
          label: 'Datos',
          isCollapsed: true,
          children: [
            {
              id: 211,
              heading: 'ABM\'s:',
              navLinks: [
                {
                  id: 2111,
                  label: 'Personas',
                  route: 'abm/personas',
                },
                {
                  id: 2112,
                  label: 'Cards',
                  route: 'cards',
                }
              ]
            },
          ]
        },
        {
          id: 22,
          icon: faCog,
          label: 'Utilities',
          isCollapsed: true,
          children: [
            {
              id: 221,
              heading: 'Custom Utilities:',
              navLinks: [
                {
                  id: 2211,
                  label: 'Colors',
                  route: 'utils/colors',
                },
                {
                  id: 2212,
                  label: 'Borders',
                  route: 'utils/borders',
                },
                {
                  id: 2213,
                  label: 'Animations',
                  route: 'utils/animations',
                },
                {
                  id: 2214,
                  label: 'Other',
                  route: 'utils/other',
                }
              ]
            },
          ]
        }
      ]
    },
    {
      id: 3,
      heading: 'Addons',
      navLinks: [
        {
          id: 31,
          icon: faCog,
          label: 'Pages',
          isCollapsed: true,
          children: [
            {
              id: 311,
              heading: 'Login Screens:',
              navLinks: [
                {
                  id: 3111,
                  label: 'Login',
                  route: 'auth/login',
                },
                {
                  id: 3112,
                  label: 'Register',
                  route: 'auth/register',
                },
                {
                  id: 3113,
                  label: 'Forgot Password',
                  route: 'auth/forgot-password',
                }
              ]
            },
            {
              id: 312,
              heading: 'Other Pages:',
              navLinks: [
                {
                  id: 3121,
                  label: '404 Page',
                  route: 'error',
                },
                {
                  id: 3122,
                  label: 'Blank Page',
                  route: 'blank',
                }
              ]
            }
          ]
        },
        {
          id: 32,
          icon: faCog,
          label: 'Charts',
          route: 'chars'
        },
        {
          id: 33,
          icon: faCog,
          label: 'Tables',
          route: 'tables'
        }
      ]
    }
  ];

  constructor(
    private readonly sidebarService: SidebarService
  ) {
  }

  private closeNavLinks(): void {
    this.navLinkGroups
      .flatMap(navGroup => navGroup.navLinks)
      .filter(navLink => (navLink.isCollapsed === false))
      .forEach(navLink => {
        navLink.isCollapsed = true;
      });
  }

  public toggleSideNavigation(): void {
    this.toggled = !this.toggled;
    if (this.toggled) {
      document.body.classList.add('sidebar-toggled');
      this.closeNavLinks();
    } else {
      document.body.classList.remove('sidebar-toggled');
    }
  }

  private onWindowResize(screenWidth: number): void {
    if (screenWidth < 768) {
      this.closeNavLinks();
    }

    // Toggle the side navigation when window is resized below 480px
    if (screenWidth < 480 && !this.toggled) {
      this.toggleSideNavigation();
    }
  }

  public ngOnInit(): void {
    this.toggleEventSubscription = this.sidebarService.toggleEvent.subscribe(() => {
      this.toggleSideNavigation();
    });
    this.windowResizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(10))
      .subscribe(() => {
        this.onWindowResize(window.innerWidth);
      });
  }

  public ngOnDestroy(): void {
    if (this.toggleEventSubscription) {
      this.toggleEventSubscription.unsubscribe();
      this.toggleEventSubscription = null;
    }
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
      this.windowResizeSubscription = null;
    }
  }

  public toggleNavLinkItem(navLinkItem: NavLink): void {
    if (navLinkItem.isCollapsed === true) {
      const openLink = this.navLinkGroups
        .flatMap(navGroup => navGroup.navLinks)
        .find(navLink => (navLink.isCollapsed === false));
      if (openLink) {
        openLink.isCollapsed = true;
      }
    }
    navLinkItem.isCollapsed = !navLinkItem.isCollapsed;
  }
}
