import {Component} from '@angular/core';
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
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

interface NavLink {
  icon?: IconDefinition;
  label: string;
  route?: string;
  isCollapsed?: boolean;
  children?: NavLinkGroup[];
}

interface NavLinkGroup {
  heading?: string;
  navLinks: NavLink[];
}

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule, RouterLink, RouterLinkActive, NgbCollapse],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public toggled: boolean = false;
  public iconLeft: IconDefinition = faAngleLeft;
  public iconRight: IconDefinition = faAngleRight;
  public iconDown: IconDefinition = faAngleDown;

  public navLinkGroups: NavLinkGroup[] = [
    {
      navLinks: [
        {
          icon: faHome,
          label: 'Inicio',
          route: ''
        }
      ]
    },
    {
      heading: 'Interface',
      navLinks: [
        {
          icon: faCog,
          label: 'Components',
          isCollapsed: true,
          children: [
            {
              heading: 'Custom Components:',
              navLinks: [
                {
                  label: 'Buttons',
                  route: '',
                },
                {
                  label: 'Cards',
                  route: '',
                }
              ]
            },
          ]
        },
        {
          icon: faCog,
          label: 'Utilities',
          isCollapsed: true,
          children: [
            {
              heading: 'Custom Utilities:',
              navLinks: [
                {
                  label: 'Colors',
                  route: '',
                },
                {
                  label: 'Borders',
                  route: '',
                },
                {
                  label: 'Animations',
                  route: '',
                },
                {
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
      heading: 'Addons',
      navLinks: [
        {
          icon: faCog,
          label: 'Pages',
          isCollapsed: true,
          children: [
            {
              heading: 'Login Screens:',
              navLinks: [
                {
                  label: 'Login',
                  route: '',
                },
                {
                  label: 'Register',
                  route: '',
                },
                {
                  label: 'Forgot Password',
                  route: '',
                }
              ]
            },
            {
              heading: 'Other Pages:',
              navLinks: [
                {
                  label: '404 Page',
                  route: '',
                },
                {
                  label: 'Blank Page',
                  route: '',
                }
              ]
            }
          ]
        },
        {
          icon: faCog,
          label: 'Charts',
          route: ''
        },
        {
          icon: faCog,
          label: 'Tables',
          route: ''
        }
      ]
    }
  ];

  public toggleSideNavigation(): void {
    this.toggled = !this.toggled;
    if (this.toggled) {
      document.body.classList.add('sidebar-toggled');
      this.navLinkGroups
        .flatMap(navGroup => navGroup.navLinks)
        .filter(navLink => (navLink.isCollapsed === false))
        .forEach(navLink => {
          navLink.isCollapsed = true;
        });
    } else {
      document.body.classList.remove('sidebar-toggled');
    }
  }
}
