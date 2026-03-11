import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { ConsultationService } from '../../services/consultation.service';
import { Appointment } from '../../models/appointment.model';
import { ConsultationInfo } from '../../models/consultation.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="mb-4">Mi Panel</h1>
        </div>
      </div>

      <div class="row">
        <!-- Información de la consulta -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-info-circle me-2"></i>
                Información de la Consulta
              </h5>
            </div>
            <div class="card-body">
              <h6>{{ consultationInfo?.psychologistName }}</h6>
              <p class="text-muted">{{ consultationInfo?.title }}</p>
              <p>{{ consultationInfo?.description }}</p>
              
              <div class="row">
                <div class="col-6">
                  <strong>Teléfono:</strong><br>
                  {{ consultationInfo?.phone }}
                </div>
                <div class="col-6">
                  <strong>Email:</strong><br>
                  {{ consultationInfo?.email }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mis citas -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-calendar me-2"></i>
                Mis Citas
              </h5>
            </div>
            <div class="card-body">
              <div *ngIf="appointments.length === 0" class="text-center text-muted">
                <i class="fas fa-calendar-times fa-3x mb-3"></i>
                <p>No tienes citas programadas</p>
                <button class="btn btn-primary" routerLink="/appointments/request">
                  Solicitar Cita
                </button>
              </div>
              
              <div *ngFor="let appointment of appointments" class="appointment-item mb-3 p-3 border rounded">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-1">{{ appointment.sessionType || 'Consulta' }}</h6>
                    <p class="mb-1">
                      <i class="fas fa-clock me-1"></i>
                      {{ appointment.appointmentDate | date:'dd/MM/yyyy HH:mm' }}
                    </p>
                    <span class="badge" [ngClass]="getStatusClass(appointment.status)">
                      {{ getStatusLabel(appointment.status) }}
                    </span>
                  </div>
                  <div class="text-end">
                    <p class="mb-0"><strong>{{ appointment.price | currency:'EUR' }}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones rápidas -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                <i class="fas fa-bolt me-2"></i>
                Acciones Rápidas
              </h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <button class="btn btn-outline-primary w-100" routerLink="/appointments/request">
                    <i class="fas fa-plus me-2"></i>
                    Solicitar Cita
                  </button>
                </div>
                <div class="col-md-4 mb-3">
                  <button class="btn btn-outline-info w-100" routerLink="/consultation/info">
                    <i class="fas fa-info me-2"></i>
                    Ver Información
                  </button>
                </div>
                <div class="col-md-4 mb-3">
                  <button class="btn btn-outline-secondary w-100" routerLink="/contact">
                    <i class="fas fa-envelope me-2"></i>
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appointment-item {
      background-color: #f8f9fa;
      transition: background-color 0.3s ease;
    }
    
    .appointment-item:hover {
      background-color: #e9ecef;
    }
    
    .badge {
      font-size: 0.8rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  consultationInfo: ConsultationInfo | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadConsultationInfo();
  }

  private loadAppointments(): void {
    this.appointmentService.getUpcomingAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  private loadConsultationInfo(): void {
    this.consultationService.getConsultationInfo().subscribe({
      next: (info) => {
        this.consultationInfo = info;
      },
      error: (error) => {
        console.error('Error loading consultation info:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'bg-warning';
      case 'CONFIRMED': return 'bg-success';
      case 'COMPLETED': return 'bg-info';
      case 'CANCELLED': return 'bg-danger';
      case 'NO_SHOW': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'Programada';
      case 'CONFIRMED': return 'Confirmada';
      case 'COMPLETED': return 'Completada';
      case 'CANCELLED': return 'Cancelada';
      case 'NO_SHOW': return 'No se presentó';
      default: return status;
    }
  }
} 