import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Clientes</h5>
            <h2 class="card-text">0</h2>
            <small>Total registrados</small>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-4">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Citas Hoy</h5>
            <h2 class="card-text">0</h2>
            <small>Programadas</small>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-4">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Ingresos Mes</h5>
            <h2 class="card-text">€0</h2>
            <small>Total</small>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-4">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <h5 class="card-title">Pendientes</h5>
            <h2 class="card-text">0</h2>
            <small>Citas por confirmar</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Bienvenida al Panel de Administración</h5>
          </div>
          <div class="card-body">
            <p>Desde aquí puedes gestionar toda la información de tu consulta psicológica.</p>
            <div class="row">
              <div class="col-md-6">
                <h6>Acciones Rápidas:</h6>
                <ul>
                  <li>Gestionar clientes</li>
                  <li>Programar citas</li>
                  <li>Registrar ingresos/gastos</li>
                  <li>Configurar información de la consulta</li>
                </ul>
              </div>
              <div class="col-md-6">
                <h6>Estadísticas:</h6>
                <ul>
                  <li>Total de clientes</li>
                  <li>Citas del día</li>
                  <li>Ingresos del mes</li>
                  <li>Citas pendientes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {} 