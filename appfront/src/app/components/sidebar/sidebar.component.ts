import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faHome,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgbAccordionModule, NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {SidebarService} from '../../services/ui/sidebar/sidebar.service';
import {debounceTime, fromEvent, Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/core/auth/auth.service';

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
  protected toggled: boolean = false;

  protected iconLeft: IconDefinition = faAngleLeft;
  protected iconRight: IconDefinition = faAngleRight;
  protected iconDown: IconDefinition = faAngleDown;

  protected isUserLoggedIn: boolean = false;

  private readonly destroy$: Subject<void> = new Subject<void>();

  protected navLinkGroups: NavLinkGroup[] = [];

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService,
    private readonly eRef: ElementRef,
  ) {
  }

  private updateNavLinkGroups(): void {
    this.navLinkGroups = [
      {
        id: 1,
        navLinks: [
          {
            id: 11,
            icon: faHome,
            label: 'Inicio',
            route: 'home',
          }
        ],
      },
    ];

    if (this.isUserLoggedIn) {
      this.navLinkGroups.push(...[
        {
          id: 2,
          heading: 'Administración',
          navLinks: [
            {
              id: 21,
              icon: faDatabase,
              label: 'Datos',
              isCollapsed: true,
              children: [
                {
                  id: 211,
                  heading: 'ABM\'s:',
                  navLinks: [
                    {
                      id: 21101,
                      label: 'Personas',
                      route: 'abm/personas',
                    },
                    {
                      id: 21102,
                      label: 'Alumnos',
                      route: 'abm/alumnos',
                    },
                    {
                      id: 21103,
                      label: 'Tutores',
                      route: 'abm/tutores',
                    },
                    {
                      id: 21104,
                      label: 'Usuarios',
                      route: 'abm/usuarios',
                    },
                    {
                      id: 21105,
                      label: 'Eventos',
                      route: 'abm/eventos',
                    },
                    {
                      id: 21106,
                      label: 'Tipos de Eventos',
                      route: 'abm/tipos-eventos',
                    },
                    {
                      id: 21107,
                      label: 'Tipos de Materiales',
                      route: 'abm/tipos-materiales',
                    },
                    {
                      id: 21108,
                      label: 'Medios de Comunicación',
                      route: 'abm/medios-comunicacion',
                    },
                    {
                      id: 21109,
                      label: 'Materias',
                      route: 'abm/materias',
                    },
                    {
                      id: 21110,
                      label: 'Semestres',
                      route: 'abm/semestres',
                    },
                  ]
                },
              ],
            },
          ],
        },
      ]);
    }
  }

  private onUserAuthChange(isUserLoggedIn: boolean): void {
    this.isUserLoggedIn = isUserLoggedIn;
    this.updateNavLinkGroups();
  }

  private closeNavLinks(): void {
    this.navLinkGroups
      .flatMap(navGroup => navGroup.navLinks)
      .filter(navLink => (navLink.isCollapsed === false))
      .forEach(navLink => {
        navLink.isCollapsed = true;
      });
  }

  protected toggleSideNavigation(): void {
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
    this.sidebarService.toggleEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toggleSideNavigation();
      });

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(10))
      .subscribe(() => {
        this.onWindowResize(window.innerWidth);
      });

    this.onUserAuthChange(this.authService.isLoggedIn());
    this.authService.userAuthChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoggedIn => {
        this.onUserAuthChange(isLoggedIn);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private closeOpenLink(): void {
    const openLink = this.navLinkGroups
      .flatMap(navGroup => navGroup.navLinks)
      .find(navLink => (navLink.isCollapsed === false));
    if (openLink) {
      openLink.isCollapsed = true;
    }
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target) && this.toggled) {
      this.closeOpenLink();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if ((event.key === 'Escape') && this.toggled) {
      this.closeOpenLink();
    }
  }

  protected toggleNavLinkItem(navLinkItem: NavLink): void {
    if (navLinkItem.isCollapsed === true) {
      this.closeOpenLink();
    }
    navLinkItem.isCollapsed = !navLinkItem.isCollapsed;
  }

  protected onClickChildLinkOfAncestor(ancestor: NavLink): void {
    if (!ancestor.isCollapsed) {
      ancestor.isCollapsed = true;
    }
  }
}
