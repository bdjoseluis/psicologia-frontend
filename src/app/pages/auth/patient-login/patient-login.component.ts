import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <img src="/logo-devesan-2026.png" alt="Devesan" />
        </div>
        <h2>Accede a tu área</h2>
        <p class="auth-sub">Consulta y gestiona tus citas</p>

        <form (ngSubmit)="submit()" #f="ngForm">
          <div class="field">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="tu@email.com" />
          </div>
          <div class="field">
            <label>Contraseña</label>
            <div class="pw-wrap">
              <input [type]="showPw ? 'text' : 'password'" [(ngModel)]="password" name="password" required placeholder="••••••••" />
              <button type="button" class="eye-btn" (click)="showPw=!showPw">{{ showPw ? '🙈' : '👁️' }}</button>
            </div>
          </div>

          <div class="error-msg" *ngIf="error">{{ error }}</div>

          <button class="btn-gold" type="submit" [disabled]="loading || !email || !password">
            <span *ngIf="loading" class="spin">⟳</span>
            {{ loading ? 'Entrando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="auth-links">
          <span>¿Aún no tienes cuenta?</span>
          <a routerLink="/registro">Regístrate aquí</a>
        </div>
        <div class="auth-links">
          <a routerLink="/home">← Volver al inicio</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #fffbe7 0%, #f0ede0 100%);
      padding: 2rem 1rem;
    }
    .auth-card {
      background: #fff; border-radius: 20px; padding: 2.5rem 2rem;
      max-width: 420px; width: 100%;
      box-shadow: 0 8px 40px rgba(191,160,70,.13);
      text-align: center;
    }
    .auth-logo img { width: 90px; margin-bottom: 1rem; border-radius: 12px; }
    h2 { color: #232946; font-weight: 800; margin-bottom: .25rem; }
    .auth-sub { color: #6b7280; margin-bottom: 1.8rem; font-size: .95rem; }
    .field { text-align: left; margin-bottom: 1.2rem; }
    .field label { display: block; font-weight: 600; color: #374151; margin-bottom: .4rem; font-size: .9rem; }
    .field input {
      width: 100%; padding: 10px 14px; border: 1.5px solid #e5e7eb;
      border-radius: 10px; font-size: 1rem; outline: none; box-sizing: border-box;
      transition: border-color .2s;
    }
    .field input:focus { border-color: #bfa046; }
    .pw-wrap { position: relative; }
    .pw-wrap input { padding-right: 44px; }
    .eye-btn {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; font-size: 16px; padding: 0;
    }
    .error-msg { color: #ef4444; font-size: .9rem; margin-bottom: 1rem; background: #fef2f2; padding: 8px 12px; border-radius: 8px; }
    .btn-gold {
      width: 100%; padding: 12px; background: linear-gradient(135deg, #bfa046, #d4b660);
      color: #fff; border: none; border-radius: 10px; font-size: 1rem; font-weight: 700;
      cursor: pointer; transition: opacity .2s; margin-top: .5rem;
    }
    .btn-gold:hover:not(:disabled) { opacity: .9; }
    .btn-gold:disabled { opacity: .6; cursor: not-allowed; }
    .spin { display: inline-block; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .auth-links { margin-top: 1.2rem; font-size: .9rem; color: #6b7280; }
    .auth-links a { color: #bfa046; font-weight: 600; text-decoration: none; margin-left: .3rem; }
    .auth-links a:hover { text-decoration: underline; }
  `]
})
export class PatientLoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';
  showPw = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.loading) return;
    this.loading = true;
    this.error = '';
    this.auth.patientLogin(this.email, this.password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/mi-area']); },
      error: (e: any) => {
        this.loading = false;
        this.error = e.error?.detail || 'Email o contraseña incorrectos';
      }
    });
  }
}
