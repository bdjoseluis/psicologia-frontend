import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Gestión de Clientes</h5>
        <a routerLink="/admin/clients/new" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i>
          Nuevo Cliente
        </a>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="Buscar por nombre o apellidos..." [(ngModel)]="searchTerm" (input)="onSearch()">
        </div>
        <div *ngIf="loading" class="text-center my-4">
          <div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div>
        </div>
        <table class="table table-hover" *ngIf="!loading && clients.length">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Deuda (€)</th>
              <th>Frecuencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of clients">
              <td>{{ client.firstName }} {{ client.lastName }}</td>
              <td>{{ client.phoneNumber || '-' }}</td>
              <td>{{ client.email || '-' }}</td>
              <td>{{ client.debt || 0 | number:'1.2-2' }}</td>
              <td>{{ client.consultationFrequency || '-' }}</td>
              <td>
                <button class="btn btn-sm btn-info me-1" (click)="viewClient(client.id!)" *ngIf="client.id"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-warning me-1" (click)="editClient(client.id!)" *ngIf="client.id"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" (click)="deleteClient(client.id!)" *ngIf="client.id"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="!loading && !clients.length" class="alert alert-info">
          No hay clientes registrados.
        </div>
      </div>
    </div>
  `
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  loading = false;
  searchTerm = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando clientes:', error);
        this.clients = [];
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim().length > 0) {
      this.loading = true;
      this.clientService.searchClients(this.searchTerm).subscribe({
        next: (data) => {
          this.clients = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error buscando clientes:', error);
          this.clients = [];
          this.loading = false;
        }
      });
    } else {
      this.loadClients();
    }
  }

  viewClient(id: number) {
    this.router.navigate(['/admin/clients', id]);
  }

  editClient(id: number) {
    this.router.navigate(['/admin/clients/edit', id]);
  }

  deleteClient(id: number) {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (error) => {
          console.error('Error eliminando cliente:', error);
          alert('Error al eliminar el cliente');
        }
      });
    }
  }
} 