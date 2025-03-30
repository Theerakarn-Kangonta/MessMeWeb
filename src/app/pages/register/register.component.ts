import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('flipCard', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'rotateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  authService = inject(AuthenticationService);

  constructor(private fb: FormBuilder, public router: Router) {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      email: [null,],
      password: [null, Validators.required],
      role: ['user']
    });
  }
  onRegister() {
    if (this.registerForm.invalid) {
      return;
    } else {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message = 'User registered successfully') {
            localStorage.setItem('authToken', response.token);
            this.registerForm.reset();
            this.router.navigate(['/home']);
          } else {
            alert(response.message);
          }

        }
        , error: (error) => {
          alert(error.error.message || 'Registration failed. Please try again.');
          console.error('Registration error:', error);
        }
      })
    }
  }
}
