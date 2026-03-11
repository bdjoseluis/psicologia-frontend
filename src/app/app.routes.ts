import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

// Guards
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/admin-login']);
    return false;
  }
  return true;
};

const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/admin-login']);
    return false;
  }
  
  if (!authService.isAdmin()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'admin-login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  
  // Rutas protegidas para usuarios autenticados
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  
  // Rutas de administración
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'clients', loadComponent: () => import('./pages/admin/clients/clients.component').then(m => m.ClientsComponent) },
      { path: 'clients/new', loadComponent: () => import('./pages/admin/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clients/:id', loadComponent: () => import('./pages/admin/clients/client-detail/client-detail.component').then(m => m.ClientDetailComponent) },
      { path: 'appointments', loadComponent: () => import('./pages/admin/appointments/appointments.component').then(m => m.AppointmentsComponent) },
      { path: 'appointments/new', loadComponent: () => import('./pages/admin/appointments/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent) },
      { path: 'financial', loadComponent: () => import('./pages/admin/financial/financial.component').then(m => m.FinancialComponent) },
      { path: 'financial/new', loadComponent: () => import('./pages/admin/financial/financial-form/financial-form.component').then(m => m.FinancialFormComponent) },
      { path: 'consultation', loadComponent: () => import('./pages/admin/consultation/consultation.component').then(m => m.ConsultationComponent) }
    ]
  },
  
  // Ruta 404
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
