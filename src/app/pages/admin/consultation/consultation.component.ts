import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConsultationService } from '../../../services/consultation.service';
import { ConsultationInfo } from '../../../models/consultation.model';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Configuración de la Consulta</h5>
        <button class="btn btn-secondary" (click)="reload()">
          <i class="fas fa-sync-alt me-2"></i>
          Recargar
        </button>
      </div>
      <div class="card-body">
        <form [formGroup]="consultationForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Nombre de la psicóloga *</label>
                <input type="text" class="form-control" formControlName="psychologistName" required [class.is-invalid]="consultationForm.get('psychologistName')?.invalid && consultationForm.get('psychologistName')?.touched">
                <div class="invalid-feedback" *ngIf="consultationForm.get('psychologistName')?.invalid && consultationForm.get('psychologistName')?.touched">Este campo es obligatorio</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input type="text" class="form-control" formControlName="title">
              </div>
              <div class="mb-3">
                <label class="form-label">Especialidades</label>
                <textarea class="form-control" formControlName="specialties" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea class="form-control" formControlName="description" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" formControlName="phone">
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" formControlName="email">
              </div>
              <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-control" formControlName="address">
              </div>
              <div class="mb-3">
                <label class="form-label">Web</label>
                <input type="text" class="form-control" formControlName="website">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Horario</label>
                <textarea class="form-control" formControlName="schedule" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Servicios</label>
                <textarea class="form-control" formControlName="services" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Precios</label>
                <textarea class="form-control" formControlName="prices" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Sobre mí</label>
                <textarea class="form-control" formControlName="about" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Formación</label>
                <textarea class="form-control" formControlName="education" rows="2"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Experiencia</label>
                <textarea class="form-control" formControlName="experience" rows="2"></textarea>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" class="btn btn-primary" [disabled]="consultationForm.invalid || isSubmitting">
              <i class="fas fa-save me-2"></i>
              {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
        <div *ngIf="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
        <div *ngIf="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </div>
    </div>
  `
})
export class ConsultationComponent implements OnInit {
  consultationForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService
  ) {
    this.consultationForm = this.fb.group({
      psychologistName: ['', Validators.required],
      title: [''],
      specialties: [''],
      description: [''],
      phone: [''],
      email: ['', Validators.email],
      address: [''],
      website: [''],
      schedule: [''],
      services: [''],
      prices: [''],
      about: [''],
      education: [''],
      experience: ['']
    });
  }

  ngOnInit() {
    this.loadConsultationInfo();
  }

  loadConsultationInfo() {
    this.consultationService.getConsultationInfoAdmin().subscribe({
      next: (info) => {
        this.consultationForm.patchValue(info);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la información de la consulta';
      }
    });
  }

  onSubmit() {
    if (this.consultationForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';
      const info: ConsultationInfo = this.consultationForm.value;
      this.consultationService.updateConsultationInfo(info).subscribe({
        next: () => {
          this.successMessage = 'Información actualizada correctamente';
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar la información';
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.consultationForm.controls).forEach(key => {
      const control = this.consultationForm.get(key);
      control?.markAsTouched();
    });
  }

  reload() {
    this.loadConsultationInfo();
  }
} 