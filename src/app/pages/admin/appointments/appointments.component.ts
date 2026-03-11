import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment, AppointmentStatus, AppointmentStatusLabels } from '../../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Gestión de Citas</h5>
        <a routerLink="/admin/appointments/new" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          Nueva Cita
        </a>
      </div>
      <div class="card-body">
        <!-- Filtros -->
        <div class="row mb-3">
          <div class="col-md-3">
            <label class="form-label">Estado</label>
            <select class="form-select" [(ngModel)]="selectedStatus" (change)="filterAppointments()">
              <option value="">Todos los estados</option>
              <option *ngFor="let status of appointmentStatuses" [value]="status">
                {{ AppointmentStatusLabels[status] }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Tipo de Sesión</label>
            <select class="form-select" [(ngModel)]="selectedSessionType" (change)="filterAppointments()">
              <option value="">Todos los tipos</option>
              <option value="Terapia individual">Terapia individual</option>
              <option value="Terapia de pareja">Terapia de pareja</option>
              <option value="Orientación laboral">Orientación laboral</option>
              <option value="Terapia sexual">Terapia sexual</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Buscar</label>
            <input type="text" class="form-control" placeholder="Cliente..." [(ngModel)]="searchTerm" (input)="onSearch()">
          </div>
          <div class="col-md-3">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control" [(ngModel)]="selectedDate" (change)="filterAppointments()">
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="text-center my-4">
          <div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div>
        </div>

        <!-- Tabla de citas -->
        <table class="table table-hover" *ngIf="!loading && appointments.length">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Precio (€)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let appointment of appointments">
              <td>{{ appointment.appointmentDate | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>{{ appointment.clientName || 'Sin cliente' }}</td>
              <td>{{ appointment.sessionType || '-' }}</td>
              <td>{{ appointment.durationMinutes || 60 }} min</td>
              <td>
                <span class="badge" [ngClass]="getStatusBadgeClass(appointment.status)">
                  {{ AppointmentStatusLabels[appointment.status] }}
                </span>
              </td>
              <td>{{ appointment.price || 0 | number:'1.2-2' }}</td>
              <td>
                <button class="btn btn-sm btn-info me-1" (click)="viewAppointment(appointment.id!)" *ngIf="appointment.id">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1" (click)="editAppointment(appointment.id!)" *ngIf="appointment.id">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" (click)="deleteAppointment(appointment.id!)" *ngIf="appointment.id">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mensaje sin citas -->
        <div *ngIf="!loading && !appointments.length" class="alert alert-info">
          No hay citas registradas.
        </div>

        <!-- Estadísticas -->
        <div class="row mt-4" *ngIf="!loading && appointments.length">
          <div class="col-md-3">
            <div class="card bg-primary text-white">
              <div class="card-body text-center">
                <h6>Total Citas</h6>
                <h4>{{ appointments.length }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-success text-white">
              <div class="card-body text-center">
                <h6>Completadas</h6>
                <h4>{{ getAppointmentsByStatus(AppointmentStatus.COMPLETED).length }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-warning text-white">
              <div class="card-body text-center">
                <h6>Programadas</h6>
                <h4>{{ getAppointmentsByStatus(AppointmentStatus.SCHEDULED).length }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-danger text-white">
              <div class="card-body text-center">
                <h6>Canceladas</h6>
                <h4>{{ getAppointmentsByStatus(AppointmentStatus.CANCELLED).length }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  loading = false;
  searchTerm = '';
  selectedStatus = '';
  selectedSessionType = '';
  selectedDate = '';
  
  appointmentStatuses = Object.values(AppointmentStatus);
  AppointmentStatusLabels = AppointmentStatusLabels;
  AppointmentStatus = AppointmentStatus;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.filteredAppointments = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando citas:', error);
        this.appointments = [];
        this.filteredAppointments = [];
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.filterAppointments();
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      // Filtro por estado
      if (this.selectedStatus && appointment.status !== this.selectedStatus) {
        return false;
      }
      
      // Filtro por tipo de sesión
      if (this.selectedSessionType && appointment.sessionType !== this.selectedSessionType) {
        return false;
      }
      
      // Filtro por fecha
      if (this.selectedDate) {
        const appointmentDate = new Date(appointment.appointmentDate);
        const selectedDate = new Date(this.selectedDate);
        if (appointmentDate.toDateString() !== selectedDate.toDateString()) {
          return false;
        }
      }
      
      // Filtro por búsqueda de texto
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        const clientName = appointment.clientName?.toLowerCase() || '';
        const sessionType = appointment.sessionType?.toLowerCase() || '';
        const notes = appointment.notes?.toLowerCase() || '';
        
        if (!clientName.includes(searchLower) && 
            !sessionType.includes(searchLower) && 
            !notes.includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
  }

  getAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
    return this.appointments.filter(appointment => appointment.status === status);
  }

  getStatusBadgeClass(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.SCHEDULED:
        return 'bg-warning';
      case AppointmentStatus.CONFIRMED:
        return 'bg-info';
      case AppointmentStatus.COMPLETED:
        return 'bg-success';
      case AppointmentStatus.CANCELLED:
        return 'bg-danger';
      case AppointmentStatus.NO_SHOW:
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  viewAppointment(id: number) {
    this.router.navigate(['/admin/appointments', id]);
  }

  editAppointment(id: number) {
    this.router.navigate(['/admin/appointments/edit', id]);
  }

  deleteAppointment(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta cita?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.loadAppointments();
        },
        error: (error) => {
          console.error('Error eliminando cita:', error);
          alert('Error al eliminar la cita');
        }
      });
    }
  }
} 