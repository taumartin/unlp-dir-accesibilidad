import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {faAngleUp,} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {debounceTime, fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, FooterComponent, FaIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  public iconUp = faAngleUp;
  private scrollSubscription: Subscription | null = null;
  public showScrollTop: boolean = false;

  title = 'appfront';

  private onDocumentScroll(scrollDistance: number): void {
    this.showScrollTop = (scrollDistance > 100);
  }

  public scrollToTop(): void {
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
