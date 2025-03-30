import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileModalComponent } from '../modals/profile-modal/profile-modal.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('loadPage', [
      transition(':enter', [
        style({
          transform: 'rotateY(180deg)',
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)' 
        }),
        animate(
          '0.8s ease-out',
          style({
            transform: 'rotateY(0)',
            opacity: 1,
            clipPath: 'inset(0 0 0 0)' 
          })
        )
      ])
    ])
  ]
})
export class HomeComponent {
  dialog = inject(MatDialog);
  authService = inject(AuthenticationService);
  router = inject(Router)
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  openProfileModal() {
    this.dialog.open(ProfileModalComponent, {
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        image: 'assets/profile.jpg'
      }
    });
  }
}
