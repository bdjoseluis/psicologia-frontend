import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../../services/client.service';
import { Client } from '../../../../models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">{{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}</h5>
        <button class="btn btn-secondary" (click)="goBack()">
          <i class="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>
      <div class="card-body">
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
          <div class="row">
            <!-- Información básica -->
            <div class="col-md-6">
              <h6 class="text-primary mb-3">Información Personal</h6>
              
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="firstName"
                  formControlName="firstName"
                  [class.is-invalid]="clientForm.get('firstName')?.invalid && clientForm.get('firstName')?.touched">
                <div class="invalid-feedback" *ngIf="clientForm.get('firstName')?.invalid && clientForm.get('firstName')?.touched">
                  El nombre es obligatorio
                </div>
              </div>

              <div class="mb-3">
                <label for="lastName" class="form-label">Apellidos *</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="lastName"
                  formControlName="lastName"
                  [class.is-invalid]="clientForm.get('lastName')?.invalid && clientForm.get('lastName')?.touched">
                <div class="invalid-feedback" *ngIf="clientForm.get('lastName')?.invalid && clientForm.get('lastName')?.touched">
                  Los apellidos son obligatorios
                </div>
              </div>

              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Teléfono</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="phoneNumber"
                  formControlName="phoneNumber"
                  placeholder="+34 600 123 456">
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email"
                  formControlName="email"
                  placeholder="cliente@email.com">
                <div class="invalid-feedback" *ngIf="clientForm.get('email')?.invalid && clientForm.get('email')?.touched">
                  Introduce un email válido
                </div>
              </div>

              <div class="mb-3">
                <label for="dateOfBirth" class="form-label">Fecha de Nacimiento</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="dateOfBirth"
                  formControlName="dateOfBirth">
              </div>

              <div class="mb-3">
                <label for="gender" class="form-label">Género</label>
                <select class="form-select" id="gender" formControlName="gender">
                  <option value="">Seleccionar...</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="No binario">No binario</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <!-- Información adicional -->
            <div class="col-md-6">
              <h6 class="text-primary mb-3">Información Adicional</h6>
              
              <div class="mb-3">
                <label for="occupation" class="form-label">Profesión</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="occupation"
                  formControlName="occupation"
                  placeholder="Estudiante, Desempleado, etc.">
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">Dirección</label>
                <textarea 
                  class="form-control" 
                  id="address"
                  formControlName="address"
                  rows="2"
                  placeholder="Calle, número, ciudad..."></textarea>
              </div>

              <div class="mb-3">
                <label for="caseSummary" class="form-label">Resumen del Caso</label>
                <textarea 
                  class="form-control" 
                  id="caseSummary"
                  formControlName="caseSummary"
                  rows="3"
                  placeholder="Breve descripción del problema o motivo de consulta..."></textarea>
              </div>

              <div class="mb-3">
                <label for="consultationFrequency" class="form-label">Frecuencia de Consulta</label>
                <select class="form-select" id="consultationFrequency" formControlName="consultationFrequency">
                  <option value="">Seleccionar...</option>
                  <option value="Muy frecuente">Muy frecuente</option>
                  <option value="Normal">Normal</option>
                  <option value="No viene mucho">No viene mucho</option>
                  <option value="No viene ya">No viene ya</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="debt" class="form-label">Deuda Pendiente (€)</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="debt"
                  formControlName="debt"
                  step="0.01"
                  min="0"
                  placeholder="0.00">
              </div>
            </div>
          </div>

          <!-- Notas -->
          <div class="row mt-3">
            <div class="col-12">
              <div class="mb-3">
                <label for="notes" class="form-label">Notas Adicionales</label>
                <textarea 
                  class="form-control" 
                  id="notes"
                  formControlName="notes"
                  rows="4"
                  placeholder="Notas importantes sobre el cliente, observaciones, etc..."></textarea>
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
              [disabled]="clientForm.invalid || isSubmitting">
              <i class="fas fa-save me-2"></i>
              {{ isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  clientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      dateOfBirth: [''],
      gender: [''],
      occupation: [''],
      address: [''],
      caseSummary: [''],
      consultationFrequency: [''],
      debt: [0, [Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.clientId = +params['id'];
        this.loadClient(this.clientId);
      }
    });
  }

  loadClient(id: number) {
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue({
          firstName: client.firstName,
          lastName: client.lastName,
          phoneNumber: client.phoneNumber,
          email: client.email,
          dateOfBirth: client.dateOfBirth,
          gender: client.gender,
          occupation: client.occupation,
          address: client.address,
          caseSummary: client.caseSummary,
          consultationFrequency: client.consultationFrequency,
          debt: client.debt,
          notes: client.notes
        });
      },
      error: (error) => {
        console.error('Error cargando cliente:', error);
        alert('Error al cargar el cliente');
      }
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      const clientData = this.clientForm.value;

      if (this.isEditing && this.clientId) {
        this.clientService.updateClient(this.clientId, clientData).subscribe({
          next: () => {
            alert('Cliente actualizado correctamente');
            this.router.navigate(['/admin/clients']);
          },
          error: (error) => {
            console.error('Error actualizando cliente:', error);
            alert('Error al actualizar el cliente');
            this.isSubmitting = false;
          }
        });
      } else {
        this.clientService.createClient(clientData).subscribe({
          next: () => {
            alert('Cliente creado correctamente');
            this.router.navigate(['/admin/clients']);
          },
          error: (error) => {
            console.error('Error creando cliente:', error);
            alert('Error al crear el cliente');
            this.isSubmitting = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.clientForm.controls).forEach(key => {
      const control = this.clientForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack() {
    this.router.navigate(['/admin/clients']);
  }
} 