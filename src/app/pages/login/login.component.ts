import { Component, Inject, inject,PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('flipCard', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'rotateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  authService = inject(AuthenticationService);
  @Inject(PLATFORM_ID) private platformId: any 
  constructor(private fb: FormBuilder, public router: Router) {
    // Initialize the reactive form with form controls and validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('authToken', response.token['result']);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.message;
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        }
      }
    });
  }

}
