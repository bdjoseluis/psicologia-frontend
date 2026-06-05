import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="appts-page">
      <div class="page-header-row">
        <div>
          <h2>Citas</h2>
          <p>{{ filtered.length }} cita{{ filtered.length !== 1 ? 's' : '' }} encontrada{{ filtered.length !== 1 ? 's' : '' }}</p>
        </div>
        <button class="btn-new" (click)="showForm=true">+ Nueva cita manual</button>
      </div>

      <!-- Filtros -->
      <div class="filters-row">
        <input type="text" placeholder="Buscar paciente..." [(ngModel)]="search" (input)="filter()" />
        <select [(ngModel)]="filterEstado" (change)="filter()">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input type="date" [(ngModel)]="filterDate" (change)="filter()" />
        <button class="btn-clear" *ngIf="search||filterEstado||filterDate" (click)="clearFilters()">✕ Limpiar</button>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card stat-total"><span>{{ all.length }}</span><label>Total</label></div>
        <div class="stat-card stat-pend"><span>{{ count('pendiente') }}</span><label>Pendientes</label></div>
        <div class="stat-card stat-conf"><span>{{ count('confirmada') }}</span><label>Confirmadas</label></div>
        <div class="stat-card stat-comp"><span>{{ count('completada') }}</span><label>Completadas</label></div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-box"><div class="spinner"></div></div>

      <!-- Lista -->
      <div *ngIf="!loading" class="appts-list">
        <div class="empty" *ngIf="filtered.length === 0">No hay citas que coincidan con los filtros.</div>

        <div class="appt-row" *ngFor="let a of filtered" [class]="'estado-' + a.estado">
          <div class="appt-fecha">
            <span class="af-day">{{ fmtDay(a.fecha) }}</span>
            <span class="af-hour">{{ fmtHour(a.fecha) }}</span>
            <span class="af-dur">{{ a.duracion_min }}min</span>
          </div>
          <div class="appt-info">
            <div class="appt-nombre">{{ a.client_name }}</div>
            <div class="appt-meta">
              <span *ngIf="a.client_email">📧 {{ a.client_email }}</span>
              <span *ngIf="a.client_phone">📱 {{ a.client_phone }}</span>
              <span class="appt-tipo">{{ a.tipo }}</span>
            </div>
            <div class="appt-notas" *ngIf="a.notas">{{ a.notas }}</div>
          </div>
          <div class="appt-actions">
            <select class="estado-sel" [(ngModel)]="a.estado" (change)="updateEstado(a)">
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
            <button class="btn-del" (click)="delete(a.id)">🗑</button>
          </div>
        </div>
      </div>

      <!-- Modal nueva cita -->
      <div class="modal-overlay" *ngIf="showForm" (click)="showForm=false">
        <div class="modal-card" (click)="$event.stopPropagation()">
          <h3>Nueva cita</h3>
          <div class="form-field">
            <label>Nombre del paciente</label>
            <input type="text" [(ngModel)]="newAppt.client_name" placeholder="Nombre completo" />
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Fecha y hora</label>
              <input type="datetime-local" [(ngModel)]="newAppt.fecha" />
            </div>
            <div class="form-field">
              <label>Duración</label>
              <select [(ngModel)]="newAppt.duracion_min">
                <option [value]="30">30 min</option>
                <option [value]="60">1 hora</option>
                <option [value]="90">1h 30min</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Tipo</label>
              <select [(ngModel)]="newAppt.tipo">
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div class="form-field">
              <label>Estado</label>
              <select [(ngModel)]="newAppt.estado">
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
              </select>
            </div>
          </div>
          <div class="form-field">
            <label>Notas</label>
            <textarea [(ngModel)]="newAppt.notas" rows="2" placeholder="Observaciones..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-outline" (click)="showForm=false">Cancelar</button>
            <button class="btn-gold" (click)="createAppt()" [disabled]="!newAppt.client_name || !newAppt.fecha || saving">
              {{ saving ? 'Guardando...' : 'Crear cita' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .appts-page { max-width: 1000px; }
    .page-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
    .page-header-row h2 { color: #1e293b; font-weight: 800; margin: 0; }
    .page-header-row p { color: #64748b; margin: .2rem 0 0; font-size: .9rem; }
    .btn-new { padding: 10px 20px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: .9rem; }

    .filters-row { display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: center; }
    .filters-row input, .filters-row select { padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: .9rem; outline: none; }
    .filters-row input:focus, .filters-row select:focus { border-color: #bfa046; }
    .filters-row input[type=text] { flex: 1; min-width: 180px; }
    .btn-clear { background: none; border: 1px solid #e2e8f0; color: #64748b; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: .85rem; }

    .stats-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .stat-card { background: #fff; border-radius: 12px; padding: 1rem 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.05); min-width: 100px; }
    .stat-card span { display: block; font-size: 1.8rem; font-weight: 800; }
    .stat-card label { font-size: .78rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .stat-total span { color: #1e293b; }
    .stat-pend span { color: #d97706; }
    .stat-conf span { color: #0891b2; }
    .stat-comp span { color: #059669; }

    .loading-box { display: flex; justify-content: center; padding: 3rem; }
    .spinner { width: 36px; height: 36px; border: 3px solid #e2e8f0; border-top-color: #bfa046; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .appts-list { display: flex; flex-direction: column; gap: .8rem; }
    .empty { text-align: center; padding: 2rem; color: #94a3b8; }
    .appt-row {
      background: #fff; border-radius: 12px; padding: 1rem 1.2rem;
      display: flex; gap: 1.2rem; align-items: flex-start;
      box-shadow: 0 2px 8px rgba(0,0,0,.05);
      border-left: 4px solid #bfa046; transition: box-shadow .15s;
    }
    .appt-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,.1); }
    .estado-cancelada { border-left-color: #ef4444; opacity: .7; }
    .estado-completada { border-left-color: #059669; }
    .estado-confirmada { border-left-color: #0891b2; }

    .appt-fecha { text-align: center; min-width: 75px; }
    .af-day { display: block; font-size: .78rem; font-weight: 700; color: #64748b; }
    .af-hour { display: block; font-size: 1.3rem; font-weight: 800; color: #bfa046; }
    .af-dur { display: block; font-size: .75rem; color: #94a3b8; }

    .appt-info { flex: 1; }
    .appt-nombre { font-weight: 700; color: #1e293b; margin-bottom: .25rem; }
    .appt-meta { display: flex; gap: 1rem; font-size: .82rem; color: #64748b; flex-wrap: wrap; }
    .appt-tipo { background: #fffbe7; color: #92400e; padding: 2px 8px; border-radius: 20px; font-size: .78rem; font-weight: 600; }
    .appt-notas { font-size: .82rem; color: #94a3b8; margin-top: .3rem; }

    .appt-actions { display: flex; flex-direction: column; gap: .5rem; align-items: flex-end; }
    .estado-sel { padding: 5px 8px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: .82rem; outline: none; cursor: pointer; }
    .estado-sel:focus { border-color: #bfa046; }
    .btn-del { background: none; border: 1px solid #fecaca; color: #ef4444; padding: 5px 10px; border-radius: 8px; cursor: pointer; font-size: .85rem; }
    .btn-del:hover { background: #fef2f2; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 500; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal-card { background: #fff; border-radius: 20px; padding: 2rem; max-width: 500px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
    .modal-card h3 { color: #1e293b; font-weight: 800; margin-bottom: 1.5rem; }
    .form-field { margin-bottom: 1rem; }
    .form-field label { display: block; font-weight: 600; color: #374151; margin-bottom: .4rem; font-size: .9rem; }
    .form-field input, .form-field select, .form-field textarea {
      width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;
      font-size: .9rem; outline: none; box-sizing: border-box;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: #bfa046; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .modal-actions { display: flex; gap: .8rem; margin-top: 1.5rem; }
    .btn-gold { flex: 1; padding: 11px; background: linear-gradient(135deg, #bfa046, #d4b660); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: .95rem; }
    .btn-gold:disabled { opacity: .6; cursor: not-allowed; }
    .btn-outline { flex: 1; padding: 11px; background: #fff; color: #64748b; border: 1.5px solid #e2e8f0; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: .95rem; }
  `]
})
export class AppointmentsComponent implements OnInit {
  all: any[] = [];
  filtered: any[] = [];
  loading = true;
  saving = false;
  search = ''; filterEstado = ''; filterDate = '';
  showForm = false;
  newAppt: any = { client_name: '', fecha: '', duracion_min: 60, tipo: 'presencial', estado: 'pendiente', notas: '' };

  constructor(private svc: AppointmentService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.svc.getAllAppointments().subscribe({
      next: (r) => { this.all = r.appointments || []; this.filter(); this.loading = false; },
      error: () => { this.all = []; this.loading = false; }
    });
  }

  filter() {
    this.filtered = this.all.filter(a => {
      if (this.search && !a.client_name?.toLowerCase().includes(this.search.toLowerCase())) return false;
      if (this.filterEstado && a.estado !== this.filterEstado) return false;
      if (this.filterDate) {
        const d = new Date(a.fecha).toISOString().slice(0, 10);
        if (d !== this.filterDate) return false;
      }
      return true;
    });
  }

  clearFilters() { this.search = ''; this.filterEstado = ''; this.filterDate = ''; this.filter(); }

  count(e: string) { return this.all.filter(a => a.estado === e).length; }

  updateEstado(a: any) {
    this.svc.updateAppointment(a.id, { ...a, fecha: a.fecha }).subscribe();
  }

  delete(id: string) {
    if (!confirm('¿Eliminar esta cita?')) return;
    this.svc.deleteAppointment(id).subscribe({ next: () => this.load() });
  }

  createAppt() {
    this.saving = true;
    const body = { ...this.newAppt, fecha: new Date(this.newAppt.fecha) };
    this.svc.createAppointment(body).subscribe({
      next: () => { this.saving = false; this.showForm = false; this.newAppt = { client_name: '', fecha: '', duracion_min: 60, tipo: 'presencial', estado: 'pendiente', notas: '' }; this.load(); },
      error: () => { this.saving = false; alert('Error al crear cita'); }
    });
  }

  fmtDay(iso: string) { return new Date(iso).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short' }); }
  fmtHour(iso: string) { return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); }
}
