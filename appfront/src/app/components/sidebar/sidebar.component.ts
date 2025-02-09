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
          route: ''
        }
      ]
    },
    {
      id: 2,
      heading: 'Interface',
      navLinks: [
        {
          id: 21,
          icon: faCog,
          label: 'Components',
          isCollapsed: true,
          children: [
            {
              id: 211,
              heading: 'Custom Components:',
              navLinks: [
                {
                  id: 2111,
                  label: 'Buttons',
                  route: '',
                },
                {
                  id: 2112,
                  label: 'Cards',
                  route: '',
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
                  route: '',
                },
                {
                  id: 2212,
                  label: 'Borders',
                  route: '',
                },
                {
                  id: 2213,
                  label: 'Animations',
                  route: '',
                },
                {
                  id: 2214,
                  label: 'Other',
                  route: '',
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
                  route: '',
                },
                {
                  id: 3112,
                  label: 'Register',
                  route: '',
                },
                {
                  id: 3113,
                  label: 'Forgot Password',
                  route: '',
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
                  route: '',
                },
                {
                  id: 3122,
                  label: 'Blank Page',
                  route: '',
                }
              ]
            }
          ]
        },
        {
          id: 32,
          icon: faCog,
          label: 'Charts',
          route: ''
        },
        {
          id: 33,
          icon: faCog,
          label: 'Tables',
          route: ''
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
}
