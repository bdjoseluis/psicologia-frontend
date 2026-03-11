import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialRecord, RecordType, RecordTypeLabels } from '../../../../models/financial.model';
import { FinancialService } from '../../../../services/financial.service';

@Component({
  selector: 'app-financial-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Nuevo Registro Financiero</h5>
      </div>
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" #finForm="ngForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Tipo</label>
              <select class="form-select" [(ngModel)]="record.recordType" name="recordType" required>
                <option [ngValue]="null">Selecciona tipo</option>
                <option *ngFor="let type of recordTypes" [ngValue]="type">{{ RecordTypeLabels[type] }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Importe (€)</label>
              <input type="number" class="form-control" [(ngModel)]="record.amount" name="amount" required min="0.01" step="0.01">
            </div>
            <div class="col-md-12">
              <label class="form-label">Descripción</label>
              <input type="text" class="form-control" [(ngModel)]="record.description" name="description" required maxlength="100">
            </div>
            <div class="col-md-6">
              <label class="form-label">Categoría</label>
              <input type="text" class="form-control" [(ngModel)]="record.category" name="category">
            </div>
            <div class="col-md-6">
              <label class="form-label">Método de pago</label>
              <input type="text" class="form-control" [(ngModel)]="record.paymentMethod" name="paymentMethod">
            </div>
            <div class="col-md-6">
              <label class="form-label">Fecha</label>
              <input type="date" class="form-control" [(ngModel)]="recordDateString" name="recordDate" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">Notas</label>
              <input type="text" class="form-control" [(ngModel)]="record.notes" name="notes">
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button type="submit" class="btn btn-success" [disabled]="loading || finForm.invalid">
              <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
              Guardar
            </button>
            <a routerLink="/admin/financial" class="btn btn-secondary ms-2">Cancelar</a>
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  `
})
export class FinancialFormComponent {
  record: Partial<FinancialRecord> = {
    recordType: undefined,
    amount: undefined,
    description: '',
    category: '',
    paymentMethod: '',
    recordDate: undefined,
    notes: ''
  };
  recordTypes = Object.values(RecordType);
  RecordTypeLabels = RecordTypeLabels;
  loading = false;
  errorMessage = '';
  recordDateString = '';

  constructor(private financialService: FinancialService, private router: Router) {}

  onSubmit() {
    if (this.loading) return;
    this.loading = true;
    this.errorMessage = '';
    // Convertir fecha string a Date
    this.record.recordDate = this.recordDateString ? new Date(this.recordDateString) : undefined;
    this.financialService.createFinancialRecord(this.record as FinancialRecord).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/financial']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al guardar el registro';
      }
    });
  }
}