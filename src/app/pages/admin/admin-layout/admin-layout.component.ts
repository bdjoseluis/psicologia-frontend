import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-wrap">
      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="menuOpen">
        <div class="sidebar-header">
          <img src="/logo-devesan-2026.png" alt="Devesan" class="sidebar-logo" />
          <span class="sidebar-title">Panel Admin</span>
          <button class="sidebar-close" (click)="menuOpen=false">✕</button>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/admin/dashboard" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </a>
          <a routerLink="/admin/clients" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-users"></i> Pacientes
          </a>
          <a routerLink="/admin/appointments" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-calendar-alt"></i> Citas
          </a>
          <a routerLink="/admin/horario" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-clock"></i> Gestionar horario
          </a>
          <a routerLink="/admin/financial" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-chart-line"></i> Finanzas
          </a>
          <a routerLink="/admin/consultation" routerLinkActive="active" (click)="menuOpen=false">
            <i class="fas fa-cog"></i> Configuración
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/home" class="sidebar-link-secondary">
            <i class="fas fa-globe"></i> Ver web
          </a>
          <button class="btn-logout" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i> Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- Overlay móvil -->
      <div class="overlay" *ngIf="menuOpen" (click)="menuOpen=false"></div>

      <!-- Main -->
      <div class="admin-main">
        <header class="admin-topbar">
          <button class="hamburger" (click)="menuOpen=true">☰</button>
          <span class="topbar-title">PsicoSalud Devesan — Administración</span>
          <span class="topbar-user">{{ auth.getCurrentUser()?.nombre }}</span>
        </header>

        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-wrap { display: flex; min-height: 100vh; background: #f1f5f9; }

    .sidebar {
      width: 240px; min-width: 240px; background: #1e293b; color: #cbd5e1;
      display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 200;
      transition: transform .25s;
    }
    .sidebar-header { display: flex; align-items: center; gap: .7rem; padding: 1.2rem 1rem; border-bottom: 1px solid #334155; }
    .sidebar-logo { width: 38px; height: 38px; border-radius: 8px; object-fit: cover; }
    .sidebar-title { font-weight: 700; font-size: .95rem; color: #f1f5f9; flex: 1; }
    .sidebar-close { display: none; background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
    .sidebar-nav { flex: 1; padding: 1rem .5rem; display: flex; flex-direction: column; gap: .2rem; overflow-y: auto; }
    .sidebar-nav a {
      display: flex; align-items: center; gap: .8rem; padding: .65rem 1rem;
      color: #94a3b8; text-decoration: none; border-radius: 8px; font-size: .93rem; font-weight: 500;
      transition: all .15s;
    }
    .sidebar-nav a:hover { background: #334155; color: #f1f5f9; }
    .sidebar-nav a.active { background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; }
    .sidebar-footer { padding: 1rem; border-top: 1px solid #334155; display: flex; flex-direction: column; gap: .5rem; }
    .sidebar-link-secondary { display: flex; align-items: center; gap: .7rem; color: #64748b; text-decoration: none; font-size: .88rem; padding: .4rem .5rem; border-radius: 6px; }
    .sidebar-link-secondary:hover { color: #94a3b8; }
    .btn-logout { display: flex; align-items: center; gap: .7rem; background: none; border: 1px solid #334155; color: #64748b; padding: .5rem 1rem; border-radius: 8px; cursor: pointer; font-size: .88rem; transition: all .15s; }
    .btn-logout:hover { background: #334155; color: #f87171; }

    .admin-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-height: 100vh; }
    .admin-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: .8rem 1.5rem; display: flex; align-items: center; gap: 1rem; position: sticky; top: 0; z-index: 100; }
    .hamburger { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #64748b; }
    .topbar-title { font-weight: 700; color: #1e293b; font-size: 1rem; flex: 1; }
    .topbar-user { font-size: .88rem; color: #64748b; font-weight: 600; }

    .admin-content { flex: 1; padding: 1.5rem; }

    .overlay { display: none; }

    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); }
      .sidebar-close { display: block; }
      .admin-main { margin-left: 0; }
      .hamburger { display: block; }
      .overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 150; }
    }
  `]
})
export class AdminLayoutComponent {
  menuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin-login']);
  }
}
