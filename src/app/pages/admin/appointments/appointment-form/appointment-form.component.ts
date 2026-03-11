import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../../services/appointment.service';
import { ClientService } from '../../../../services/client.service';
import { Appointment, AppointmentStatus, AppointmentStatusLabels } from '../../../../models/appointment.model';
import { Client } from '../../../../models/client.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">{{ isEditing ? 'Editar Cita' : 'Nueva Cita' }}</h5>
        <button class="btn btn-secondary" (click)="goBack()">
          <i class="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>
      <div class="card-body">
        <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <!-- Información básica de la cita -->
            <div class="col-md-6">
              <h6 class="text-primary mb-3">Información de la Cita</h6>
              
              <div class="mb-3">
                <label for="appointmentDate" class="form-label">Fecha y Hora *</label>
                <input 
                  type="datetime-local" 
                  class="form-control" 
                  id="appointmentDate"
                  formControlName="appointmentDate"
                  [class.is-invalid]="appointmentForm.get('appointmentDate')?.invalid && appointmentForm.get('appointmentDate')?.touched">
                <div class="invalid-feedback" *ngIf="appointmentForm.get('appointmentDate')?.invalid && appointmentForm.get('appointmentDate')?.touched">
                  La fecha y hora son obligatorias
                </div>
              </div>

              <div class="mb-3">
                <label for="durationMinutes" class="form-label">Duración (minutos)</label>
                <select class="form-select" id="durationMinutes" formControlName="durationMinutes">
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60" selected>60 minutos</option>
                  <option value="90">90 minutos</option>
                  <option value="120">120 minutos</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="sessionType" class="form-label">Tipo de Sesión</label>
                <select class="form-select" id="sessionType" formControlName="sessionType">
                  <option value="">Seleccionar...</option>
                  <option value="Terapia individual">Terapia individual</option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                  <option value="Orientación laboral">Orientación laboral</option>
                  <option value="Terapia sexual">Terapia sexual</option>
                  <option value="Tratamiento de adicciones">Tratamiento de adicciones</option>
                  <option value="Creación de CV">Creación de CV</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="status" class="form-label">Estado</label>
                <select class="form-select" id="status" formControlName="status">
                  <option *ngFor="let status of appointmentStatuses" [value]="status">
                    {{ AppointmentStatusLabels[status] }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Cliente y precio -->
            <div class="col-md-6">
              <h6 class="text-primary mb-3">Cliente y Precio</h6>
              
              <div class="mb-3">
                <label for="clientId" class="form-label">Cliente</label>
                <select class="form-select" id="clientId" formControlName="clientId">
                  <option value="">Seleccionar cliente...</option>
                  <option *ngFor="let client of clients" [value]="client.id">
                    {{ client.firstName }} {{ client.lastName }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Precio (€)</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="price"
                  formControlName="price"
                  step="0.01"
                  min="0"
                  placeholder="0.00">
              </div>

              <div class="mb-3">
                <label for="notes" class="form-label">Notas</label>
                <textarea 
                  class="form-control" 
                  id="notes"
                  formControlName="notes"
                  rows="4"
                  placeholder="Notas sobre la sesión, observaciones, etc..."></textarea>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-secondary" (click)="goBack()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="appointmentForm.invalid || isSubmitting">
              <i class="fas fa-save me-2"></i>
              {{ isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  appointmentId: number | null = null;
  clients: Client[] = [];
  
  appointmentStatuses = Object.values(AppointmentStatus);
  AppointmentStatusLabels = AppointmentStatusLabels;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      appointmentDate: ['', [Validators.required]],
      durationMinutes: [60],
      sessionType: [''],
      status: [AppointmentStatus.SCHEDULED],
      clientId: [''],
      price: [0, [Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.loadClients();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.appointmentId = +params['id'];
        this.loadAppointment(this.appointmentId);
      }
    });
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
      }
    });
  }

  loadAppointment(id: number) {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        // Convertir la fecha al formato requerido por datetime-local
        const appointmentDate = new Date(appointment.appointmentDate);
        const formattedDate = appointmentDate.toISOString().slice(0, 16);
        
        this.appointmentForm.patchValue({
          appointmentDate: formattedDate,
          durationMinutes: appointment.durationMinutes,
          sessionType: appointment.sessionType,
          status: appointment.status,
          clientId: appointment.clientId,
          price: appointment.price,
          notes: appointment.notes
        });
      },
      error: (error) => {
        console.error('Error cargando cita:', error);
        alert('Error al cargar la cita');
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.isSubmitting = true;
      const appointmentData = this.appointmentForm.value;

      if (this.isEditing && this.appointmentId) {
        this.appointmentService.updateAppointment(this.appointmentId, appointmentData).subscribe({
          next: () => {
            alert('Cita actualizada correctamente');
            this.router.navigate(['/admin/appointments']);
          },
          error: (error) => {
            console.error('Error actualizando cita:', error);
            alert('Error al actualizar la cita');
            this.isSubmitting = false;
          }
        });
      } else {
        this.appointmentService.createAppointment(appointmentData).subscribe({
          next: () => {
            alert('Cita creada correctamente');
            this.router.navigate(['/admin/appointments']);
          },
          error: (error) => {
            console.error('Error creando cita:', error);
            alert('Error al crear la cita');
            this.isSubmitting = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.appointmentForm.controls).forEach(key => {
      const control = this.appointmentForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack() {
    this.router.navigate(['/admin/appointments']);
  }
} 