import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated() || !auth.isAdmin()) {
    router.navigate(['/admin-login']);
    return false;
  }
  return true;
};

const patientGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated() || !auth.isPatient()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Pública
  { path: 'home',    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login',   loadComponent: () => import('./pages/auth/patient-login/patient-login.component').then(m => m.PatientLoginComponent) },
  { path: 'registro',loadComponent: () => import('./pages/auth/patient-register/patient-register.component').then(m => m.PatientRegisterComponent) },

  // Área paciente
  { path: 'mi-area', loadComponent: () => import('./pages/patient/mi-area.component').then(m => m.MiAreaComponent), canActivate: [patientGuard] },

  // Admin login
  { path: 'admin-login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },

  // Panel admin
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',    loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'clients',      loadComponent: () => import('./pages/admin/clients/clients.component').then(m => m.ClientsComponent) },
      { path: 'clients/new',  loadComponent: () => import('./pages/admin/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
      { path: 'clients/:id',  loadComponent: () => import('./pages/admin/clients/client-detail/client-detail.component').then(m => m.ClientDetailComponent) },
      { path: 'appointments', loadComponent: () => import('./pages/admin/appointments/appointments.component').then(m => m.AppointmentsComponent) },
      { path: 'appointments/new', loadComponent: () => import('./pages/admin/appointments/appointment-form/appointment-form.component').then(m => m.AppointmentFormComponent) },
      { path: 'horario',      loadComponent: () => import('./pages/admin/horario/horario.component').then(m => m.HorarioComponent) },
      { path: 'financial',    loadComponent: () => import('./pages/admin/financial/financial.component').then(m => m.FinancialComponent) },
      { path: 'financial/new',loadComponent: () => import('./pages/admin/financial/financial-form/financial-form.component').then(m => m.FinancialFormComponent) },
      { path: 'consultation', loadComponent: () => import('./pages/admin/consultation/consultation.component').then(m => m.ConsultationComponent) },
    ]
  },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
