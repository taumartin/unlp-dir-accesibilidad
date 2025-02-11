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

  public test_result: string | null = null;

  public async testApi() {
    const url = "http://localhost:3000/api/v1/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      return error.message;
    }
  }

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
    this.testApi().then((result) => { // FIXME: quitar..
      this.test_result = JSON.stringify(result);
    });
  }

  public ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }
}
