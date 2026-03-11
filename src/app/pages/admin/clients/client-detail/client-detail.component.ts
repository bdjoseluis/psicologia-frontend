import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Detalle del Cliente</h5>
      </div>
      <div class="card-body">
        <p class="text-muted">Información detallada del cliente.</p>
        <p>Funcionalidad en desarrollo...</p>
      </div>
    </div>
  `
})
export class ClientDetailComponent {} 