import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FinancialService } from '../../../services/financial.service';
import { FinancialRecord, RecordType, RecordTypeLabels } from '../../../models/financial.model';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Gestión Financiera</h5>
        <a routerLink="/admin/financial/new" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          Nuevo Registro
        </a>
      </div>
      <div class="card-body">
        <!-- Filtros -->
        <div class="row mb-3">
          <div class="col-md-3">
            <label class="form-label">Tipo</label>
            <select class="form-select" [(ngModel)]="selectedType" (change)="filterRecords()">
              <option value="">Todos los tipos</option>
              <option *ngFor="let type of recordTypes" [value]="type">
                {{ RecordTypeLabels[type] }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Categoría</label>
            <select class="form-select" [(ngModel)]="selectedCategory" (change)="filterRecords()">
              <option value="">Todas las categorías</option>
              <option value="Sesión terapia">Sesión terapia</option>
              <option value="Materiales">Materiales</option>
              <option value="Alquiler">Alquiler</option>
              <option value="Seguros">Seguros</option>
              <option value="Marketing">Marketing</option>
              <option value="Formación">Formación</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Buscar</label>
            <input type="text" class="form-control" placeholder="Descripción..." [(ngModel)]="searchTerm" (input)="onSearch()">
          </div>
          <div class="col-md-3">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control" [(ngModel)]="selectedDate" (change)="filterRecords()">
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="text-center my-4">
          <div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div>
        </div>

        <!-- Tabla de registros -->
        <table class="table table-hover" *ngIf="!loading && financialRecords.length">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Cliente</th>
              <th>Importe (€)</th>
              <th>Método</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let record of financialRecords">
              <td>{{ record.recordDate | date:'dd/MM/yyyy' }}</td>
              <td>
                <span class="badge" [ngClass]="getTypeBadgeClass(record.recordType)">
                  {{ RecordTypeLabels[record.recordType] }}
                </span>
              </td>
              <td>{{ record.description }}</td>
              <td>{{ record.category || '-' }}</td>
              <td>{{ record.clientName || '-' }}</td>
              <td [class.text-success]="record.recordType === 'INCOME'" [class.text-danger]="record.recordType === 'EXPENSE'">
                {{ record.amount | number:'1.2-2' }}
              </td>
              <td>{{ record.paymentMethod || '-' }}</td>
              <td>
                <button class="btn btn-sm btn-info me-1" (click)="viewRecord(record.id!)" *ngIf="record.id">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning me-1" (click)="editRecord(record.id!)" *ngIf="record.id">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" (click)="deleteRecord(record.id!)" *ngIf="record.id">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mensaje sin registros -->
        <div *ngIf="!loading && !financialRecords.length" class="alert alert-info">
          No hay registros financieros.
        </div>

        <!-- Estadísticas -->
        <div class="row mt-4" *ngIf="!loading && financialRecords.length">
          <div class="col-md-3">
            <div class="card bg-success text-white">
              <div class="card-body text-center">
                <h6>Total Ingresos</h6>
                <h4>{{ getTotalIncome() | number:'1.2-2' }}€</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-danger text-white">
              <div class="card-body text-center">
                <h6>Total Gastos</h6>
                <h4>{{ getTotalExpenses() | number:'1.2-2' }}€</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card" [ngClass]="getBalanceClass()">
              <div class="card-body text-center">
                <h6>Balance</h6>
                <h4>{{ getBalance() | number:'1.2-2' }}€</h4>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card bg-primary text-white">
              <div class="card-body text-center">
                <h6>Total Registros</h6>
                <h4>{{ financialRecords.length }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FinancialComponent implements OnInit {
  financialRecords: FinancialRecord[] = [];
  filteredRecords: FinancialRecord[] = [];
  loading = false;
  searchTerm = '';
  selectedType = '';
  selectedCategory = '';
  selectedDate = '';
  
  recordTypes = Object.values(RecordType);
  RecordTypeLabels = RecordTypeLabels;

  constructor(private financialService: FinancialService, private router: Router) {}

  ngOnInit() {
    this.loadFinancialRecords();
  }

  loadFinancialRecords() {
    this.loading = true;
    this.financialService.getAllFinancialRecords().subscribe({
      next: (data) => {
        this.financialRecords = data;
        this.filteredRecords = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando registros financieros:', error);
        this.financialRecords = [];
        this.filteredRecords = [];
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.filterRecords();
  }

  filterRecords() {
    this.filteredRecords = this.financialRecords.filter(record => {
      // Filtro por tipo
      if (this.selectedType && record.recordType !== this.selectedType) {
        return false;
      }
      
      // Filtro por categoría
      if (this.selectedCategory && record.category !== this.selectedCategory) {
        return false;
      }
      
      // Filtro por fecha
      if (this.selectedDate) {
        const recordDate = new Date(record.recordDate);
        const selectedDate = new Date(this.selectedDate);
        if (recordDate.toDateString() !== selectedDate.toDateString()) {
          return false;
        }
      }
      
      // Filtro por búsqueda de texto
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        const description = record.description?.toLowerCase() || '';
        const category = record.category?.toLowerCase() || '';
        const clientName = record.clientName?.toLowerCase() || '';
        const notes = record.notes?.toLowerCase() || '';
        
        if (!description.includes(searchLower) && 
            !category.includes(searchLower) && 
            !clientName.includes(searchLower) && 
            !notes.includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
  }

  getTypeBadgeClass(type: RecordType): string {
    return type === RecordType.INCOME ? 'bg-success' : 'bg-danger';
  }

  getTotalIncome(): number {
    return this.filteredRecords
      .filter(record => record.recordType === RecordType.INCOME)
      .reduce((sum, record) => sum + record.amount, 0);
  }

  getTotalExpenses(): number {
    return this.filteredRecords
      .filter(record => record.recordType === RecordType.EXPENSE)
      .reduce((sum, record) => sum + record.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  getBalanceClass(): string {
    const balance = this.getBalance();
    return balance >= 0 ? 'bg-success text-white' : 'bg-danger text-white';
  }

  viewRecord(id: number) {
    this.router.navigate(['/admin/financial', id]);
  }

  editRecord(id: number) {
    this.router.navigate(['/admin/financial/edit', id]);
  }

  deleteRecord(id: number) {
    if (confirm('¿Seguro que deseas eliminar este registro financiero?')) {
      this.financialService.deleteFinancialRecord(id).subscribe({
        next: () => {
          this.loadFinancialRecords();
        },
        error: (error) => {
          console.error('Error eliminando registro financiero:', error);
          alert('Error al eliminar el registro financiero');
        }
      });
    }
  }
} 