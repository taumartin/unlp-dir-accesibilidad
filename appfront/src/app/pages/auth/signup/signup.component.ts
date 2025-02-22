import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  protected googleIcon = faGoogle;
  protected facebookIcon = faFacebookF;
}
