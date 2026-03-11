import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-outer">
      <div class="login-center">
        <div class="card shadow">
          <div class="card-body p-5">
            <h2 class="text-center mb-4">Iniciar Sesión</h2>
            
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email"
                  name="email"
                  [(ngModel)]="loginData.email"
                  required
                  #email="ngModel">
                <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
                  El email es requerido
                </div>
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password"
                  name="password"
                  [(ngModel)]="loginData.password"
                  required
                  #password="ngModel">
                <div class="invalid-feedback" *ngIf="password.invalid && password.touched">
                  La contraseña es requerida
                </div>
              </div>
              
              <div class="alert alert-danger" *ngIf="errorMessage">
                {{ errorMessage }}
              </div>
              
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  [disabled]="loading || loginForm.invalid">
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>
              </div>
            </form>
            
            <div class="text-center mt-3">
              <p>¿No tienes cuenta? <a routerLink="/register">Regístrate aquí</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-outer {
      min-height: 80vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
    }
    
    .login-center {
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .card {
      border: none;
      border-radius: 15px;
      width: 100%;
    }
    
    .form-control {
      border-radius: 8px;
      border: 2px solid #e9ecef;
      padding: 12px 15px;
    }
    
    .form-control:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(63, 81, 181, 0.25);
    }
    
    .btn-primary {
      border-radius: 8px;
      padding: 12px;
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        // Redirigir según el rol
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}