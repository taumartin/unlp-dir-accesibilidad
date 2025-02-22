import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from '../footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {TopbarComponent} from '../topbar/topbar.component';
import {faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [
    FaIconComponent,
    FooterComponent,
    RouterOutlet,
    SidebarComponent,
    TopbarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  protected iconUp = faAngleUp;
  private scrollSubscription: Subscription | null = null;
  protected showScrollTop: boolean = false;

  private onDocumentScroll(scrollDistance: number): void {
    this.showScrollTop = (scrollDistance > 100);
  }

  protected scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  public ngOnInit(): void {
    this.scrollSubscription = fromEvent(document, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.onDocumentScroll(window.scrollY);
      });
  }

  public ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }
}
