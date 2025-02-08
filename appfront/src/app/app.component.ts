import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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

  public ngOnInit(): void {
    this.testApi().then((result) => {
      this.test_result = JSON.stringify(result);
    });
  }
}
