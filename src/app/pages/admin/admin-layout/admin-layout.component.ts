import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
          <div class="position-sticky pt-3">
            <div class="text-center mb-4">
              <h5 class="text-white">Panel de Administración</h5>
              <small class="text-muted">{{ authService.getCurrentUser()?.name }}</small>
            </div>
            
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/admin/dashboard" routerLinkActive="active">
                  <i class="fas fa-tachometer-alt me-2"></i>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/admin/clients" routerLinkActive="active">
                  <i class="fas fa-users me-2"></i>
                  Clientes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/admin/appointments" routerLinkActive="active">
                  <i class="fas fa-calendar me-2"></i>
                  Citas
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/admin/financial" routerLinkActive="active">
                  <i class="fas fa-chart-line me-2"></i>
                  Finanzas
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/admin/consultation" routerLinkActive="active">
                  <i class="fas fa-cog me-2"></i>
                  Configuración
                </a>
              </li>
            </ul>
            
            <hr class="text-white">
            
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link text-white" routerLink="/home">
                  <i class="fas fa-home me-2"></i>
                  Volver al Inicio
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#" (click)="logout()">
                  <i class="fas fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">{{ pageTitle }}</h1>
          </div>
          
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      min-height: 100vh;
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }
    
    .sidebar .nav-link {
      font-weight: 500;
      color: #333;
    }
    
    .sidebar .nav-link.active {
      color: #007bff;
    }
    
    .sidebar .nav-link:hover {
      color: #007bff;
    }
    
    .sidebar-heading {
      font-size: .75rem;
      text-transform: uppercase;
    }
    
    .navbar-brand {
      padding-top: .75rem;
      padding-bottom: .75rem;
      font-size: 1rem;
      background-color: rgba(0, 0, 0, .25);
      box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }
    
    .navbar .navbar-toggler {
      top: .25rem;
      right: 1rem;
    }
    
    .navbar .form-control {
      padding: .75rem 1rem;
      border-width: 0;
      border-radius: 0;
    }
    
    .form-control-dark {
      color: #fff;
      background-color: rgba(255, 255, 255, .1);
      border-color: rgba(255, 255, 255, .1);
    }
    
    .form-control-dark:focus {
      border-color: transparent;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }
    
    .bi {
      vertical-align: -.125em;
      fill: currentColor;
    }
    
    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
    }
    
    .nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
  `]
})
export class AdminLayoutComponent {
  pageTitle = 'Dashboard';

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
} 