import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {BoxLayoutComponent} from './components/box-layout/box-layout.component';
import {ToastsContainerComponent} from './components/toasts-container/toasts-container.component';
import {AuthService} from './services/core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, BoxLayoutComponent, ToastsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public useBoxLayout = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root.firstChild;
      this.useBoxLayout = !!currentRoute?.data?.['useBoxLayout'];
    });
  }

  public ngOnInit(): void {
    this.authService.silentLogin();
  }
}
