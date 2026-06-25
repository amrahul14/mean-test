import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';
  username = '';
  password = '';
  message = '';
  isError = false;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggle(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.message = '';
    this.username = '';
    this.password = '';
  }

  submit(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.message = 'Username and password are required';
      this.isError = true;
      return;
    }
    this.loading = true;
    this.message = '';

    if (this.mode === 'login') {
      this.authService.login(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/products']),
        error: err => {
          this.loading = false;
          this.message = err.error?.message || 'Login failed';
          this.isError = true;
        }
      });
    } else {
      this.authService.register(this.username, this.password).subscribe({
        next: res => {
          this.loading = false;
          this.message = res.message;
          this.isError = false;
          this.mode = 'login';
          this.username = '';
          this.password = '';
        },
        error: err => {
          this.loading = false;
          this.message = err.error?.message || 'Registration failed';
          this.isError = true;
        }
      });
    }
  }
}
