import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <img src="/logo-devesan-2026.png" alt="Devesan" />
        </div>
        <h2>Crea tu cuenta</h2>
        <p class="auth-sub">Solo necesitas email y contraseña.<br>Tu información se completará en consulta.</p>

        <form (ngSubmit)="submit()" *ngIf="!done">
          <div class="field">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="tu@email.com" />
          </div>
          <div class="field">
            <label>Contraseña <span class="hint">(mínimo 6 caracteres)</span></label>
            <div class="pw-wrap">
              <input [type]="showPw ? 'text' : 'password'" [(ngModel)]="password" name="password" required placeholder="••••••••" />
              <button type="button" class="eye-btn" (click)="showPw=!showPw">{{ showPw ? '🙈' : '👁️' }}</button>
            </div>
          </div>
          <div class="field">
            <label>Repite la contraseña</label>
            <input [type]="showPw ? 'text' : 'password'" [(ngModel)]="password2" name="password2" required placeholder="••••••••" />
            <div class="field-error" *ngIf="password2 && password !== password2">Las contraseñas no coinciden</div>
          </div>

          <div class="error-msg" *ngIf="error">{{ error }}</div>

          <button class="btn-gold" type="submit"
            [disabled]="loading || !email || !password || password !== password2 || password.length < 6">
            <span *ngIf="loading" class="spin">⟳</span>
            {{ loading ? 'Creando cuenta...' : 'Registrarme' }}
          </button>
        </form>

        <div class="success-box" *ngIf="done">
          <div class="success-icon">✅</div>
          <h3>¡Cuenta creada!</h3>
          <p>Ya puedes iniciar sesión y reservar tus citas.</p>
          <button class="btn-gold" (click)="router.navigate(['/mi-area'])">Ir a mi área</button>
        </div>

        <div class="auth-links" *ngIf="!done">
          <span>¿Ya tienes cuenta?</span>
          <a routerLink="/login">Inicia sesión</a>
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
    .auth-sub { color: #6b7280; margin-bottom: 1.8rem; font-size: .9rem; line-height: 1.5; }
    .field { text-align: left; margin-bottom: 1.2rem; }
    .field label { display: block; font-weight: 600; color: #374151; margin-bottom: .4rem; font-size: .9rem; }
    .hint { font-weight: 400; color: #9ca3af; font-size: .82rem; }
    .field input {
      width: 100%; padding: 10px 14px; border: 1.5px solid #e5e7eb;
      border-radius: 10px; font-size: 1rem; outline: none; box-sizing: border-box;
      transition: border-color .2s;
    }
    .field input:focus { border-color: #bfa046; }
    .field-error { color: #ef4444; font-size: .8rem; margin-top: .3rem; }
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
    .success-box { padding: 1.5rem 0; }
    .success-icon { font-size: 3rem; margin-bottom: 1rem; }
    .success-box h3 { color: #166534; margin-bottom: .5rem; }
    .success-box p { color: #6b7280; margin-bottom: 1.5rem; }
  `]
})
export class PatientRegisterComponent {
  email = '';
  password = '';
  password2 = '';
  loading = false;
  error = '';
  done = false;
  showPw = false;

  constructor(public auth: AuthService, public router: Router) {}

  submit() {
    if (this.loading || this.password !== this.password2) return;
    this.loading = true;
    this.error = '';
    this.auth.patientRegister(this.email, this.password).subscribe({
      next: () => { this.loading = false; this.done = true; },
      error: (e: any) => {
        this.loading = false;
        this.error = e.error?.detail || 'Error al crear la cuenta';
      }
    });
  }
}
